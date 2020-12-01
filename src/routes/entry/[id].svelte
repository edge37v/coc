<script context='module'>
    import * as api from 'api'
    export async function preload(page) {
        let id = page.params.id
        let entry = await api.get(`entries?id=${id}`)
        return { entry }
    }
</script>

<script>
    export let entry
    import marked from 'marked'
    let body = marked(entry.body)
</script>

<h2>{entry.name}</h2>
<span style="font-size: 21px;">{entry.verses.book} {entry.verses.chapter}: {entry.verses.start}</span>
{#if entry.verses.end}
	<span  style="font-size: 21px;"> - {entry.verses.end}</span>
{/if}

<br/>
<div>{@html body}</div>
