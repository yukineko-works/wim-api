import Endpoint from '@/server/ep.js'
import { Database } from '@/database.js'

export default new Endpoint({
    method: 'GET',
    handler: async (ctx) => {
        const { userId, worldId } = ctx.params as { userId: string, worldId?: string }

        if (typeof ctx.query.key === 'string' && typeof ctx.query.value === 'string') {
            const value = Buffer.from(ctx.query.value, 'base64').toString('utf-8')

            try {
                JSON.parse(value)
            } catch {
                return ctx.throw(400, 'Invalid value')
            }

            await Database.upsert(userId, worldId, ctx.query.key, value)
            ctx.status = 204
            return
        } else {
            if (worldId == null) return ctx.throw(400, 'Missing parameters')
            const data = (await Database.getAll(userId, worldId)).map(x => ({
                ...x,
                value: JSON.parse(x.value)
            }))
            ctx.body = data
        }
    }
})