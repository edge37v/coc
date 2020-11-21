<script>
    import {
        PaginationNav,
        DataTable,
        TabContent,
        ComboBox,
        Column,
        Search,
        Link,
        FluidForm,
        Button,
        Tabs,
        Tab, 
        Row,
Toolbar,
ToolbarBatchActions,
ToolbarContent,
ToolbarSearch,
ToolbarMenu,
ToolbarMenuItem,
    } from 'carbon-components-svelte'
    import { stores } from '@sapper/app'
    import Save16 from 'carbon-icons-svelte/lib/Save16'
    import Archive16 from 'carbon-icons-svelte/lib/Archive16'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'
    import * as api from 'api'
    import { globalQuery } from '../stores.js'

    const { session } = stores()
    const user = $session.user

    const headers = [
        { key: 'name', value: 'Name'},
        { key: 'user', value: 'User'},
        { key: 'save', empty: true}
    ]

    $: gl(ql)

    let selectedRowIds = []
    let s_toolbarSearch
    let s_search_expanded = false
    let filters = {}
    let services = {}
    let products = {}
    let s_rows = []
    let locations = []
    let location
    let empty = false
    let s_total = 0
    let p_total = 0
    let users = []
    let s_page = 0
    let p_page = 0
    let token
    let res
    let ql = ''
    let ids

    if (user) { token = user.token }
    services.data = []
    products.data = []
    
    function handleKeydown(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            if (s_search_expanded) {
                s_search()
            }
        }
    }

    let gl = async function() {
        res = await api.get(`locations?q=${ql}`)
        locations = res.locations
    }

    let del = async function(id) {
        let data = { ids: selectedRowIds }
        if (id) data.ids = [id]
        await api.put('s_classes/delete', data, token)
    }

    let save = async function() {
        let data = { ids: selectedRowIds }
        await api.put('services/save', data, token)
    }

    let archive = async function(id) {
        let token = user.token
        await api.del(`services/archive/${id}`, token) 
    }

    let s_search = async function() {
        res = await api.get(`s_search?q=${$globalQuery}&location=${ql}&s_page=${s_page+1}&p_page=${p_page+1}`)
        s_total = res.meta.total_items
        if (s_total < 1) empty = true
        for (let i=0; i<s_total; i++)  {
            let service = res.data[i]
            s_rows = [...s_rows, {id: service.id, name: service.name}]}
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

<!--<Row>
    <ComboBox
            bind:value={ql}
            placeholder='Location'
            items={locations}/>
</Row>-->

<Tabs>
    <Tab>Services</Tab>
    <Tab>Products</Tab>
    <div slot='content'>
        <TabContent>
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
                <span slot='cell' let:cell>
                    {#if cell.key === 'save'}
                        <Button hasIconOnly icon={Save16}/>
                    {:else}{cell.value}{/if}
                </span>
                <Toolbar>
                    <ToolbarBatchActions>
                        <Button on:click={save}>Save</Button>
                    </ToolbarBatchActions>
                    <ToolbarContent>
                        <ToolbarSearch bind:expanded={s_search_expanded} bind:ref={s_toolbarSearch} bind:value={$globalQuery}/>
                    </ToolbarContent>
                </Toolbar>
            </DataTable>
            {#if s_total>37}
            <PaginationNav page={s_page} loop total={s_total} />
            {/if}
        </TabContent>
        <TabContent>
            {#if empty===true}
            <p>Total items: {s_total}</p>
            {/if}
            {#each services.data as service}
                <div><Link href='service/{service.id}'>{service.name}</Link>: <Link href='user/{service.user.id}'>{service.user.name}</Link></div>
                <Button 
                    kind='ghost' 
                    icon={Save16} 
                    on:click={save(service.id)}
                    toolTipPosition='bottom'
                    toolTipAlignment='center'
                    iconDescription='Save'/>
                {#if user}
                {#if service.user.id == user.id}
                <Button 
                    kind='ghost' 
                    icon={Save16} 
                    hasIconOnly 
                    on:click={archive(service.id)}
                    toolTipPosition='bottom'
                    toolTipAlignment='center'
                    iconDescription='Archive'/>
                <Button 
                    kind='ghost' 
                    icon={Save16} 
                    hasIconOnly 
                    on:click={del(service.id)}
                    toolTipPosition='bottom'
                    toolTipAlignment='center'
                    iconDescription='Delete'/>
                {/if}
                {/if}
            {/each}
            {#if empty===true}
                    <p>There are no results for that query</p>
            {/if}
            {#if s_total>37}
            <PaginationNav page={s_page} loop total={s_total} />
            {/if}
        </TabContent>
    </div>
</Tabs>



