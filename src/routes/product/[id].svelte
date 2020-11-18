<script context='module'>
    import * as api from 'api'
    export async function preload(page) {
        let id = page.params.id
        let product = await api.get(`products/${id}`)
        return { product }
    }
</script>

<script>
    export let product
</script>

<h1>{product.name}</h1>
{#each product.json as field}
    <div>
        <span>{field.name}: </span>
        <span>{field.value}</span>
    </div>
{/each}