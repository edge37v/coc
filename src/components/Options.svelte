<script>
	export let topic

	import Edit from './Edit.svelte'
	import Item from './Item.svelte'

	let current = Item

	$:changeCurrent(topic.edit)

	let changeCurrent = function(){
		if (topic.edit){
			current = Edit
		} else {
			current = Item
		}
	}
</script>

<svelte:component this={current} bind:topic/>

