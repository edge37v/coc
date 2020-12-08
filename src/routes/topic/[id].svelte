<script context='module'>
    export async function preload(page, { token }) {
        let id = page.params.id
        let topic = await api.get(`topics?id=${id}`)
        return {topic, token}
    }
</script>

<script>
    export let topic, token
    import { Modal, Button, Row, Column, Link, PaginationNav } from 'carbon-components-svelte'
    import HeaderOptions from './HeaderOptions.svelte'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import Edit16 from 'carbon-icons-svelte/lib/Edit16'
    import Options from './Options.svelte'
    import Add16 from 'carbon-icons-svelte/lib/Add16'
    import { stores, goto } from '@sapper/app'
    import * as api from 'api'

    topic.edit = false

    let total_items
    let total_pages = 0
    let subtopics = []
    let page = 1
    let res

    let selfDelModalOpen = false

    let delItem = {}
    let delModalOpen = false

    delItem.name = ''

    let selfDel = async function(){
        let res = await api.del(`topics?id=${topic.id}`, token)
        if (res.yes){
            goto('topics')
        }
    }

    let del = async function(){
        let res = await api.del(`subtopics?id=${delItem.id}`, token)
        if (res.yes) {
            subtopics = subtopics.filter(subtopic => subtopic != delItem)
            delModalOpen = false
        }
    }

    $:get_subtopics(page)

    let get_subtopics = async function(){
        res = await api.get(`subtopics/from_topic?id=${topic.id}&page=${page}`)
        total_pages = res.total_pages
        total_items = res.total_items
        subtopics = []
        res.data.forEach((subtopic) => {
            subtopics = [...subtopics, { id: subtopic.id, name: subtopic.name, type: subtopic.type, type_plural: subtopic.type_plural, edit: false }]
        })
    }
</script>

<Modal
    danger
    shouldSubmitOnEnter
    bind:open={selfDelModalOpen}
    modalHeading='Delete this Topic'
    primaryButtonText='Confirm'
    secondaryButtonText='Cancel'
    on:click:button--primary={() => (selfDelModalOpen=false)}
    on:click:button--secondary={() => (selfDelModalOpen=false)}
    on:submit={selfDel}
>
    <p>Sure you want to delete this topic:</p>
    <p>{topic.name}?</p>
    <p>You'll also be deleting all subtopics under this topic, and all entries under those subtopics</p>
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
    <p>Sure you want to delete {delItem.name}?</p>
    <p>You'll be deleting all entries under this subtopic</p>
</Modal>

<Row>
    {#if !token}
    <Column>
        <h2>Subtopics in `{topic.name}`</h2>
    </Column>
    {:else if token}
    <HeaderOptions bind:item={topic} />
    {#if !topic.edit}
    <Button
        style='float:right;'
        kind='ghost'
        tooltipPosition='bottom'
        tooltipAlignment='center'
        iconDescription='Edit Topic name'
        size='small' hasIconOnly icon={Edit16} on:click={() => (topic.edit=true)}/>
    {/if}
    <Button
        style='float:right;'
        kind='ghost'
        tooltipPosition='bottom'
        tooltipAlignment='center'
        iconDescription='Add Topic'
        size='small' hasIconOnly icon={Add16} on:click={() => (goto(`add_subtopic/${topic.id}`))}/>
    <Button
        style='float:right;'
        kind='ghost'
        tooltipPosition='bottom'
        tooltipAlignment='center'
        iconDescription='Delete Topic'
        size='small' hasIconOnly icon={Delete16} on:click={() => (selfDelModalOpen=true)}/>
    {/if}
</Row>

<br/>
{#each subtopics as subtopic}
    <Row>
        {#if !token}
        <Column max={4} xlg={4} lg={4} md={4} sm={3}>
            <Link style='font-size: 1.2em; color: white;' href='subtopic/{subtopic.id}'>{subtopic.name}</Link>
        </Column>
        {:else if token}
            <Options bind:item={subtopic}/>
            {#if !subtopic.edit}
                <Button
                    kind='ghost'
                    tooltipPosition='bottom'
                    tooltipAlignment='center'
                    iconDescription='Edit name'
                    size='small' hasIconOnly icon={Edit16} on:click={() => (subtopic.edit=true)}/>
            {/if}
            <Button 
                kind='ghost'
                tooltipPosition='bottom'
                tooltipAlignment='center'
                iconDescription='Add Entry'
                size='small' hasIconOnly icon={Add16} on:click={() => {goto(`add_entry/${subtopic.id}`)}}/>
            <Button
                kind='ghost'
                tooltipPosition='bottom'
                tooltipAlignment='center'
                iconDescription='Delete Subtopic'
                size='small' hasIconOnly icon={Delete16} on:click={() => { delItem={subtopic}; delModalOpen=true}}/>
        {/if}
    </Row>
{/each}

{#if total_items < 1}
    <br/>
    <p>There don't seem to be any entries for this topic</p>
{:else if total_items > 37}
    <PaginationNav bind:page={page} loop total={total_pages}/>
{/if}