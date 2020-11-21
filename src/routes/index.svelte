<script>
    import {
        PaginationNav,
        DataTable,
        TabContent,
        ComboBox,
        Column,
        Search,
        Link,
        Form,
        Button,
        Tabs,
        Tab, 
        Row,
Toolbar,
ToolbarBatchActions,
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

    let save = async function() {
        if ( !user ) {
            loginQueryOpen = true
            return
        }
        let data = { ids: selectedRowIds }
        await api.put('services/save', data, token)
    }

    let search = async function() {
        let data = {
            q: $globalQuery,
            page: s_page+1
        }
        if ( position ) {
            data.position = position
        }
        res = await api.put('services/search', data)
        console.log(res)
        s_total = res.meta.total_items
        if (s_total < 1) empty = true
        for (let i=0; i<s_total; i++)  {
            let service = res.data[i]
            s_rows = [...s_rows, {id: service.id, name: service.name}]}
    }
</script>

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
            <Form on:submit={search}>
                <Search autofocus={true} placeholder='Search services' bind:value={$globalQuery}/>
            </Form>
            {#if !empty}
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
                    </Toolbar>
                </DataTable>
                {#if s_total>37}
                <PaginationNav page={s_page} loop total={s_total} />
                {/if}
            {/if}
        </TabContent>
    </div>
</Tabs>