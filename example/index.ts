import Elysia from "elysia";
import { Config, elysiaFsRouter } from "elysia-fs-router";
import { swagger } from '@elysiajs/swagger'
const config: Config = {
    serverDir: '/example/server',
    apiPrefix: 'api'
}
const app = new Elysia()
.use(swagger())
.use(elysiaFsRouter(config))
.listen(3006)

console.log(`check your routes at  http://${app.server?.hostname}:${app.server?.port}/swagger`)