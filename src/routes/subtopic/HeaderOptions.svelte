<script>
	export let item

	import HeaderItem from './HeaderItem.svelte'
    import HeaderEdit from './HeaderEdit.svelte'

	let current = item

	$:changeCurrent(item.edit)

	let changeCurrent = function(){
		if (item.edit){
			current = HeaderEdit
		} else {
			current = HeaderItem
		}
	}
</script>

<svelte:component this={current} bind:item/>
