<script>
    var geolocation = require('geolocation')
    import * as api from 'api'
    import { goto, stores } from '@sapper/app'
    import ListErrors from './ListErrors.svelte'
    import {
        Row, 
        TextInput, 
        PasswordInput, 
        TextArea, 
        Button, 
        NumberInput, 
        Tooltip
    } from 'carbon-components-svelte'

    const { session } = stores()
    const user = $session.user

    let position
    let positionStatus
    let positionErrorCode
    let positionErrorMessage
    let positionStatusIcon = false

    let get_location = function() {
        function callback(error, position) {
            if (error) {
                positionErrorCode = error.code
                positionErrorMessage = error.message
            }
            position.latitude = postion.coords.latitude
            position.longitude = position.coords.longitude
        }

        let options = {
            enableHighAccuracy: true,
            timeout: 15000
        }

        positionStatus = 'Attempting to get your location'
        geolocation.getCurrentPosition(options, callback())
    }

    let errors
    let password
    let location = {latitude: 0, longitude: 0}
    let email  = user.email
    let name = user.name
    let website = user.website
    let phone = user.phone
    let about = user.about

    let edit = async function() {
        let token = user.token
        let data = {
            email,
            password,
            name,
            website,
            phone,
            about
        }
        if (position) {
            data.location = position
        }
        let res = await api.put(`users/${user.id}`, data, token)
        errors = res.errors

        if (res.user) {
            $session.user = res.user
            goto(`${user.id}`)
        }
    }
</script>

<ListErrors {errors}/>
<TextInput labelText='Email' bind:value={email}/>
<PasswordInput labelText='Password' bind:value={password}/>
<TextInput labelText='Name' bind:value={name}/>
<TextInput labelText='Website' bind:value={website}/>
<TextInput labelText='Phone' bind:value={phone}/>
<TextArea labelText='About' bind:value={about}/>
<br/>

<Row>
    <Button size='small' kind='ghost' on:click={get_location}>Get current location</Button>
    {#if positionStatus}
    <Tooltip bind:hideIcon={positionStatusIcon} triggerText={positionStatus}>
        <p>Error code: {positionErrorCode}</p>
        <p>Error message: {positionErrorMessage}</p>
    </Tooltip>
    {/if}
</Row>
<p bind:this={positionStatus}></p>
<NumberInput allowEmpty step={0.0000001} mobile label='Latitude' bind:value={location.latitude}/>
<NumberInput allowEmpty mobile label='Longitude' bind:value={location.longitude}/>
<br/>
<Button on:click={edit}>Apply edits</Button>