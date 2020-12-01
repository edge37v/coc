<script context='module'>
    export async function preload(page) {
        let id = page.params.id
        let subcategory = await api.get(`subcategories?id=${id}`)
        return { subcategory }
    }
</script>

<script>
    export let subcategory
    import * as api from 'api'
    import { goto } from '@sapper/app'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import { Row, Column, PaginationNav } from 'carbon-components-svelte'

    let entries = []
    let total = 0
    let page = 1
    let res

    let delete = async function(id){
        api.del(`entries?id=${id}`, token)
        if (res.yes) {
            entries = entries.filter(c => c.id != id)
        }
    }

    $:get_entries(page)

    let get_entries = async function() {
    	res = await api.get(`entries/from_subcategory?id=${subcategory.id}&page=${page}`)
    	total = res.total_items
    	entries = res.data
    }
</script>

<h2>Entries for subcategory: {subcategory.name}</h2>

{#each entries as entry}
    <Row>
        <Column lg={3} md={3} sm={2}>
            <Link style='font-size: 1.2em; color: white;' href='entry/{entry.id}'>{entry.name}</Link>
        </Column>
        {#if $session.token}
            <Column>
                <Button size='small' hasIconOnly icon={Delete16} on:click={}/>
            </Column>
        {/if}
    </Row>
	<p>{entry.name}<p/>
	<p>{entry.verses.book} {entry.verses.chapter}: {entry.verses.start}{#if entry.verses.end} {entry.verses.end}{/if}<p/>
{/each}

{#if total < 1}
    <br/>
    <p>There don't seem to be any entries for that subcategory</p>
{/if}
{#if total > 37}
    <PaginationNav bind:page={page} loop total={total}/>
{/if}
