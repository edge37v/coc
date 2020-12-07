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
    import Options from './Options.svelte'
    import HeaderOptions from './HeaderOptions.svelte'
    import Edit16 from 'carbon-icons-svelte/lib/Edit16'
    import Add16 from 'carbon-icons-svelte/lib/Add16'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import { Link, Button, Modal, Row, Column, PaginationNav } from 'carbon-components-svelte'

    const { session } = stores()
    const token = $session.stores

    let total_items
    let entries = []
    let total = 0
    let page = 1
    let res

    let selfDelModalOpen = false

    let delItem = {}
    let delModalOpen = false

    delItem.name = ''

    let selfDel = async function(){
        let res = await api.del(`subtopics?id=${subtopic.id}`, token)
        if (res.yes) {
            goto('topics')
        }
    }

    let del = async function(){
        let res = await api.del(`entries?id=${delItem.id}`, token)
        if (res.yes) {
            entries = entries.filter(entry => entry != delItem)
        }
    }

    $:get_entries(page)

    let get_entries = async function() {
    	res = await api.get(`entries/from_subtopic?id=${subtopic.id}&page=${page}`)
        console.log(res)
    	total = res.total_pages
        total_items = res.total_items
    	res.data.forEach((entry) => {
            entries = [...entries, { id: entry.id, name: entry.name, type: entry.type, type_plural: entry.type_plural, edit: false }]
        })
    }
</script>

<Modal
    danger
    shouldSubmitOnEnter
    bind:open={selfDelModalOpen}
    modalHeading='Delete this Subtopic'
    primaryButtonText='Confirm'
    secondaryButtonText='Cancel'
    on:click:button--primary={() => (selfDelModalOpen=false)}
    on:click:button--secondary={() => (selfDelModalOpen=false)}
    on:submit={selfDel}
>
    <p>Sure you want to delete this subtopic:</p>
    <p>{subtopic.name}?</p>
    <p>You'll also be deleting all entries under this subtopic</p>
</Modal>

<Modal
    danger
    shouldSubmitOnEnter
    bind:open={delModalOpen}
    modalHeading='Delete Item'
    primaryButtonText='Confirm'
    secondaryButtonText='Cancel'
    on:click:button--primary={() => (delModalOpen=false)}
    on:click:button--secondary={() => (delModalOpen=false)}
    on:submit={del}
>
    <p>Sure you want to delete this entry:</p>
    <p>{delItem.name}?</p>
</Modal>

<Row>
    {#if !$session.token}
    <Column>
        <h2>Entries in subtopic: {subtopic.name}</h2>
    </Column>
    {:else if $session.token}
    <HeaderOptions bind:item={subtopic} />
    {#if !subtopic.edit}
    <Button
        style='float:right;'
        kind='ghost'
        tooltipPosition='bottom'
        tooltipAlignment='center'
        iconDescription='Edit Subtopic name'
        size='small' hasIconOnly icon={Edit16} on:click={() => (subtopic.edit=true)}/>
    {/if}
    <Button
        style='float:right;'
        kind='ghost'
        tooltipPosition='bottom'
        tooltipAlignment='center'
        iconDescription='Add Entry'
        size='small' hasIconOnly icon={Add16} on:click={() => (goto(`add_entry/${subtopic.id}`))}/>
    <Button
        style='float:right;'
        kind='ghost'
        tooltipPosition='bottom'
        tooltipAlignment='center'
        iconDescription='Delete Subtopic'
        size='small' hasIconOnly icon={Delete16} on:click={() => (selfDelModalOpen=true)}/>
    {/if}
</Row>

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
                    iconDescription='Edit'
                    size='small' hasIconOnly icon={Edit16} on:click={() => (goto(`edit_entry/${entry.id}`))}/>
                <Button
                    kind='ghost'
                    tooltipPosition='bottom'
                    tooltipAlignment='center'
                    iconDescription='Delete Subtopic'
                    size='small' hasIconOnly icon={Delete16} on:click={() => {delItem=entry; delModalOpen=true}}/>
            </Column>
        {/if}
    </Row>
	<!--<p>{entry.verses.book} {entry.verses.chapter}: {entry.verses.start}{#if entry.verses.end} {entry.verses.end}{/if}<p/>-->
{/each}

{#if total_items < 1}
    <br/>
    <p>There don't seem to be any entries for that subtopic</p>
{:else if total_items > 37}
    <PaginationNav bind:page={page} loop total={total}/>
{/if}
