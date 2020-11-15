<script context='module'>
    import * as api from 'api'
    export async function preload(page) {
        let id = page.params.id
        let service = await api.get(`services/${id}`)
        return { service }
    }
</script>

<script>
    export let service
</script>

<h1>{service.name}</h1>
{#each service.json as field}
    <div>
        <span>{field.name}: </span>
        <span>{field.value}</span>
    </div>
{/each}