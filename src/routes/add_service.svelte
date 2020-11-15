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
    import { Row, Column, Button, TextInput} from 'carbon-components-svelte'

    let json = []
    let fields
    let name
    let ref

    let addfield = function() {
        json = [...json, {'name': '', 'value': ''}]
    }

    let add = async function() {
        let id = user.id
        console.log(id)
        let token = user.token
        let data = { id, name, json }
        await api.post('services', data, token);
    }
</script>
    
<svelte:head>
    <title>Add Servce</title>
</svelte:head>

<Row>
    <Column>
        <TextInput labelText="Name" bind:value={name} />
        {#each json as field}
        <TextInput placeholder='Field Name' bind:value={field.name} />
        <TextInput placeholder='Field Value' bind:value={field.value} />
        {/each}
    </Column>
</Row>

<Button on:click={addfield}>Add Field</Button>
<Button on:click={add}>Add</Button>