<script>
    import * as api from 'api'
    import { stores, goto } from '@sapper/app'
    import Add16 from 'carbon-icons-svelte/lib/Add16'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import { Button, Row, Column, FluidForm, Search, Link, PaginationNav } from 'carbon-components-svelte'

    const { session } = stores()
    const token = $session.token

    let res
    let search
    let page = 1
    let total = 0
    let categories = []

    $:get_categories(page)

    let delete = async function(id){
        api.del(`categories?id=${id}`, token)
        if (res.yes) {
            categories = categories.filter(c => c.id != id)
        }
    }

    let go = async function(id){
        goto(`add_subcategory/${id}`)
    }

    let search_categories = async function(){
        res = api.get(`categories/search/${search}`)
    }

    let get_categories = async function(){
        res = await api.get(`categories/${page}`)
        console.log(res)
        total = res.total_items
        categories = res.data
    }
</script>

<h2>Categories</h2>
<br/>

<FluidForm>
    <Search bind:value={search}/>
</FluidForm>

<br/>
{#each categories as category}
    <Row>
        <Column lg={2} md={2} sm={2}>
            <Link style='font-size: 1.2em; color: white;' href='category/{category.id}'>{category.name}</Link>
        </Column>
        {#if $session.token}
            <Column>
                <Button size='small' hasIconOnly icon={Add16} on:click={go(category.id)}/>
            </Column>
        {/if}
    </Row>
{/each}

<PaginationNav bind:page={page} shown={3} loop total={total}/>