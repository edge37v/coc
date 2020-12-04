<script>
	export let topic
	import { Link } from 'carbon-components-svelte'
</script>

<Link style='font-size: 1.2em; color: white;' href='topic/{topic.id}'>{topic.name}</Link>
