<script>
    import { InlineNotification } from 'carbon-components-svelte';
    export let errors;
</script>

{#if errors}
        {#each errors as error}
            <InlineNotification
                kind='error'
                timeout={13000}
                title={error}/>
        {/each}
{/if}