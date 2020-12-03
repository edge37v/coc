<script context='module'>
    import * as api from 'api'
    export async function preload(page) {
        let id = page.params.id
        let topic = await api.get(`topics?id=${id}`)
        return { topic }
    }
</script>

<script>
    export let topic
    import { stores, goto } from '@sapper/app'
    import ListErrors from './ListErrors.svelte'
    import { FluidForm, Button, TextInput } from 'carbon-components-svelte'

    const { session } = stores()
    const token = $session.token
    if (!token) {
        goto('/')
    }

    let id = topic.id
    let name

    let errors

    let add = async function(){
        let data = { name, id }
        let res = await api.post('subtopics', data, token)
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