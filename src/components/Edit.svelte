<script>
	export let topic
	import { TextInput } from 'carbon-components-svelte'
</script>

<TextInput bind:value={topic.name}/>
