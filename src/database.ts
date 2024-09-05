import { PrismaClient } from '@prisma/client'

export class Database {
    private static _prisma = new PrismaClient()

    static get prisma() {
        return this._prisma
    }

    static async upsert(userId: string, worldId = '$GLOBAL', key: string, value: string) {
        return await this._prisma.settings.upsert({
            where: {
                unique_identifiers: {
                    userId,
                    worldId,
                    key,
                }
            },
            create: {
                userId,
                worldId,
                key,
                value,
            },
            update: {
                value,
            }
        })
    }

    static async getAll(userId: string, worldId: string) {
        return await this._prisma.settings.findMany({
            where: {
                userId,
                worldId: {
                    in: [worldId, '$GLOBAL']
                },
            },
            select: {
                key: true,
                value: true,
            },
        })
    }
}