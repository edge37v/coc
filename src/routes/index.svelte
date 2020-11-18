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
        Tabs,
        Tab, 
        Row,
    } from 'carbon-components-svelte'
    import * as api from 'api'
    import { globalQuery } from '../stores.js'

    $: gl(ql)

    let filters = {}
    let services = {}
    let products = {}
    let headers = [
        {key: 'name', value: 'Name'}]
    let srows = []
    let locations = []
    let location
    let empty = false
    let s_total = 0
    let p_total = 0
    let users = []
    let s_page = 0
    let p_page = 0
    let res
    let ql = ''


    services.data = []
    products.data = []

    let gl = async function() {
        res = await api.get(`locations?q=${ql}`)
        locations = res.locations
    }

    let search = async function() {
        res = await api.get(`search?q=${$globalQuery}&location=${ql}&s_page=${s_page+1}&p_page=${p_page+1}`)
        services = res.services
        products = res.products
        s_total = res.services.meta.total_items
        if (s_total < 1) empty = true
        users = res.users
        for (let i=0; i<s_total; i++)  {
            let service = res.services.data[i]
            srows = [...srows, {id: service.id, name: service.name}]}
    }
</script>

<Form on:submit={search}>
    <Search
    bind:value={$globalQuery} />
</Form>

<!--<Row>
    <ComboBox
            bind:value={ql}
            placeholder='Location'
            items={locations}/>
</Row>-->

{#if res}
<Tabs>
    <Tab>Services</Tab>
    <Tab>Products</Tab>
    <div slot='content'>
        <TabContent>
            {#if services.data !== []}
                {#each services.data as service}
                    <div><Link href='service/{service.id}'>{service.name}</Link>: <Link href='user/{service.user.id}'>{service.user.name}</Link></div>
                {/each}
            {:else if empty==true}
                    <p>There are no results for that query</p>
            {/if}
            {#if s_total>37}
            <PaginationNav page={s_page} loop total={s_total} />
            {/if}
        </TabContent>
        <TabContent>
            {#if products !== 'null'}
                {#each products.data as product}
                    <div><Link href='product/{product.id}'>{product.name}</Link>: <Link href='user/{product.user.id}'>{product.user.name}</Link></div>
                {/each}
            {:else}
                    <p>There are no results for that search query</p>
            {/if}
            {#if p_total>37}
            <PaginationNav page={p_page} loop total={p_total} />
            {/if}
        </TabContent>
    </div>
</Tabs>
{/if}

<style></style>



