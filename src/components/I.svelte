<script>
    export let item
</script>

{#if !$session.token}
    <Column lg={2} md={2} sm={2}>
        <Link style='font-size: 1.2em; color: white;' href='${item.type}/{item.id}'>{item.name}</Link>
    </Column>
{:else if $session.token}
    <Options bind:item={item}/>
    {#if !item.new}
        <Button
            kind='ghost'
            tooltipPosition='bottom'
            tooltipAlignment='center'
            iconDescription='Add Subitem'
            size='small' hasIconOnly icon={Add16} on:click={() => (goto(`add_subtopic/${item.id}`))}/>
        <Button
            kind='ghost'
            tooltipPosition='bottom'
            tooltipAlignment='center'
            iconDescription='Delete Topic'
            size='small' hasIconOnly icon={Delete16} on:click={() => {delItem = item; delModalOpen=true}}/>
    {/if}
{/if}