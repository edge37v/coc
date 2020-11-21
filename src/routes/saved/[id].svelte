<script context='module'>
    import * as api from 'api'
    export async function preload(page) {
        let id = page.params.id
        let user = await api.get(`users/${id}`)
        return { user }
    }
</script>

<script>
    export let user
    import { stores } from '@sapper/app' 
    import {
        TabContent,
        DataTable,
        Link,
        Button,
        ToolbarBatchActions,
        ToolbarSearch,
        ToolbarMenu,
        ToolbarMenuItem,
        ToolbarContent,
        Toolbar,
        Column,
        Search,
        Grid,
        Tabs,
        Tab,
        Row
    } from 'carbon-components-svelte';
    import Archive16 from 'carbon-icons-svelte/lib/Archive16'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'

    const headers = [
        { key: 'name', value: 'Name'},
        { key: 'archive', empty: true},
        { key: 'delete', empty: true}
    ]

    let auth
    const { session } = stores()
    if ($session.user) { auth = true }

    let sq
    let res
    let s_page
    let s_rows
    let s_total
    let token = user.token
    let s_toolbarSearch
    let s_search_expanded = false
    let selectedRowIds = []
    let s_classes = {}

    $: get_saved(sq)

    let unsave = async function(id) {
        let data = { ids: selectedRowIds }
        if (id) {
            data.ids = [id]
            console.log(id)
        }
        await api.put('services/unsave', data, token)
    }
    
    let get_saved = async function() {
        saved = await api.get(`user/saved?page=${s_page}`, token)
        s_total = saved.meta.total_items
        for (i=0; i < s_total; i++) {
            let s_saved = saved.data[i]
            s_rows = [...s_rows, { id: s_saved.id, name: s_saved.name }]}
    }

</script>

<Tabs aria-label='Tab navigation'>
    <Tab label='s_class Classes'/>
    <div slot='content' class='tabbed-content'>
        <Grid as fullWidth let:props>
            <TabContent {...props}>
                <DataTable title='Total results: {s_total}' batchSelection bind:selectedRowIds {headers} rows={s_rows}>
                    <span slot='cell' let:row let:cell>
                        {#if cell.key === 'name'}
                            <Link
                                inline
                                href='service/{row.id}'
                            >
                                {cell.value}
                            </Link>
                        {:else}{cell.value}{/if}
                    </span>
                    <span slot='cell' let:row let:cell>
                        {#if cell.key === 'archive'}
                            <Button kind='ghost' hasIconOnly on:click={unsave(row.id)} icon={Archive16}/>
                        {:else}{cell.value}{/if}
                    </span>
                    <Toolbar>
                        <ToolbarBatchActions>
                            <Button kind='ghost' on:click={unsave}>Unsave</Button>
                        </ToolbarBatchActions>
                        <ToolbarContent>
                            <ToolbarSearch bind:expanded={s_search_expanded} bind:value={sq}/>
                            <ToolbarMenu>
                                <ToolbarMenuItem>
                                    Set All
                                </ToolbarMenuItem>
                            </ToolbarMenu>
                        </ToolbarContent>
                    </Toolbar>
                </DataTable>
            </TabContent>
        </Grid>
    </div>
</Tabs>