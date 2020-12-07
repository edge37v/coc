<script>
	export let item
    import Edit16 from 'carbon-icons-svelte/lib/Edit16'
	import { Button, Column, Link } from 'carbon-components-svelte'
</script>

<Column max={4} xlg={4} lg={4} md={4} sm={4}>
		<Link style='font-size: 1.2em; color: white;' href='{item.type}/{item.id}'>{item.name}</Link>
</Column>