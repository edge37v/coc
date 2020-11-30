<script context='module'>
    import * as api from 'api'
    export async function preload(page) {
        const user = await api.get(`user/${page.params.id}`)
        return { user }
    }
</script>

<script>
    export let user
    import { onMount } from 'svelte'
    import { goto, stores } from '@sapper/app'
    import ListErrors from './ListErrors.svelte'
    import {
        Row,
        Column,
        TextInput, 
        PasswordInput, 
        TextArea,
        Button, 
        NumberInput, 
        Tooltip,
        InlineLoading,
        FluidForm
    } from 'carbon-components-svelte'

    const { session } = stores()

    let position = { latitude: null, longitude: null }
    if (user.location) {
        position.latitude = user.location.latitude
        position.longitude = user.location.longitude
    }

    let positionStatus
    let positionErrorCode
    let positionErrorMessage

    let getCurrentPosition = function() {
        return
    }

    function success(pst) {
        position.latitude = pst.coords.latitude
        position.longitude = pst.coords.longitude
        positionErrorCode = null
        positionErrorMessage = null
        positionStatus = 'success'
    }

    function error(error) {
        positionErrorCode = error.code
        positionErrorCode = error.message
        positionStatus = 'error'
    }

    let options = {
        enableHighAccuracy: true,
        timeout: 5000
    }

    onMount(() => {
        getCurrentPosition = function() {
            positionStatus = 'getting'
            if (!navigator.geolocation) {
                positionStatus = 'unsupported'
                console.log('not navigator')
            } else {
                navigator.geolocation.getCurrentPosition(success, error, options)
            }
        }
    })

    let errors
    let password
    let username  = user.username
    let name = user.name
    let website = user.website
    let phone = user.phone
    let about = user.about

    let edit = async function() {
        let token = user.token
        let data = {
            username,
            password,
            name,
            website,
            phone,
            about
        }
        if (!positionErrorCode) {
            data.location = position
        }
        let res = await api.put(`user/${user.id}`, data, token)
        errors = res.errors

        if (res.user) {
            $session.user = res.user
            goto(`${user.id}`)
        }
    }
</script>

<ListErrors {errors}/>
<FluidForm>
    <TextInput labelText='Username' bind:value={username}/>
    <PasswordInput labelText='Password' bind:value={password}/>
    <TextInput labelText='Name' bind:value={name}/>
    <TextInput labelText='Website' bind:value={website}/>
    <TextInput labelText='Phone' bind:value={phone}/>
    <TextArea placeholder='About' bind:value={about}/>
</FluidForm>
<br/>

<Row lg={2} md={2} sm={2}>
    <span><Button size='small' kind='ghost' on:click={getCurrentPosition}>Get current location</Button></span>
    <span>
    {#if positionStatus == 'unsupported'}
        <InlineLoading status='error' description='Geolocation not supported by your browser'/>
    {/if}
    {#if positionStatus == 'getting'}
        <InlineLoading/>
    {/if}
    {#if positionStatus == 'error'}
        <InlineLoading status='error'/>
    {/if}
    {#if positionStatus == 'success'}
        <InlineLoading status='finished'/>
    {/if}
    </span>
    <span>
    <Tooltip>
        {#if positionStatus == 'error'}
        <p>Error code: {positionErrorCode}</p>
        <p>Error message: {positionErrorMessage}</p>
        {:else}
        <p>Helps us sort search results by distance to user</p>
        {/if}
    </Tooltip>
    </span>
</Row>

<NumberInput allowEmpty step={0.0000001} label='Latitude' bind:value={position.latitude}/>
<NumberInput allowEmpty step={0.0000001} label='Longitude' bind:value={position.longitude}/>
<br/>
<Button on:click={edit}>Apply edits</Button>