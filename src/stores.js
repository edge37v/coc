import { writable } from 'svelte/store'

function createFields() {
    const { subscribe, set} = writable([])

    return {
        subscribe,
        set: (fields) => set(fields)
    }
}

export const indexServiceFilters = createFields()

function createQuery() {
    const { subscribe, set} = writable([])

    return {
        subscribe,
        set: (query) => set(query)
    }
}   

export const globalQuery = createQuery()

function createTo() {
    const { subscribe, set} = writable([])

    return {
        subscribe,
        set: (to) => set(to)
    }
}   

export const to = createTo()