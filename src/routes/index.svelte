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
Modal,
    } from 'carbon-components-svelte'
    import { stores, goto } from '@sapper/app'
    import Save16 from 'carbon-icons-svelte/lib/Save16'
    import * as api from 'api'
    import { globalQuery } from '../stores.js'

    const { session } = stores()
    const user = $session.user

    const headers = [
        { key: 'name', value: 'Name'},
        { key: 'user', value: 'User'}
    ]

    $: gl(ql)

    let loginQueryOpen = false

    let position
    let positionErrorCode
    let positionErrorMessage

    function success() {
        position.latitude = postion.coords.latitude
        position.longitude = position.coords.longitude
    }

    function error(error) {
        isPosition = false
        positionErrorCode = error.code
        positionErrorMessage = error.message
    }

    let options = {
        enableHighAccuracy: true
    }

    const watchID = navigator.geolocation.watchPosition(success, error, options)

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

    let save = async function() {
        if ( !user ) {
            loginQueryOpen = true
            return
        }
        let data = { ids: selectedRowIds }
        await api.put('services/save', data, token)
    }

    let s_search = async function() {
        let data = {}
        if ( isPosition ) {
            data.position = position
        }
        res = await api.put(`services/search?q=${$globalQuery}&s_page=${s_page+1}&p_page=${p_page+1}`, data)
        s_total = res.meta.total_items
        if (s_total < 1) empty = true
        for (let i=0; i<s_total; i++)  {
            let service = res.data[i]
            s_rows = [...s_rows, {id: service.id, name: service.name}]}
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

<Modal
    size='sm'
    preventCloseOnClickOutside
    bind:open={loginQueryOpen}
    modalHeading='Must be logged in'
    primaryButtonText='Log In'
    secondaryButtonText='Cancel'
    on:click:button--secondary={() => (loginQueryOpen = false)}
    on:submit={() => (goto('login'))}
>
    <p>That action requires you to be logged in</p>
</Modal>

<!--<Row>
    <ComboBox
            bind:value={ql}
            placeholder='Location'
            items={locations}/>
</Row>-->

<Tabs>
    <Tab>Services</Tab>
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
    </div>
</Tabs>



