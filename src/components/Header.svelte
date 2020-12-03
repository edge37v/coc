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

  let phm

  if ($session.token) {
    phm = true
  } else {
    phm = false
  }

  let logout = async function() {
    await post(`auth/logout`)
    delete $session.token
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
  persistentHamburgerMenu={phm}
  company="MarketLinks"
  platFluidFormName=''
  bind:isSideNavOpen
  href='/'
>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
</Header>

{#if $session.token}
<SideNav bind:isOpen={isSideNavOpen}>
  <div slot='default'>
    <SideNavItems>
        <SideNavLink text='Logout' href='' on:click={logout}/>
        <SideNavLink text='Add Topic' href='add_topic'/>
    </SideNavItems>
  </div>
</SideNav>
{/if}