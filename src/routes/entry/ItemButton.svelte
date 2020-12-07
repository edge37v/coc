<script>
	export let item
	import { goto } from '@sapper/app'
    import Edit16 from 'carbon-icons-svelte/lib/Edit16'
	import { Button, Column, Link } from 'carbon-components-svelte'
</script>

<Button
    kind='ghost'
    tooltipPosition='bottom'
    tooltipAlignment='center'
    iconDescription='Edit'
    size='small' hasIconOnly icon={Edit16} on:click={() => (goto(`edit_entry/${item.id}`))}/>