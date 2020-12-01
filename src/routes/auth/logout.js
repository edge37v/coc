import * as api from 'api'
export function post(req, res) {
    api.del('tokens', req.session.token)
    delete req.session.token
    res.end(JSON.stringify({ ok: true }))
}