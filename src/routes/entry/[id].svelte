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

    entry.edit = false

    let body = marked(entry.body)

    let delModalOpen = false

    let del= async function(){
        api.del(`entries?id=${entry.id}`, token)
        if (res.yes) {
        	goto(`subtopic/${entry.subtopic_id}`)
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
<Row>
    <Column>
        <h2>Entries in subtopic: {subtopic.name}</h2>
    </Column>
    {#if $session.token}
    <Column>
        <Options bind:item={entry}/>
        <Button
            style='float:right;'
            kind='ghost'
            tooltipPosition='bottom'
            tooltipAlignment='center'
            iconDescription='Delete This Entry'
            size='small' hasIconOnly icon={Delete16} on:click={del}/>
    </Column>
    {/if}
</Row>

<span style="font-size: 21px;">{entry.verses.book} {entry.verses.chapter}: {entry.verses.start}</span>
{#if entry.verses.end}
	<span  style="font-size: 21px;"> - {entry.verses.end}</span>
{/if}

<br/>
<div>{@html body}</div>
