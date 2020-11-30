import * as api from 'api.js'

export function post(req, res) {
    const { password } = req.body
    api.post('tokens', { password }).then(response => {
        if (response.token) req.session.token = response.token;
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(response))
    })
}
