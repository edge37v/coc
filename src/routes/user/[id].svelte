<script context='module'>
    import * as api from 'api'
    export async function preload(page) {
        const id = page.params.id
        user = await api.post(`users?id=${id}`)
        return user
    }
</script>

<script>
    export let user
    import {
        TabContent,
        Column,
        Link,
        Tabs,
        Tab,
        Row
    } from 'carbon-components-svelte';

    $: get(page)

    let q
    let res
    let page
    let services= []
    let products = []

    let get = async function() {
        res = await api.get(`search?q=${q}&id=${user.id}&page=${page+1}`)
        user = res.user
        services = res.services
        products = res.products
    }

</script>

<Tabs>
    <Tab>Profile</Tab>
    <Tab>Services</Tab>
`    <TabContent>
        <p>{user.name}</p>
        <p>{user.phone}</p>
        <p>{user.email}</p>
        <p><a href={user.website}>{user.website}</a></p>
    </TabContent>
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
    </TabContent>
    <TabContent>
        <Row class="product-list">
            <Column>
            {#if products !== 'null'}
              {#each products as product (product.id)}
                  <p>
                      <a href='product' on:click={`$product = product`}>{product.name}</a>
                        <Row>
                          <Column>{product.subject}</Column>
                          <Column>{product.year}</Column>
                        </Row>
                  </p>
              {/each}
            {:else}
                  <p>There are no results for that search query</p>
            {/if}
            </Column>
            </Row>
    </TabContent>
</Tabs>

<Row>
    <Link href='edit_'>Edit Profile</Link>
</Row>
<Row>
    <Link href='add_service'>Add service</Link>
</Row>
<Row>
    <Link href='add_product'>Add product</Link>
</Row>