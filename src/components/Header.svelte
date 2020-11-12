<script>
  import {
    SkipToContent,
    Header,
    HeaderUtilities,
    HeaderGlobalAction,
    HeaderAction,
    HeaderPanelLinks,
    HeaderPanelLink
  } from "carbon-components-svelte"
  import { getContext } from "svelte"

  const ctx = getContext("Theme")
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

<Header expandedByDefault={ebp} company="MarketLinks" href="/">
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderUtilities>
    <HeaderAction>
      <HeaderPanelLinks>
        <HeaderPanelLink href='user'>
          Profile
        </HeaderPanelLink>
        <HeaderPanelLink href='/logout'>
          Logout
        </HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>