import * as api from 'api'
export async function post(req) {
    await api.del(`tokens?id=${req.session.user.id}`, req.session.user.token)
    delete req.session.user
}