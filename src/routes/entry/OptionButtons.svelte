<script>
	export let item

	import EditButtons from './EditButtons.svelte'
	import ItemButton from './ItemButton.svelte'

	let current = ItemButton

	$:changeCurrent(item.edit)

	let changeCurrent = function(){
		if (item.edit){
			current = EditButtons
		} else {
			current = ItemButton
		}
	}
</script>

<svelte:component this={current} bind:item/>