<script>
	export let item
	export let form
    import Edit16 from 'carbon-icons-svelte/lib/Edit16'
	import { Button, Column, Link } from 'carbon-components-svelte'
</script>

<Button
    kind='ghost'
    tooltipPosition='bottom'
    tooltipAlignment='center'
    iconDescription='Edit'
    size='small' hasIconOnly icon={Edit16} on:click={() => {item.edit = true}}/>