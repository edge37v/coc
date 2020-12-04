<script>
    import * as api from 'api'
    import { globalQuery } from '../stores.js'
    import { stores, goto } from '@sapper/app'
    import Add16 from 'carbon-icons-svelte/lib/Add16'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import { Modal, Button, Row, Column, Form, Search, Link, PaginationNav } from 'carbon-components-svelte'

    const { session } = stores()
    const token = $session.token

    let page
    let total = 0
    let items = []

    let delID
    let delType
    let delModalOpen = false

    let add = function(id, type){
    	if (type == 'topic'){
    		goto(`add_subtopic/${id}`)
    	} else if (type == 'subtopic'){
    		goto(`add_entry/${id}`)
    	}
    }

    //run before opening delete modal, cuz doing it in html doesn't seem to work
    let preDel = async function(id, type){
        delID = id
        delType = type
        delModalOpen=true
    }

    let del = async function(id, type){
        api.del(`${type}?id=${id}`, token)
        if (res.yes) {
            topics = topics.filter(c => c.id != id)
        }
    }

    let search = async function(){
        console.log(page)
        let res = await api.get(`search?q=${$globalQuery}&page=${page}`)
        total =res.total_pages
        items = res.data
        console.log(res)
    }
</script>

<Modal
	alert
	shouldSubmitOnEnter
	bind:open={delModalOpen}
	modalHeading='Delete Item'
	primaryButtonText='Confirm'
	secondaryButtonText='Cancel'
	on:click:button--primary={() => (del(delID, delType))}
	on:click:button--secondary={() => (delModalOpen=false)}
>
	<p>Sure you want to delete that?</p>
</Modal>

<Form on:submit={search}>
    <Search
        autofocus={true}
        placeholder='Search all items'
        bind:value={$globalQuery}/>
</Form>

<br/>
{#each items as item}
    <Row>
        <Column lg={2} md={2} sm={2}>
            <Link style='font-size: 1.2em; color: white;' href='item/{item.id}'>{item.name}</Link>
        </Column>
        {#if $session.token}
            <Column>
            	{#if item.type!='entry'}
                <Button
                    kind='ghost'
                    tooltipPosition='bottom'
                    tooltipAlignment='center'
                    iconDescription='Add something'
                    size='small' hasIconOnly icon={Add16} on:click={() => (add(item.id, item.type))}/>
            	{/if}
                <Button size='small' hasIconOnly icon={Delete16} on:click={() => (preDel(item.id, item.type))}/>
            </Column>
        {/if}
    </Row>
{/each}

<PaginationNav bind:page={page} shown={3} loop total={total}/>