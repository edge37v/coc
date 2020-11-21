<script>
  import { post } from 'utils.js'
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
  const user = $session.user
  let isSideNavOpen = false

  let logout = async function() {
    await post(`auth/logout`)
    $session.user = null
    goto('/')
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

<Header persistentHamburgerMenu expandedByDefault={false} company="MarketLinks" platFluidFormName='' bind:isSideNavOpen href="/">
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    {#if user}
    <SideNavLink text='Profile' href='{user.id}'/>
    <SideNavLink href='classes/{user.id}' text='Classes'/>
    <SideNavMenu text='Services'>
      <SideNavMenuItem href='add_service' text='Add Service'/>
      <SideNavMenuItem href='add_s_class' text='Add Service Class'/>
    </SideNavMenu>
    <SideNavMenu text='Products'>
      <SideNavMenuItem href='add_product' text='Add Product'/>
    </SideNavMenu>
    <SideNavLink text='Saved' href='saved/{user.id}'/>
    <SideNavLink text='Logout' href='' on:click={logout} />
    {/if}
    {#if !user}
    <SideNavLink text='Login' href='login'/>
    {/if}
  </SideNavItems>
</SideNav>