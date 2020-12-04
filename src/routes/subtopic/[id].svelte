<script context='module'>
    export async function preload(page) {
        let id = page.params.id
        let subtopic = await api.get(`subtopics?id=${id}`)
        return { subtopic }
    }
</script>

<script>
    export let subtopic
    import * as api from 'api'
    import { stores, goto } from '@sapper/app'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import { Link, Button, Modal, Row, Column, PaginationNav } from 'carbon-components-svelte'

    const { session } = stores()
    const token = $session.stores

    let entries = []
    let total = 0
    let page = 1
    let res

    let delID
    let delModalOpen = false

    let preDel = async function(id){
        delID = id
        delModalOpen=true
    }

    let del = async function(id){
        api.del(`entries?id=${id}`, token)
        if (res.yes) {
            entries = entries.filter(c => c.id != id)
        }
    }

    $:get_entries(page)

    let get_entries = async function() {
    	res = await api.get(`entries/from_subtopic?id=${subtopic.id}&page=${page}`)
    	total = res.total_pages
    	entries = res.data
    }
</script>

<Modal
    danger
    shouldSubmitOnEnter
    bind:open={delModalOpen}
    modalHeading='Delete Item'
    primaryButtonText='Confirm'
    secondaryButtonText='Cancel'
    on:click:button--primary={() => (del(delID))}
    on:click:button--secondary={() => (delModalOpen=false)}
>
    <p>Sure you want to delete that?</p>
</Modal>

<h2>Entries for subtopic: {subtopic.name}</h2>

{#each entries as entry}
    <Row>
        <Column lg={3} md={3} sm={2}>
            <Link style='font-size: 1.2em; color: white;' href='entry/{entry.id}'>{entry.name}</Link>
        </Column>
        {#if $session.token}
            <Column>
                <Button
                    kind='ghost'
                    tooltipPosition='bottom'
                    tooltipAlignment='center'
                    iconDescription='Delete Entry'
                    size='small' hasIconOnly icon={Delete16} on:click={del(entry.id)}/>
                <Button size='small' hasIconOnly icon={Delete16} on:click={preDel(entry.id)}/>
            </Column>
        {/if}
    </Row>
	<p>{entry.name}<p/>
	<p>{entry.verses.book} {entry.verses.chapter}: {entry.verses.start}{#if entry.verses.end} {entry.verses.end}{/if}<p/>
{/each}

{#if total < 1}
    <br/>
    <p>There don't seem to be any entries for that subtopic</p>
{/if}
{#if total > 37}
    <PaginationNav bind:page={page} loop total={total}/>
{/if}
