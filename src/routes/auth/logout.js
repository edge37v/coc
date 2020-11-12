import * as api from 'api'
export function post(req, res) {
    api.del('tokens', req.session.user.token)
    delete req.session.user
}