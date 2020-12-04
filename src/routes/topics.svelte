<script>
    import * as api from 'api'
    import { stores, goto } from '@sapper/app'
    import Options from '../components/Options.svelte'
    import Add16 from 'carbon-icons-svelte/lib/Add16'
    import Edit16 from 'carbon-icons-svelte/lib/Edit16'
    import Close16 from 'carbon-icons-svelte/lib/Close16'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import Checkmark16 from 'carbon-icons-svelte/lib/Checkmark16'
    import { TextInput, Modal, Button, Row, Column, FluidForm, Search, Link, PaginationNav } from 'carbon-components-svelte'

    const { session } = stores()
    const token = $session.token

    let search
    let page = 1
    let total = 0
    let topics = []

    $:get_topics(page)

    let delTopic = {}
    let delModalOpen = false

    delTopic.name = ''

    let edit = async function(topic){
        let id = topic.id
        let name = topic.name
        let data = { id, name}
        let res = await api.put(`topics`, data, token)
        if (res.yes){
            topic.edit = false
        }
    }

    let del = async function(){
        let res = await api.del(`topics?id=${delTopic.id}`, token)
        if (res.yes) {
            topics = topics.filter(t => t != delTopic)
            delModalOpen=false
        }
    }

    let go = async function(id){
        goto(`add_subtopic/${id}`)
    }

    let search_topics = async function(){
        res = api.get(`topics/search/${search}`)
    }

    let get_topics = async function(){
        let res = await api.get(`topics/${page}`)
        total = res.total_pages
        console.log(res)
        res.data.forEach((topic) => {
            topics = [...topics, { id: topic.id, name: topic.name, type: topic.type, edit: false, }]
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
    <p style="font-weight: 600;">Sure you want to delete {delTopic.name}?</p>
    <p>You'll be deleting all subtopics under this topic, and all entries under those subtopics</p>
</Modal>

<h2>Topics</h2>
<br/>

<FluidForm>
    <Search bind:value={search}/>
</FluidForm>

<br/>
{#each topics as topic}
    <Row>
        {#if !$session.token}
            <Column lg={2} md={2} sm={2}>
                <Link style='font-size: 1.2em; color: white;' href='topic/{topic.id}'>{topic.name}</Link>
            </Column>
        {:else if $session.token}
            <Column lg={2} md={2} sm={2}>
                <Options bind:topic/>
            </Column>
            {#if topic.edit}
                <Button
                    kind='ghost'
                    tooltipPosition='bottom'
                    tooltipAlignment='center'
                    iconDescription='Cancel'
                    size='small' hasIconOnly icon={Close16} on:click={() => (topic.edit = false)}/>
                <Button
                    kind='ghost'
                    tooltipPosition='bottom'
                    tooltipAlignment='center'
                    iconDescription='Apply'
                    size='small' hasIconOnly icon={Checkmark16} on:click={edit(topic)}/>
            {/if}
            <Button
                    kind='ghost'
                    tooltipPosition='bottom'
                    tooltipAlignment='center'
                    iconDescription='Edit'
                    size='small' hasIconOnly icon={Edit16} on:click={() => {topic.edit = true}}/>
            <Button
                kind='ghost'
                tooltipPosition='bottom'
                tooltipAlignment='center'
                iconDescription='Add Subtopic'
                size='small' hasIconOnly icon={Add16} on:click={go(topic.id)}/>
            <Button
                kind='ghost'
                tooltipPosition='bottom'
                tooltipAlignment='center'
                iconDescription='Delete Topic'
                size='small' hasIconOnly icon={Delete16} on:click={() => {delTopic = topic; delModalOpen=true}}/>
        {/if}
    </Row>
{/each}

<PaginationNav bind:page={page} shown={3} loop total={total}/>