import Router from '@koa/router'

export default class Endpoint {
    constructor({
        method,
        handler,
    }: {
        method: 'GET' | 'POST',
        handler: (ctx: Router.RouterContext) => void
    }) {
        this.method = method
        this.handler = handler
    }

    method: 'GET' | 'POST'
    handler: (ctx: Router.RouterContext) => void
}