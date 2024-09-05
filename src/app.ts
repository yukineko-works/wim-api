import 'dotenv'
import Koa from 'koa'
import KoaLogger from 'koa-logger'
import Router from '@koa/router'
import Endpoints from '@/server/endpoints.js'

const app = new Koa()
const router = new Router()

app.use(KoaLogger())

Endpoints.forEach(x => {
    switch (x.ep.method) {
        case 'GET':
            router.get(x.route, x.ep.handler)
            break
        case 'POST':
            router.post(x.route, x.ep.handler)
            break
    }
})

app.use(router.routes())
app.use(router.allowedMethods())

const port = process.env.PORT || 3000
app.listen(port)
console.log(`Server is running on port ${port}`)
