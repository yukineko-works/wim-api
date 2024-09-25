import { PrismaClient } from '@prisma/client'

export class Database {
    private static _prisma = new PrismaClient()

    static get prisma() {
        return this._prisma
    }

    static async upsert(userId: string, ipHash: string, config: string, revision: string) {
        return await this._prisma.settings.upsert({
            where: {
                unique_identifiers: {
                    userId,
                    ipHash,
                }
            },
            create: {
                userId,
                ipHash,
                config,
                revision,
            },
            update: {
                config,
            }
        })
    }

    static async get(ipHash: string) {
        return await this._prisma.settings.findMany({
            where: {
                ipHash,
            },
            select: {
                userId: true,
                config: true,
                updatedAt: true,
            },
        })
    }
}