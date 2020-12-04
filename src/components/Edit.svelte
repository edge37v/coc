<script>
	export let topic
	import * as api from 'api'
	import { stores } from '@sapper/app'
    import Close16 from 'carbon-icons-svelte/lib/Close16'
    import Checkmark16 from 'carbon-icons-svelte/lib/Checkmark16'
	import { Button, TextInput, Column } from 'carbon-components-svelte'

	const { session } = stores()
	const token = $session.token

	let edit = async function(){
        let id = topic.id
        let name = topic.name
        let data = { id, name}
        let res = await api.put(`topics`, data, token)
        if (res.yes){
            topic.edit = false
        }
    }
</script>

<Column>
	<TextInput bind:value={topic.name}/>
</Column>

<Button
    kind='ghost'
    tooltipPosition='bottom'
    tooltipAlignment='center'
    iconDescription='Cancel'
    size='small' hasIconOnly icon={Close16} on:click={() => (topic.edit = false)}/>
<Button
    kind='ghost'
    tooltipPosition='bottom'
    tooltipAlignment='center'
    iconDescription='Apply'
    size='small' hasIconOnly icon={Checkmark16} on:click={edit(topic)}/>
