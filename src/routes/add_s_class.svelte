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
    import { Row, Column, Button, ButtonSet, TextInput, TextArea, FluidForm} from 'carbon-components-svelte'

    let s_class
    let json = []
    let fields =  []
    let field_id = 1
    let about
    let paid_in
    let name

    let addjson = function() {
        json = [...json, {'name': '', 'value': ''}]
    }

    let addfield = function() {
        fields = [...fields, { id: field_id, name: '' }]
        field_id++
    }

    let add = async function() {
        let token = user.token
        let data = { json, name, about, fields, paid_in }
        s_class = await api.post('s_classes', data, token);
        if (s_class.id) {
            goto(`s_class/${s_class.id}`)
        }
    }
</script>
    
<svelte:head>
    <title>Add Service</title>
</svelte:head>

<FluidForm>
    <TextInput labelText="Name" bind:value={name} />
    <TextInput labelText="About" bind:value={about} />
    <TextInput labelText="Paid for in" bind:value={paid_in} />

    <br/>

    {#each json as field}
    <Row>
    <Column><TextInput labelText='Field Name' bind:value={field.name} /></Column>
    <Column><TextInput labelText='Field Value' bind:value={field.value} /></Column>
    </Row>
    {/each}

    <br/>

    <h1>Fields</h1>
    {#each fields as field}
    <TextInput labelText='Field Name' bind:value={field.name} />
    {/each}
</FluidForm>

<ButtonSet stacked>
    <Button on:click={addfield}>Add Field</Button>
    <Button on:click={add}>Add</Button>
</ButtonSet>