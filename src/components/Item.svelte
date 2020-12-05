<script>
	export let item
    import Edit16 from 'carbon-icons-svelte/lib/Edit16'
	import { Button, Column, Link } from 'carbon-components-svelte'
</script>

<Column max={3} xlg={3} lg={3} md={3} sm={3}>
		<Link style='font-size: 1.2em; color: white;' href='{item.type_plural}/{item.id}'>{item.name}</Link>
</Column>

<Button
    kind='ghost'
    tooltipPosition='bottom'
    tooltipAlignment='center'
    iconDescription='Edit'
    size='small' hasIconOnly icon={Edit16} on:click={() => {item.edit = true}}/>