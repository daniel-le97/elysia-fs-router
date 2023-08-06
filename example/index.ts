import Elysia from "elysia";
import { Config, elysiaFsRouter } from "elysia-fs-router";
import { swagger } from '@elysiajs/swagger'
// import { Config, elysiaFsRouter } from "../src";

// starting on Elysia V0.6 you can pass any Elysia instance to another!
// const appV1 = new Elysia({prefix:'v1'})
const config: Config = {
    serverDir: '/example/server',
    apiPrefix: 'v1',
    // if you do not provide your own instance, elysiaFsRouter will make it for you
    // app: appV1
}

// const plugin = await elysiaFsRouter(config)
const app = new Elysia()
.use(swagger())
.use(await elysiaFsRouter(config))
// .use(elysiaFsRouter(config, true))
.listen(3006)

console.log(`check your routes at http://${app.server?.hostname}:${app.server?.port}/swagger`)