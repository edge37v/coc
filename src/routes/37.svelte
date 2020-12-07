<script context="module">
    export async function preload({ query }, {token }) {
        if (token) {
            this.redirect(302, '/');
        }
    }
</script>
    
<script>
    import { Row, Column, FluidForm, ButtonSet, Button, TextInput, PasswordInput } from 'carbon-components-svelte';
    import ArrowRight16 from 'carbon-icons-svelte/lib/ArrowRight16'
    import ListErrors from '../components/ListErrors.svelte';
    import { goto, stores } from '@sapper/app';
    import { post } from 'utils.js';

    const { session } = stores();

    let password = '';
    let errors = null;

    let login = async function() {
        const r = await post(`auth/login`, { password })
        errors = r.errors
        if (r.token) {
            $session.token = r.token
            goto('/')
        }
    }
</script>

<svelte:head>
    <title>Log In</title>
</svelte:head>

<Row class="auth-page">
    <Column>
    <FluidForm>
        <p>Log In</p>
        <br/>
        <ListErrors {errors} />
        <PasswordInput labelText='Password' bind:value="{password}" />
    </FluidForm>
    <ButtonSet stacked>
        <Button icon={ArrowRight16} on:click={login}>Login</Button>
    </ButtonSet>
</Column>
</Row>