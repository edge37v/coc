<script context='module'>
    import * as api from 'api'
    export async function preload(page) {
        let id = page.params.id
        let category = await api.get(`categories?id=${id}`)
        return { category }
    }
</script>

<script>
    export let category
    import { stores, goto } from '@sapper/app'
    import ListErrors from './ListErrors.svelte'
    import { FluidForm, Button, TextInput } from 'carbon-components-svelte'

    const { session } = stores()
    const token = $session.token
    if (!token) {
        goto('/')
    }

    let id = category.id
    let name

    let errors

    let add = async function(){
        let data = { name, id }
        let res = await api.post('subcategories', data, token)
        if (res.subcategory){
            goto(`subcategory/${res.subcategory.id}`)
        }
    }
</script>

<h2>Add subcategory to `{category.name}`</h2>

<ListErrors {errors}/>

<FluidForm>
    <TextInput labelText='Name' bind:value={name}/>
</FluidForm>
<Button on:click={add}>Add</Button>