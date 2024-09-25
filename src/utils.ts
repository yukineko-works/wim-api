export async function getSHA256(data: string) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(data)).then(x => Buffer.from(x).toString('hex'))
}