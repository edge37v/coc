<script context='module'>
    import * as api from 'api'
    export async function preload(page) {
        let id = page.params.id
        let subcategory = await api.get(`subcategory/${id}`)
        return { subcategory }
    }
</script>

<script>
    export let subcategory
</script>

<h1>{subcategory.name}</h1>

{#each subcategory.entry as entry}
<p>{entry.verses.book} {entry.verses.chapter}: {entry.verses.start}{#if entry.verses.end} {entry.verses.end}{/if}</p>
<p>{entry.name}</p>
{/each}