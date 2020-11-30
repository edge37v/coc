<script>
    export let value
    export let updateFunction
    import { ComboBox } from 'carbon-icons-svelte'
    let items

    $: updateFunction(value).then((list) => {
        items = list
    })
</script>

<ComboBox bind:value={value} items={items}/>