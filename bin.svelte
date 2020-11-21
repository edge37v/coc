<span slot='cell' let:row let:cell>
    {#if cell.key === 'archive'}
        <Button kind='ghost' hasIconOnly on:click={archive(row.id)} icon={Archive16}/>
    {:else}{cell.value}{/if}
</span>
<span slot='cell' let:row let:cell>
    {#if cell.key === 'delete'}
        <Button kind='ghost' hasIconOnly on:click={del(row.id)} icon={Delete16}/>
    {:else}{cell.value}{/if}
</span>

function handleKeydown(event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        if (search.hasFocus()) {
            s_search()
        }
    }
}