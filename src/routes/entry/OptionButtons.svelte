<script>
	export let item

	import EditButtons from './EditButtons.svelte'
	import ItemButtons from './ItemButtons.svelte'

	let current = ItemButtons

	$:changeCurrent(item.edit)

	let changeCurrent = function(){
		if (item.edit){
			current = EditButtons
		} else {
			current = ItemButtons
		}
	}
</script>

<svelte:component this={current} bind:item/>
