<script>
	export let item
	import * as api from 'api'
	import { stores } from '@sapper/app'
    import Close16 from 'carbon-icons-svelte/lib/Close16'
    import Checkmark16 from 'carbon-icons-svelte/lib/Checkmark16'
	import { Form, Button, TextInput, Column } from 'carbon-components-svelte'

	const { session } = stores()
	const token = $session.token

	let edit = async function(){
        let id = item.id
        let name = item.name
        let data = { id, name}
        let res = await api.put(`${item.type}`, data, token)
        if (res.yes){
            item.edit = false
        }
    }
</script>

<Column max={3} xlg={3} lg={3} md={3} sm={3}>
	<Form on:submit={edit}>
		<TextInput bind:value={item.name}/>
	</Form>
</Column>

<Button
    kind='ghost'
    tooltipPosition='bottom'
    tooltipAlignment='center'
    iconDescription='Cancel'
    size='small' hasIconOnly icon={Close16} on:click={() => (item.edit = false)}/>
<Button
    kind='ghost'
    tooltipPosition='bottom'
    tooltipAlignment='center'
    iconDescription='Apply'
    size='small' hasIconOnly icon={Checkmark16} on:click={edit}/>
