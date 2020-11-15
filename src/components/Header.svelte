<script>
  import { stores } from '@sapper/app'
  import {
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
  let isOpen = false
  let ebp = false

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

<Header expandedByDefault={ebp} company="MarketLinks" platFormName='' href="/">
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderUtilities>
    <HeaderAction>
      <HeaderPanelLinks>
        {#if user}
        <HeaderPanelLink href='user/{user.id}'>
          Profile
        </HeaderPanelLink>
        <HeaderPanelLink href='/auth/logout'>
          Logout
        </HeaderPanelLink>
        {/if}
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>