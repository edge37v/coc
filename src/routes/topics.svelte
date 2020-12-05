<script>
    import * as api from 'api'
    import { stores, goto } from '@sapper/app'
    import Options from '../components/Options.svelte'
    import Add16 from 'carbon-icons-svelte/lib/Add16'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import { TextInput, Modal, Button, Row, Column, FluidForm, Search, Link, PaginationNav } from 'carbon-components-svelte'

    const { session } = stores()
    const token = $session.token

    let search
    let page = 1
    let total = 0
    let topics = []

    $:get_topics(page)

    let delItem = {}
    let delModalOpen = false

    delItem.name = ''

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
            topics = [...topics, { id: topic.id, name: topic.name, type: topic.type, type_plural: topic.type_plural, edit: false }]
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
            <Options bind:item={topic}/>
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
    </Row>
{/each}

<PaginationNav bind:page={page} shown={3} loop total={total}/>