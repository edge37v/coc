<script>
    import {
        PaginationNav,
        DataTable,
        TabContent,
        ComboBox,
        Column,
        Search,
        Form,
        Tabs,
        Tab, 
        Row,
    } from 'carbon-components-svelte'
    import * as api from 'api'

    $: gl(ql)

    let filters = {}
    let services = {}
    let products = {}
    let headers = [
        {key: 'name', value: 'Name'}]
    let srows = []
    let locations = []
    let location
    let s_total
    let p_total
    let users = []
    let s_page = 0
    let p_page = 0
    let res
    let ql = ''
    let q

    services.data = []
    products.data = []

    let gl = async function() {
        res = await api.get(`locations?q=${ql}`)
        locations = res.locations
    }

    let search = async function() {
        res = await api.get(`search?q=${q}&location=${ql}&s_page=${s_page+1}&p_page=${p_page+1}`)
        services = res.services
        products = res.products
        s_total = res.services.meta.total_items
        users = res.users
        for (let i=0; i<s_total; i++)  {
            let service = res.services.data[i]
            srows = [...srows, {id: service.id, name: service.name}]}
    }
</script>

<Row>
    <Form on:submit={search}>
        <Search
        bind:value={q} />
    </Form>
</Row>
<p>{ql}</p>
<Row>
    <ComboBox
            bind:value={ql}
            placeholder='Location'
            items={locations}/>
</Row>

<Tabs>
    <Tab>Services</Tab>
    <Tab>Products</Tab>
    <div slot='content'>
        <TabContent>
                {#if services !== 'null'}
                    {#each services.data as service}
                        <p><a href='service/{service.id}'>{service.name}</a>: <a href='user/{service.user.id}'>{service.user.name}</a></p>
                    {/each}
                {:else}
                      <p>There are no results for that search query</p>
                {/if}
            <PaginationNav page={s_page} loop total={s_total} />
        </TabContent>
        <TabContent>
            <Row class="product-list">
                <Column>
                {#if products !== 'null'}
                  {#each products.data as product (product.id)}
                      <p>
                          <a href='product'>{product.name}</a>
                      </p>
                  {/each}
                {:else}
                      <p>There are no results for that search query</p>
                {/if}
                </Column>
            </Row>
            <PaginationNav page={p_page} loop total={p_total} />
        </TabContent>
    </div>
</Tabs>

<style></style>



