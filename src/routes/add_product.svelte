<script context="module">
    export async function preload({ path }, { user }) {
        if (!user) {
            this.redirect(302, `login?path=${path}`);
        }
        return { user }
    }
</script>

<script>
    export let user

    import * as api from 'api'
    import { goto } from '@sapper/app'
    import { Row, Column, Button, TextInput} from 'carbon-components-svelte'

    let json = []
    let fields
    let name
    let res

    let addfield = function() {
        json = [...json, {'name': '', 'value': ''}]
    }

    let add = async function() {
        let id = user.id
        console.log(id)
        let token = user.token
        let data = { id, name, json }
        res = await api.post('products', data, token)
        if (res.product) {
            goto(`product/${res.product.id}`)
        }
    }
</script>
    
<svelte:head>
    <title>Add Product</title>
</svelte:head>

<Row>
    <Column>
        <TextInput labelText="Name" bind:value={name} />
        {#each json as field}
        <Row>
        <Column><TextInput placeholder='Field Name' bind:value={field.name} /></Column>
        <Column><TextInput placeholder='Field Value' bind:value={field.value} /></Column>
        </Row>
        {/each}
    </Column>
</Row>

<Button on:click={addfield}>Add Field</Button>
<Button on:click={add}>Add</Button>