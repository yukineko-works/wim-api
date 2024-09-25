import Endpoint from '@/server/ep.js'

export default new Endpoint({
    method: 'GET',
    handler: async (ctx) => {
        ctx.redirect('https://github.com/yukineko-works/wim-api')
        return
    }
})