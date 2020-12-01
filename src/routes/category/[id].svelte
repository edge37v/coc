<script context='module'>
    export async function preload(page, token) {
        let id = page.params.id
        let category = await api.get(`categories?id=${id}`)
        return {category}
    }
</script>

<script>
    export let category

    import { Button, Row, Column, Link, PaginationNav } from 'carbon-components-svelte'
    import Add16 from 'carbon-icons-svelte/lib/Add16'
    import { stores, goto } from '@sapper/app'
    import * as api from 'api'

    const {session} = stores()

    let subcategories = []
    let total = 0
    let page = 1
    let res

    let delete = async function(id){
        api.del(`subcategories?id=${id}`, token)
        if (res.yes) {
            subcategories = subcategories.filter(c => c.id != id)
        }
    }

    $:get_subcategories(page)

    let get_subcategories = async function(){
        res = await api.get(`subcategories/from_category?id=${category.id}&page=${page}`)
        total = res.total_items
        subcategories = res.data
    }
</script>

<h2>Subcategories in `{category.name}`</h2>

{#each subcategories as subcategory}
    <Row>
        <Column lg={3} md={3} sm={2}>
            <Link style='font-size: 1.2em; color: white;' href='subcategory/{subcategory.id}'>{subcategory.name}</Link>
        </Column>
        {#if $session.token}
            <Column>
                <Button size='small' hasIconOnly icon={Add16} on:click={() => {goto(`add_entry/${subcategory.id}`)}}/>
            </Column>
        {/if}
    </Row>
{/each}

<PaginationNav bind:page={page} shown={3} loop total={total}/>