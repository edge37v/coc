<script>
    import * as api from 'api'
    import { goto, stores } from '@sapper/app'
    import {
        TextInput, PasswordInput, TextArea, Button
    } from 'carbon-components-svelte'

    const { session } = stores()
    const user = $session.user

    let errors,
    email  = user.email,
    password,
    name = user.name,
    website = user.website,
    phone = user.phone,
    about = user.about

    let edit = async function() {
        let id = user.id
        let token = user.token
        let data = {
            id,
            email,
            password,
            name,
            website,
            phone,
            about
        }
        let res = await api.put(`users/${user.id}`, data, token)
        errors = res.errors

        if (res.user) {
            $session.user = res.user
            goto(`user/${user.id}`)
        }
    }
</script>

<TextInput labelText='Email' bind:value={email}/>
<PasswordInput labelText='Password' bind:value={password}/>
<TextInput labelText='Name' bind:value={name}/>
<TextInput labelText='Website' bind:value={website}/>
<TextInput labelText='Phone' bind:value={phone}/>
<TextArea labelText='About' bind:value={about}/>
<Button on:click={edit}>Edit</Button>