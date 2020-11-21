<script context="module">
    export async function preload({ query }, { user }) {
        if (user) {
            this.redirect(302, '/');
        }
    }
</script>
    
<script>
    import { Row, Column, Link, FluidForm, ButtonSet, Button, TextInput, PasswordInput } from 'carbon-components-svelte';
    import ArrowRight16 from 'carbon-icons-svelte/lib/ArrowRight16'
    import ListErrors from '../components/ListErrors.svelte';
    import { goto, stores } from '@sapper/app';
    import { post } from 'utils.js';

    const { session } = stores();

    let to
    let email = '';
    let password = '';
    let errors = null;

    let login = async function() {
        const r = await post(`auth/login`, { email, password})
        errors = r.errors
        if (r.user) {
            $session.user = r.user
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
        <TextInput labelText='Email' bind:value={email} />
        <PasswordInput labelText='Password' bind:value="{password}" />
    </FluidForm>
    <ButtonSet stacked>
        <Button icon={ArrowRight16} on:click={login}>Login</Button>
        <Button kind='ghost' rel='prefetch' href='join'>Sign Up instead</Button>
    </ButtonSet>
</Column>
</Row>