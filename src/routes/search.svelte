<script>
    import {
        PaginationNav,
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
    let services = []
    let products = []
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

    let gl = async function() {
        res = await api.get(`locations?q=${ql}`)
        locations = res.locations
    }

    let search = async function() {
        res = await api.get(`search?q=${q}&location=${ql}&s_page=${s_page+1}&p_page=${p_page+1}`)
        users = res.users
        services = res.services
        products = res.products
        s_total = services.total
        p_total = products.total
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
            <Row class="service-list">
                <Column>
                {#if services !== 'null'}
                  {#each services as service (service.id)}
                      <p>
                          <a href='service' on:click={`$service = service`}>{service.name}</a>
                          <Row>
                                <Column>{service.subject}</Column>
                                <Column>{service.year}</Column>
                          </Row>
                      </p>
                  {/each}
                {:else}
                      <p>There are no results for that search query</p>
                {/if}
                </Column>
            </Row>
            <PaginationNav page={s_page} loop total={p_total} />
        </TabContent>
        <TabContent>
            <Row class="product-list">
                <Column>
                {#if products !== 'null'}
                  {#each products as product (product.id)}
                      <p>
                          <a href='product' on:click={`$product = product`}>{product.name}</a>
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


