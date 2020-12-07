<script>
    export let item
    export let items
    export let adding
    import * as api from 'api'
    import { stores } from '@sapper/app'
    import Close16 from 'carbon-icons-svelte/lib/Close16'
    import Checkmark16 from 'carbon-icons-svelte/lib/Checkmark16'
    import { Form, Button, TextInput, Column } from 'carbon-components-svelte'

    const { session } = stores()
    const token = $session.token

    let remove = function(){
        items = items.filter(_item => _item != item)
        adding = false
    }

    let add = async function(){
        let data = { name: item.name }
        let res = await api.post(`${item.type_plural}`, data, token)
        if (res.id){
            item.isNew = null
            item.edit = false
            adding = false
        }
    }

    let edit = async function(){
        let data = { id: item.id, name: item.name}
        let res = await api.put(`${item.type_plural}`, data, token)
        if (res.yes){
            item.edit = false
        }
    }
</script>

<Column max={4} xlg={4} lg={4} md={4} sm={3}>
    <Form on:submit={edit}>
        <TextInput bind:value={item.name}/>
    </Form>
</Column>

{#if item.isNew}
    <Button
        kind='ghost'
        tooltipPosition='bottom'
        tooltipAlignment='center'
        iconDescription='Cancel'
        size='small' hasIconOnly icon={Close16} on:click={remove}/>
    <Button
        kind='ghost'
        tooltipPosition='bottom'
        tooltipAlignment='center'
        iconDescription='Apply'
        size='small' hasIconOnly icon={Checkmark16} on:click={add}/>

{:else if !item.isNew}
    <Button
        kind='ghost'
        tooltipPosition='bottom'
        tooltipAlignment='center'
        iconDescription='Cancel'
        size='small' hasIconOnly icon={Close16} on:click={() => {item.edit = false}}/>
    <Button
        kind='ghost'
        tooltipPosition='bottom'
        tooltipAlignment='center'
        iconDescription='Apply'
        size='small' hasIconOnly icon={Checkmark16} on:click={edit}/>
{/if}