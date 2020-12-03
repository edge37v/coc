<script>
    import * as api from 'api'
    import { stores, goto } from '@sapper/app'
    import Add16 from 'carbon-icons-svelte/lib/Add16'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import { Modal, Button, Row, Column, FluidForm, Search, Link, PaginationNav } from 'carbon-components-svelte'

    const { session } = stores()
    const token = $session.token

    let search
    let page = 1
    let total_pages = 0
    let items = []

    let delModalOpen = false

    let add(id, type){
    	if (type=='topic'){
    		goto{`add_subtopic/${id}`}
    	}
    	elseif (type=='suptopic')
    		goto{`add_entry/${id}`}
    }

    let delete = async function(id){
        api.del(`topics?id=${id}`, token)
        if (res.yes) {
            topics = topics.filter(c => c.id != id)
        }
    }

    let search_topics = async function(){
        let res = await api.get(`search?q=${search}`)
        total =res.total_pages
        results = res.data
    }
</script>

<Modal
	bind:open={delModalOpen}
/>

<h2>Categories</h2>
<br/>

<FluidForm>
    <Search bind:value={search}/>
</FluidForm>

<br/>
{#each items as item}
    <Row>
        <Column lg={2} md={2} sm={2}>
            <Link style='font-size: 1.2em; color: white;' href='item/{item.id}'>{item.name}</Link>
        </Column>
        {#if $session.token}
            <Column>
            	{#if item.type!='entry'}
                <Button size='small' hasIconOnly icon={Add16} on:click={() => {add(item.id, item.type))}}/>
            	{/if}
                <Button size='small' hasIconOnly icon={Delete16} on:click={() => {add(item.id, item.type))}}/>
            </Column>
        {/if}
    </Row>
{/each}

<PaginationNav bind:page={page} shown={3} loop total={total}/>