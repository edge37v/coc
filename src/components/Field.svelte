<script>
    export let id

    import * as api from 'api'
    import { stores } from '@sapper/app'
    import { s } from '../stores.js'
    import { j } from '../stores.js'
    import { Row, Button, Column, ComboBox, TextInput } from 'carbon-components-svelte'

    const { session } = stores()
    let user = $session.user
    let ss = $s

    $: get(name)
    $: update(name, value)
    $: addfield($s)

    let name = ''
    let value
    let fields
    let json = []
    let ids = []

    let addfield = function() {
        json = [...json, {'id': id, 'name': '', 'value': ''}]
        ids[ids.length] = ids.length + 1
        j.add(json)
    }

    let get = async function() {
        fields = await api.get(`fields?q=${name}`)
    }

    let update = function() {
        for(let i=0; i <= json.length; i++) {
            let field = json[i]
            if (field && field.id == id) {
                field.name = name
                field.value = value
            }
        }
        j.add(json)
    }
</script>

<Row>
    <Column lg={2} md={2} sm={2}><TextInput placeholder='Field Name' bind:value={name} /></Column>
    <Column lg={2} md={2} sm={2}><TextInput placeholder='Field Value' bind:value={value} /></Column>
</Row>

{#each ids as id}
    <svelte:self />
{/each}
