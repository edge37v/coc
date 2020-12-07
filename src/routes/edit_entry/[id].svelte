<script context='module'>
    import * as api from 'api'
    export async function preload(page,  { token }) {
        if (!token) {
            this.redirect(302, '/')
        }
        let id = page.params.id
        let entry = await api.get(`entries?id=${id}`)
        return { entry, token }
    }
</script>

<script>
    export let entry, token
    import { stores, goto } from '@sapper/app'
    import ListErrors from './ListErrors.svelte'
    import { FluidForm, Button, TextArea, TextInput } from 'carbon-components-svelte'

    let id = entry.id
    let verses = entry.verses
    let name = entry.name
    let body = entry.body

    let errors

    let edit = async function(){
        let data = { name, body, verses, id }
        let res = await api.put('entries', data, token)
        errors = res.errors
        if (res.yes){
            goto(`entry/${entry.id}`)
        }
    }
</script>

<h2>Edit entry {entry.id}: {entry.name}</h2>

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

<Button on:click={edit}>Edit</Button>