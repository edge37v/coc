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

    let json = [{'name': '', 'value': ''}]
    let prices = [{'name': '', 'value': ''}]
    let about
    let currency
    let name
    let res

    let addprice = function() {
        prices = [...prices, {'name': '', 'value': ''}]
    }

    let addfield = function() {
        json = [...json, {'name': '', 'value': ''}]
    }

    let add = async function() {
        let id = user.id
        console.log(id)
        let token = user.token
        let data = { id, name, json, about, prices, currency }
        res = await api.post('services', data, token);
        if (res.service) {
            goto(`service/${res.service.id}`)
        }
    }
</script>
    
<svelte:head>
    <title>Add Service</title>
</svelte:head>

<Row>
    <Column>
        <TextInput labelText="Name" bind:value={name} />
        <TextInput labelText="About" bind:value={about} />
        <TextInput labelText="Currency" bind:value={currency} />
        <h1>Prices</h1>
        {#each json as field}
        <Row>
        <Column><TextInput placeholder='Field Name' bind:value={field.name} /></Column>
        <Column><TextInput placeholder='Field Value' bind:value={field.value} /></Column>
        </Row>
        {/each}
        <Button on:click={addprice}>Add Price</Button>

        <h1>Custom Fields</h1>
        {#each json as field}
        <Row>
        <Column><TextInput placeholder='Field Name' bind:value={field.name} /></Column>
        <Column><TextInput placeholder='Field Value' bind:value={field.value} /></Column>
        </Row>
        {/each}
        <Button on:click={addfield}>Add Field</Button>
    </Column>
</Row>


<Button on:click={add}>Add</Button>