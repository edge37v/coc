<script>
  import { post } from 'utils'
  import { stores, goto } from '@sapper/app'
  import {
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
    SkipToContent,
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderPanelLinks,
    HeaderPanelLink
  } from "carbon-components-svelte"
  import { getContext } from "svelte"

  const ctx = getContext("Theme")
  const { session } = stores()
  const user = $session.user
  let isSideNavOpen = false
  let isOpen = false
  let ebp = false

  let logout = async function() {
    await post('/auth/logout')
    $session.user = null
    goto('/')
  }

  $: if (ctx) {
    ctx.dark.subscribe((value) => {
      console.log("dark mode?", value);
    });
    ctx.light.subscribe((value) => {
      console.log("light mode?", value);
    });
    ctx.updateVar("--cds-productive-heading-06-font-size", "4rem");
  }
</script>

<Header expandedByDefault=false company="MarketLinks" platformName='' bind:isSideNavOpen href="/">
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderUtilities>
    <HeaderAction>
      <HeaderPanelLinks>        
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    {#if user}
    <SideNavLink text='Profile' href='{user.id}'/>
    <SideNavMenu text='Services'>
      <SideNavMenuItem href='add_service' text='Add Service'/>
    </SideNavMenu>
    <SideNavMenu text='Products'>
      <SideNavMenuItem href='add_product' text='Add Product'/>
    </SideNavMenu>
    <SideNavLink text='Saved' href='saved/{user.id}'/>
    <SideNavLink text='Logout' on:click={logout} />
    {/if}
    {#if !user}
    <SideNavLink text='Login' href='login'/>
    {/if}
  </SideNavItems>
</SideNav>