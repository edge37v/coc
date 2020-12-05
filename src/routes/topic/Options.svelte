<script>
	export let item

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

<svelte:component this={current} bind:item/>
