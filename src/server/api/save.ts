import CryptoJS from 'crypto-js'
import Endpoint from '@/server/ep.js'
import { Database } from '@/database.js'
import { validate } from '@/validator.js'
import { getSHA256 } from '@/utils.js'

export default new Endpoint({
    method: 'GET',
    handler: async (ctx) => {
        const { uid, rev, cfg } = ctx.query as { uid?: string, rev?: string, cfg?: string }
        if (uid == null || rev == null || cfg == null) return ctx.throw(400, 'Missing parameters')

        const value = Buffer.from(cfg.replaceAll('-', '+').replaceAll('_', '/'), 'base64').toString('utf-8')
        let json: unknown

        try {
            json = JSON.parse(value)
        } catch {
            return ctx.throw(400, 'Invalid value')
        }

        const result = await validate(rev, json)
        if (!result.success) return ctx.throw(400, result.message)

        const uidHash = CryptoJS.MD5(`key_${uid}`).toString()
        const ipHash = await getSHA256(ctx.request.ip)

        const data = {}
        const savedData = await Database.getOne(uidHash, ipHash)

        if (savedData != null) {
            Object.assign(data, JSON.parse(savedData.config))
        }

        Object.assign(data, json)

        await Database.upsert(uidHash, ipHash, JSON.stringify(data), rev)

        ctx.status = 204
        return
    }
})