<script context='module'>
    import * as api from 'api'
    export async function preload(page, { token }) {
        if (!token){
            this.redirect(302, '/')
        }
        let id = page.params.id
        let topic = await api.get(`topics?id=${id}`)
        return { topic, token }
    }
</script>

<script>
    export let topic, token
    import { stores, goto } from '@sapper/app'
    import ListErrors from './ListErrors.svelte'
    import { FluidForm, Button, TextInput } from 'carbon-components-svelte'

    console.log(token)

    let id = topic.id
    let name

    let errors

    let add = async function(){
        let data = { id, name }
        let res = await api.post('subtopics', data, token)
        errors = res.errors
        if (res.subtopic){
            goto(`subtopic/${res.subtopic.id}`)
        }
    }
</script>

<h2>Add subtopic to `{topic.name}`</h2>

<ListErrors {errors}/>

<FluidForm>
    <TextInput labelText='Name' bind:value={name}/>
</FluidForm>
<Button on:click={add}>Add</Button>