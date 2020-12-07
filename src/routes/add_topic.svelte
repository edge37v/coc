<script context="module">
    export async function preload({ query }, { token }) {
        if (!token) {
            this.redirect(302, '/');
        }
        return { token }
    }
</script>

<script>
	export let token
	import * as api from 'api'
	import { goto } from '@sapper/app'
	import ListErrors from '../components/ListErrors.svelte'
	import { Button, FluidForm, TextInput } from 'carbon-components-svelte'

	let name

	let errors

	let add = async function() {
		let data = {
			name
		}
		let res = await api.post('topics', data, token)
		errors = res.errors
		if (res.id) {
			goto(`topic/${res.id}`)
		}
	}
</script>

<ListErrors {errors}/>

<FluidForm>
	<TextInput labelText='Name' bind:value={name}/>
	<Button on:click={add}>Add</Button>
</FluidForm>
