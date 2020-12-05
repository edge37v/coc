<script>
  export let segment
  import {
    Content,
    Grid
  } from "carbon-components-svelte";
  import Header from "../components/Header.svelte";
  import Theme from "../components/Theme.svelte";
  import ListErrors from "../components/ListErrors.svelte"
  import Options from "../components/Options.svelte"
  import Edit from "../components/Edit.svelte"
  import Item from "../components/Item.svelte"
</script>

<Theme persist theme="g100">
  <Header segment={segment}/>
  <Content style="background: none; padding: 1rem">
    <Grid>
      <slot />
    </Grid>
  </Content>
</Theme>
