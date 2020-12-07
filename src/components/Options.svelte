<script>
	export let item
	export let items
	export let adding

	import Edit from './Edit.svelte'
	import Item from './Item.svelte'

	let current = Item

	$:changeCurrent(item.edit)

	let changeCurrent = function(){
		if (item.edit){
			current = Edit
		} else {
			current = Item
		}
	}
</script>

<svelte:component bind:adding this={current} bind:items bind:item/>
