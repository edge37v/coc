<script>
    export let user

    import { j } from '../stores.js'
    import { goto, stores } from '@sapper/app'
    import ListErrors from '../components/ListErrors.svelte'
    import Field from '../components/Field.svelte'
    import * as api from 'api.js'
    import { Row, Column, ComboBox, Form, TextInput, Button } from 'carbon-components-svelte'

    const { json } = j
    const { session } = stores()

    let i = 0
    let ids = []./ListErrors.svelte./ListErrors.svelte
    let errors
    let name
    let email
    let phone
    let website
    let sjson = []
    let fields
    let password

    let add = async function() {
        let id = user.id
        let token = user.token
        let data = {
            name,
            sjson}
        const res = await api.post('services', data, token);
        errors = res.errors;
    }

    let addfield = function() {
        j.add(i)
        ids[ids.length] = ids.length + 1
        i += i
    }
</script>
    
<svelte:head>
    <title>Add Service</title>
</svelte:head>

<Row>
    <Column>
    <Form>
        <TextInput labelText="Name" bind:value={name} />
        {#each ids as id}
            <Field id={id} />
        {/each}
        <Row>
            <Button on:click={addfield}>Add Field</Button>
            <Button on:click={add}>Add</Button>
        </Row>
    </Form>
</Column>
</Row>