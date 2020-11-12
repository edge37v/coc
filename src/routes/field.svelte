<script context="module">
    export async function preload({ path }, { user }) {
        if (!user) {
            this.redirect(302, `login?path=${path}`);
        }
        return { user }
    }
</script>

<script>
    export let id
    import * as api from 'api'
    import { Row, Column, ComboBox, TextInput } from 'carbon-components-svelte'

    $: get(name)
    $: update(name, value)

    let name = ''
    let value
    let fields
    let json
    let ids = []

    let add = function() {
        json = [...json, {'id': ids.length, 'name': '', 'value': ''}]
        ids[ids.length] = ids.length + 1
    }

    let get = async function() {
        fields = await api.get(`fields?q=${name}`)
    }

    let update = function() {
        for(let i=0; i <= n.length; i++) {
            let field = json[i]
            if (field && field.id == id) {
                field.name = name
                field.value = value
            }
        }
    }
</script>

<Row>
    <Column lg={2} md={2} sm={2}><ComboBox items={fields} placeholder='Field Name' bind:value={name} /></Column>
    <Column lg={2} md={2} sm={2}><TextInput placeholder='Field Value' bind:value={value} /></Column>
</Row>

{#each ids as id}
    <svelte:self id={id}/>
{/each}