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
        Column,
        Grid,
        Tabs,
        Tab,
        Row
    } from 'carbon-components-svelte';

    let auth
    const { session } = stores()
    if ($session.user) { auth = true }

    let q
    let res
    let page
    let users = user.saved_users
    let services = user.saved_services
    let products = user.saved_products

    let get_services = async function() {
        let data
        services = await api.get(`users/saved_services/${user.id}`, data, user.token)
    }

    let get = async function() {
        res = await api.get(`search?q=${q}&id=${user.id}&page=${page+1}`)
        user = res.user
        services = res.services
        products = res.products
    }

</script>

<Tabs aria-label='Tab navigation'>
    <Tab label='Users'/>
    <Tab label='Services'/>
    <Tab label='Products'/>
    <div slot='content' class='tabbed-content'>
        <Grid as fullWidth let:props>
            <TabContent {...props}>
                <Row class="user-list">
                    <Column>
                    {#if users !== 'null'}
                    {#each users.data as user (user.id)}
                        <p>
                            <a style='text-decoration: none;' href='user/{user.id}'>{user.name}</a>
                        </p>
                    {/each}
                    {:else}
                        <p>There are no results for that query</p>
                    {/if}
                    </Column>
                </Row>
            </TabContent>
            <TabContent {...props}>
                <Row class="service-list">
                    <Column>
                    {#if services !== 'null'}
                    {#each services.data as service (service.id)}
                        <p>
                            <a style='text-decoration: none;' href='service/{service.id}'>{service.name}</a>
                        </p>
                    {/each}
                    {:else}
                        <p>There are no results for that query</p>
                    {/if}
                    </Column>
                </Row>
            </TabContent>
            <TabContent {...props}>
                <Row class="product-list">
                    <Column>
                    {#if products !== 'null'}
                    {#each products.data as product (product.id)}
                        <p>
                            <a style='text-decoration: none;' href='product' on:click={`$product = product`}>{product.name}</a>
                                <Row>
                                <Column>{product.subject}</Column>
                                <Column>{product.year}</Column>
                                </Row>
                        </p>
                    {/each}
                    {:else}
                        <p>There are no results for that query</p>
                    {/if}
                    </Column>
                    </Row>
            </TabContent>
        </Grid>
    </div>
</Tabs>