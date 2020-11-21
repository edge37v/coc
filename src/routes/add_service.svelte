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
    import { Row, Column, Button, TextInput, ButtonSet, FluidForm, ComboBox} from 'carbon-components-svelte'

    let json = [{'name': '', 'value': ''}]
    let fields = []
    let name
    let s_class_id = -1
    let about
    let price
    let paid_in
    let s_class = ''
    let s_classes
    let token = user.token

    $: get_s_classes(s_class)
    $: get_s_class_fields(s_class_id)

    let get_s_class_fields  = async function() {
        let res = await api.get(`s_classes/get_fields?id=${s_class_id+1}`, token)
        console.log(res)
        for ( let i = 0; i < res.length; i++ ) {
            let field = res[i]
            fields = [...fields, { id: field.id, name: field.name, value: '' }]
        }
    }

    let get_s_classes = async function() {
        s_classes = await api.get(`s_classes/search?q=${s_class}`, token)
    }

    let addfield = function() {
        json = [...json, {'name': '', 'value': ''}]
    }

    let add = async function() {
        let id = user.id
        console.log(id)
        let token = user.token
        let data = { json, name, s_class_id, about, price, paid_in }
        let res = await api.post('services', data, token);
        if (res.service) {
            goto(`service/${res.service.id}`)
        }
    }
</script>
    
<svelte:head>
    <title>Add Service</title>
</svelte:head>

<FluidForm>
    <Row>
    <Column><p>Service Class: </p></Column>
    <Column>
        <ComboBox
            items={s_classes}
            bind:selectedIndex={s_class_id}
            bind:value={s_class}/>
    </Column>
    </Row>
    <TextInput labelText="Name" bind:value={name} />
    <TextInput labelText="About" bind:value={about} />
    <TextInput labelText="Price" bind:value={price} />
    <TextInput labelText="Currency" bind:value={paid_in} />
</FluidForm>

    <br/>

<p>Fields</p>
{#each fields as field}
<TextInput labeltext={field.name} bind:value={field.value} />
{/each}

<FluidForm>
    <p>Custom Fields</p>
    {#each json as field}
    <Row>
    <Column><TextInput placeholder='Field Name' bind:value={field.name} /></Column>
    <Column><TextInput placeholder='Field Value' bind:value={field.value} /></Column>
    </Row>
    {/each}
</FluidForm>

<ButtonSet stacked>
<Button on:click={addfield}>Add Field</Button>
<Button on:click={add}>Add</Button>
</ButtonSet>