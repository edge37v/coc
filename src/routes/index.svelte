<script>
    import * as api from 'api'
    import { stores, goto } from '@sapper/app'
    import Add16 from 'carbon-icons-svelte/lib/Add16'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import { Modal, Button, Row, Column, FluidForm, Search, Link, PaginationNav } from 'carbon-components-svelte'

    const { session } = stores()
    const token = $session.token

    let res
    let search
    let page = 1
    let total = 0
    let topics = []

    $:get_topics(page)

    let delID
    let delModalOpen = false

    let preDel = async function(id){
        delID = id
        delModalOpen=true
    }

    let del = async function(id){
        api.del(`topics?id=${id}`, token)
        if (res.yes) {
            topics = topics.filter(c => c.id != id)
        }
    }

    let go = async function(id){
        goto(`add_subtopic/${id}`)
    }

    let search_topics = async function(){
        res = api.get(`topics/search/${search}`)
    }

    let get_topics = async function(){
        res = await api.get(`topics/${page}`)
        console.log(res)
        total = res.total_pages
        topics = res.data
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

<h2>Topics</h2>
<br/>

<FluidForm>
    <Search bind:value={search}/>
</FluidForm>

<br/>
{#each topics as topic}
    <Row>
        <Column lg={2} md={2} sm={2}>
            <Link style='font-size: 1.2em; color: white;' href='topic/{topic.id}'>{topic.name}</Link>
        </Column>
        {#if $session.token}
            <Column>
                <Button size='small' hasIconOnly icon={Add16} on:click={go(topic.id)}/>
                <Button size='small' hasIconOnly icon={Delete16} on:click={() => {delID = topic.id; delModalOpen=true}}/>
            </Column>
        {/if}
    </Row>
{/each}

<PaginationNav bind:page={page} shown={3} loop total={total}/>