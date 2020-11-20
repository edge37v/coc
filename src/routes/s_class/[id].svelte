<script context='module'>
    import * as api from 'api'
    export async function preload(page) {
        let id = page.params.id
        let s_class = await api.get(`s_classes/${id}`)
        return { s_class }
    }
</script>

<script>
    export let s_class
</script>

<h1>{s_class.name}</h1>
<p>{s_class.about}</p>
<p>Paid for in: {s_class.paid_in}</p>

<br />
{#each s_class.json as field}
    <div>
        <span>{field.name}: </span>
        <span>{field.value}</span>
    </div>
{/each}