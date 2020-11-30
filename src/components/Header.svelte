<script>
  import { post } from 'utils.js'
  import { onMount } from 'svelte'
  import * as api from 'api'
  import { stores, goto } from '@sapper/app'
  import {
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
    SkipToContent,
    Header
  } from "carbon-components-svelte"
  import { getContext } from "svelte"

  const ctx = getContext("Theme")
  const { session } = stores()
  let isSideNavOpen = false

  let page = 1
  let categories
  let categoriesData

  onMount(() => {
    categoriesData = api.get(`categories/${page}`)
    categories = categoriesData.data
  })

  let logout = async function() {
    await post(`auth/logout`)
    delete $session.user
    goto('login')
  }

  $: if (ctx) {
    ctx.dark.subscribe((value) => {
      return
    });
    ctx.light.subscribe((value) => {
      return
    });
    ctx.updateVar("--cds-productive-heading-06-font-size", "4rem");
  }
</script>

<Header 
  persistentHamburgerMenu={true}
  company="MarketLinks"
  platFluidFormName=''
  bind:isSideNavOpen
  href='/'
>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    {#each categories as category}
      <SideNavMenu text={category.name}>
        {#each category.subcategories as subcategory}
          <SideNavMenuItem href='subcategory/{subcategory.id}' text={subcategory.name}/>
        {/each}
      </SideNavMenu>
    {/each}
    {#if $session.token}
      <SideNavLink text='Logout' href='' on:click={logout} />
    {/if}
  </SideNavItems>
</SideNav>