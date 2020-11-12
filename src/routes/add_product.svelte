<script context="module">
    export async function preload({ params }, { user }) {
        if (!user) {
            this.redirect(302, 'login');
        }
        return { user }
    }
</script>
    
<script>
    import { goto } from '@sapper/app';
    import ListErrors from '../components/ListErrors.svelte';
    import * as api from 'api.js';
    import { Row, Column, Link, Form, TextInput, Button } from 'carbon-components-svelte';

    export let user
    let errors;

    let name;
    let email;
    let phone;
    let website
    let password;

    async function edit() {
        const id = user.id
        const res = await api.post('products');
        errors = res.errors;

        if (res.product) {
            goto('/')
        }
    }
</script>
    
<svelte:head>
    <title>Add Product</title>
</svelte:head>

<Row class="add-product">
    <Column>
    <Form>
        <ListErrors {errors} />
        <TextInput placeholder="Name" bind:value={name} />
        <Button on:click={edit}>Add</Button>
    </Form>
</Column>
</Row>