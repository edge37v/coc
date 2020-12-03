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
    import { Modal } from 'carbon-components-svelte'

    let body = marked(entry.body)

    let delModalOpen = false


    let del= async function(){
        api.del(`topics?id=${entry.id}`, token)
        if (res.yes) {
        	return
        }
    }
</script>

<Modal
	alert
	shouldSubmitOnEnter
	bind:open={delModalOpen}
	modalHeading='Delete Item'
	primaryButtonText='Confirm'
	secondaryButtonText='Cancel'
	on:click:button--primary={() => (del())}
	on:click:button--secondary={() => (delModalOpen=false)}
>
	<p>Sure you want to delete this entry?</p>
</Modal>

<h2>{entry.name}</h2>
<span style="font-size: 21px;">{entry.verses.book} {entry.verses.chapter}: {entry.verses.start}</span>
{#if entry.verses.end}
	<span  style="font-size: 21px;"> - {entry.verses.end}</span>
{/if}

<br/>
<div>{@html body}</div>
