import { writable } from 'svelte/store'

function createJson() {
    const { subscribe, set} = writable([])

    return {
        subscribe,
        add: (json) => set(json),
    }
}   

export const j = createJson()

function createS() {
    const { subscribe, update} = writable(0)

    return {
        subscribe,
        edit: () => update(n => n + 1),
    }
}   

export const s = createS()