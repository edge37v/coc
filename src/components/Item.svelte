<script>
	export let topic
	import { Column, Link } from 'carbon-components-svelte'
</script>

<Column>
	<Link style='font-size: 1.2em; color: white;' href='topic/{topic.id}'>{topic.name}</Link>
</Column>