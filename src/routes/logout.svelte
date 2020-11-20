<script>
    import { post } from 'utils'
    import { stores, goto } from '@sapper/app'
    const { session } = stores()
    $session.user = null
    post('auth/logout')
    goto('/')
</script>