import { writable } from 'svelte/store'

function createQ() {
    const { subscribe, set} = writable([])

    return {
        subscribe,
        set: (q) => set(q),
    }
}   

export const j = createQ()