<script context="module">
    export async function preload({ params }, { user }) {
        if (user) {
            this.redirect(302, '/');
        }
    }
</script>
    
<script>
    import { goto, stores } from '@sapper/app';
    import ListErrors from '../components/ListErrors.svelte';
    import { post } from 'utils.js';
    import { Row, Column, Link, FluidForm, TextInput, ButtonSet, Button } from 'carbon-components-svelte';

    const { session } = stores();

    let email;
    let password;
    let errors = null;

    let join = async function() {
        const res = await post(`auth/join`, { email, password })
        errors = res.errors

        if (res.user) {
            $session.user = res.user
            goto('/')
        }
    }
</script>
    
<svelte:head>
    <title>Join</title>
</svelte:head>

<Row class="auth-page">
    <Column>
    <FluidForm>
        <ListErrors {errors} />
        <TextInput placeholder='password' bind:value={email} />
        <TextInput type='Password' placeholder="password" bind:value={password} />
    </FluidForm>
    <ButtonSet stacked>
        <Button on:click={join}>Join</Button>
        <Button kind='ghost' rel='prefetch' href='login'>Log In</Button>
    </ButtonSet>
</Column>
</Row>