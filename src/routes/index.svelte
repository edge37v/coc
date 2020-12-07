<script>
    import * as api from 'api'
    import { stores, goto } from '@sapper/app'
    import Options from '../components/Options.svelte'
    import Add16 from 'carbon-icons-svelte/lib/Add16'
    import Edit16 from 'carbon-icons-svelte/lib/Edit16'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import Checkmark16 from 'carbon-icons-svelte/lib/Checkmark16'
    import { TextInput, Modal, Button, Row, Column, FluidForm, Search, Link, PaginationNav } from 'carbon-components-svelte'

    const { session } = stores()
    const token = $session.token

    let adding = false
    
    let search
    let page = 1
    let total = 0
    let topics = []
    let newTopics = []

    $:get_topics(page)

    let delItem = {}
    let delModalOpen = false

    delItem.name = ''

    let addToList = function(){
        topics = [...topics, { name, type: 'topic', type_plural: 'topics', edit: true, isNew: true }]
    }

    let del = async function(){
        let res = await api.del(`topics?id=${delItem.id}`, token)
        if (res.yes) {
            topics = topics.filter(topic => topic != delItem)
            delModalOpen=false
        }
    }

    let search_topics = async function(){
        res = api.get(`topics/search/${search}`)
    }

    let get_topics = async function(){
        let res = await api.get(`topics/${page}`)
        total = res.total_pages
        res.data.forEach((topic) => {
            topics = [...topics, { id: topic.id, name: topic.name, type: 'topic', type_plural: 'topics', edit: false }]
        })
    }
</script>

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
    <p style="font-weight: 600;">Sure you want to delete this topic:</p>
    <p>{delItem.name}?</p>
    <p>You'll be deleting all subtopics under this topic, and all entries under those subtopics</p>
</Modal>

<Row>
    <Column max={5} xlg={5} lg={5} md={5} sm={5}>
        <h2>Topics</h2>
    </Column>
    {#if $session.token}
    <Column>
        {#if !adding}
        <Button
            kind='ghost'
            tooltipPosition='bottom'
            tooltipAlignment='center'
            iconDescription='Add Topic'
            size='small' hasIconOnly icon={Add16} on:click={() => {addToList(); adding=true}}/>
        {/if}
    </Column>
    {/if}
</Row>

<!--<FluidForm>
    <Search bind:value={search}/>
</FluidForm>-->

<br/>
{#each topics as topic}
    <Row>
        {#if !$session.token}
            <Column max={4} xlg={4} lg={4} md={4} sm={4}>
                <Link style='font-size: 1.2em; color: white;' href='topic/{topic.id}'>{topic.name}</Link>
            </Column>
        {:else if $session.token}
            <Options bind:adding bind:items={topics} bind:item={topic}/>
            {#if !topic.edit}
            <Button
                kind='ghost'
                tooltipPosition='bottom'
                tooltipAlignment='center'
                iconDescription='Edit'
                size='small' hasIconOnly icon={Edit16} on:click={() => {topic.edit = true}}/>
            {/if}
            {#if !topic.isNew}
                <Button
                    kind='ghost'
                    tooltipPosition='bottom'
                    tooltipAlignment='center'
                    iconDescription='Add Subtopic'
                    size='small' hasIconOnly icon={Add16} on:click={() => (goto(`add_subtopic/${topic.id}`))}/>
                <Button
                    kind='ghost'
                    tooltipPosition='bottom'
                    tooltipAlignment='center'
                    iconDescription='Delete Topic'
                    size='small' hasIconOnly icon={Delete16} on:click={() => {delItem = topic; delModalOpen=true}}/>
            {/if}
        {/if}
    </Row>
{/each}