<script context='module'>
    export async function preload(page, token) {
        let id = page.params.id
        let topic = await api.get(`topics?id=${id}`)
        return {topic}
    }
</script>

<script>
    export let topic

    import { Modal, Button, Row, Column, Link, PaginationNav } from 'carbon-components-svelte'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import Add16 from 'carbon-icons-svelte/lib/Add16'
    import { stores, goto } from '@sapper/app'
    import * as api from 'api'

    const {session} = stores()

    let subtopics = []
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
        api.del(`subtopics?id=${id}`, token)
        if (res.yes) {
            subtopics = subtopics.filter(c => c.id != id)
        }
    }

    $:get_subtopics(page)

    let get_subtopics = async function(){
        res = await api.get(`subtopics/from_topic?id=${topic.id}&page=${page}`)
        total = res.total_pages
        subtopics = res.data
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

<h2>Subtopics in `{topic.name}`</h2>

{#each subtopics as subtopic}
    <Row>
        <Column lg={3} md={3} sm={2}>
            <Link style='font-size: 1.2em; color: white;' href='subtopic/{subtopic.id}'>{subtopic.name}</Link>
        </Column>
        {#if $session.token}
            <Column>
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
                    size='small' hasIconOnly icon={Delete16} on:click={preDel(subtopic.id)}/>
            </Column>
        {/if}
    </Row>
{/each}

<PaginationNav bind:page={page} shown={3} loop total={total}/>