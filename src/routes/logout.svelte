<script>
    import { post } from 'utils'
    import { onMount } from 'svelte'
    import { goto } from '@sapper/app'
     
    onMount(() => {
        post('auth/logout')
        goto('login')
    })
</script>