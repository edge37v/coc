<script>
    import { UnorderedList, ListItem } from 'carbon-components-svelte';
    export let errors;
</script>

{#if errors}
    <UnorderedList class='errors'>
        {#each errors as error}
            <ListItem style="color: red">{error}</ListItem>
        {/each}
    </UnorderedList>
{/if}