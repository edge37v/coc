<script context='module'>
    import * as api from 'api'
    export async function preload(page) {
        let id = page.params.id
        let self = page.path
        let user = await api.get(`users/${id}`)
        return { user, self }
    }
</script>

<script>
    export let user
    export let self
    import { stores, goto } from '@sapper/app' 
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
        Modal,
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
        { key: 'name', value: 'Name'}
    ]

    let i
    let sq = ''
    let res
    let s_page = 1
    let s_rows = []
    let s_total
    let deleteModalOpen = false
    let token = user.token
    let s_toolbarSearch
    let selectedRowIds = []
    let s_classes = {}

    $: get_s_classes(sq)

    let del = async function() {
        let data = { ids: selectedRowIds }
        console.log(data)
        await api.put('s_classes/delete', data, token)
    }

    let archive = async function(id) {
        let data = { ids: selectedRowIds }
        if (id) data.ids = [id]
        console.log(data)
        await api.put('s_classes/archive', data, token)
        goto(self)
    }

    let unarchive = async function(id) {
        let data = { ids: selectedRowIds }
        if (id) data.ids = [id]
        await api.put('s_classes/unarchive', data, token)
        goto(self)
    }
    
    let get_s_classes = async function() {
        s_classes = await api.get(`user/s_classes?page=${s_page}&q=${sq}`, token)
        s_total = s_classes.meta.total_items
        for (i=0; i < s_total; i++) {
            let s_class = s_classes.data[i]
            s_rows = [...s_rows, { id: s_class.id, name: s_class.name}]}
    }

</script>

<Modal
    preventCloseOnClickOutside
    bind:open={deleteModalOpen}
    modalHeading='Delete Service Classes'
    primaryButtonText='Confirm'
    secondaryButtonText='Cancel'
    on:click:button--secondary={() => (deleteModalOpen = false)}
    on:click:button--primary={() => (deleteModalOpen = false)}
    on:submit={del}
>
    <p>Sure you want to let go of those?</p>
</Modal>

<Tabs aria-label='Tab navigation'>
    <Tab label='Service Classes'/>
    <div slot='content' class='tabbed-content'>
        <Grid as fullWidth let:props>
            <TabContent {...props}>
                <DataTable stickyHeader={true} title='Total results: {s_total}' batchSelection bind:selectedRowIds {headers} rows={s_rows}>
                    <span slot='cell' let:row let:cell>
                        {#if cell.key === 'name'}
                            <Link
                                inline
                                href='s_class/{row.id}'
                            >
                                {cell.value}
                            </Link>
                        {:else}{cell.value}{/if}
                    </span>
                    <Toolbar>
                        <ToolbarBatchActions>
                            <Button kind='ghost' on:click={archive}>Archive</Button>
                            <Button kind='ghost' on:click={() => (deleteModalOpen = true)}>Delete</Button>
                        </ToolbarBatchActions>
                        <ToolbarContent>
                            <ToolbarSearch bind:ref={s_toolbarSearch} bind:value={sq}/>
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