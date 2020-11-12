<script context="module">
    export async function preload({ user }) {
        if (!user) {
            this.redirect(302, 'login');
        }
        return { user }
    }
</script>
    
<script>
    import { goto, stores } from '@sapper/app';
    import ListErrors from '../components/ListErrors.svelte';
    import * as api from 'api.js';
    import { Row, Column, Link, Form, TextInput, Button } from 'carbon-components-svelte';

    export let user
    const { session } = stores();
    let errors;

    let name;
    let email;
    let phone;
    let website
    let password;

    async function edit() {
        const res = await api.put('users', { id: user.id, email, password, name, phone, website });
        errors = res.errors;

        if (res.user) {
            $session.user = res.user;
            goto('/')
        }
    }
</script>
    
<svelte:head>
    <title>Edit Profile</title>
</svelte:head>

<Row class="auth-page">
    <Column>
    <Form>
        <ListErrors {errors} />
        <TextInput placeholder="Email" bind:value={email} />
        <TextInput placeholder="Name" bind:value={name} />
        <TextInput placeholder="Phone" bind:value={phone} />
        <TextInput placeholder="Website" bind:value={website} />
        <TextInput type='password' placeholder="Password" bind:value={password} />
        <Button on:click={edit}>Edit</Button>
    </Form>
</Column>
</Row>