import Endpoint from '@/server/ep.js'
import { Database } from '@/database.js'
import { getSHA256 } from '@/utils.js'

export default new Endpoint({
    method: 'GET',
    handler: async (ctx) => {
        const { rev } = ctx.query as { rev?: string }
        if (rev == null) return ctx.throw(400, 'Missing parameters')

        const ipHash = await getSHA256(ctx.request.ip)
        const result = await Database.get(ipHash)
        const response = {} as Record<string, unknown>

        result.forEach(x => {
            response[x.userId] = {
                config: JSON.parse(x.config),
                updatedAt: x.updatedAt.toISOString(),
            }
        })

        ctx.body = response
        return
    }
})