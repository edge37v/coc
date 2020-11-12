import { writable } from 'svelte/store'

function createJson() {
    const { subscribe, update} = writable([])

    return {
        subscribe,
        add: (id) => update(n => [...n, {'id': id, 'name': '', 'value': ''}]),
        edit: (id, name, value) => update(n => {
            for(let i=0; i <= n.length; i++) {
                let field = n[i]
                if (field && field.id == id) {
                    field.name = name
                    field.value = value
                }
            }
        }),
        del: (id) => update(n => {
            for(let i=0; i <= n.length; i++) {
                let field = n[i]
                if (n[i].id == id) {
                    n.pop(field)
                }
            }
        })
    }
}   

export const j = createJson()