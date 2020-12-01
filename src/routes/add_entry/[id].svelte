<script context='module'>
    import * as api from 'api'
    export async function preload(page) {
        let id = page.params.id
        let subcategory = await api.get(`subcategories?id=${id}`)
        return { subcategory }
    }
</script>

<script>
    export let subcategory
    import { stores, goto } from '@sapper/app'
    import ListErrors from './ListErrors.svelte'
    import { FluidForm, Button, TextArea, TextInput } from 'carbon-components-svelte'

    const { session } = stores()
    const token = $session.token
    if (!token) {
        goto('/')
    }

    let id = subcategory.id
    let verses = {}
    let name
    let body

    verses.book = null
    verses.chapter = null
    verses.start = null
    verses.end = null

    let errors

    let add = async function(){
        let data = { name, body, verses, id }
        let res = await api.post('entries', data, token)
        if (res.id){
            goto(`entry/${res.id}`)
        }
    }
</script>

<h2>Add entry to `{subcategory.name}`</h2>

<ListErrors {errors}/>

<FluidForm>
    <TextInput labelText='Book' bind:value={verses.book}/>
    <TextInput labelText='Chapter' bind:value={verses.chapter}/>
    <TextInput labelText='Verse start' bind:value={verses.start}/>
    <TextInput labelText='Verse end' bind:value={verses.end}/>
    <TextInput labelText='Name' bind:value={name}/>
</FluidForm>

<br/>
<TextArea labelText='Body' bind:value={body}/>

<Button on:click={add}>Add</Button>