<script>
    import * as api from 'api'
    import { goto, stores } from '@sapper/app'
    import {
        TextInput, PasswordInput, TextArea, Button, NumberInput, Tooltip
    } from 'carbon-components-svelte'

    const { session } = stores()
    const user = $session.user

    let errors
    let password
    let location = {latitude: 0, longitude: 0}
    let email  = user.email
    let name = user.name
    let website = user.website
    let phone = user.phone
    let about = user.about

    let edit = async function() {
        let id = user.id
        let token = user.token
        let data = {
            id,
            email,
            password,
            name,
            website,
            location,
            phone,
            about
        }
        let res = await api.put(`users/${user.id}`, data, token)
        errors = res.errors

        if (res.user) {
            $session.user = res.user
            goto(`${user.id}`)
        }
    }
</script>

<TextInput labelText='Email' bind:value={email}/>
<PasswordInput labelText='Password' bind:value={password}/>
<TextInput labelText='Name' bind:value={name}/>
<TextInput labelText='Website' bind:value={website}/>
<TextInput labelText='Phone' bind:value={phone}/>
<TextArea labelText='About' bind:value={about}/>
<br/>
<p>Location</p>
<Tooltip direction='right'>
    <p>This helps us sort results in order of distance relative to users</p>
</Tooltip>
<NumberInput allowEmpty step={0.0000001} mobile label='latitude' bind:value={location.latitude}/>
<NumberInput allowEmpty mobile label='longitude' bind:value={location.longitude}/>
<br/>
<Button on:click={edit}>Apply edits</Button>