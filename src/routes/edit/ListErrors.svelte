<script>
    import { InlineNotification } from 'carbon-components-svelte';
    export let errors;
</script>

{#if errors}
        {#each errors as error}
            <InlineNotification
                kind='error'
                timeout={5}
                title={error}
                hideCloseButton/>
        {/each}
{/if}