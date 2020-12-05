<script>
	export let item
	import { Column, Link } from 'carbon-components-svelte'
</script>

<Column max={3} xlg={3} lg={3} md={3} sm={3}>
	<Link style='font-size: 1.2em; color: white;' href='{item.type}/{item.id}'>{item.name}</Link>
</Column>