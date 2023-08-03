import Elysia from "elysia";
import { Config, elysiaFsRouter } from "elysia-fs-router";
const config: Config = {
    serverDir: '/example/server',
    apiPrefix: 'api'
}
const app = new Elysia()
.use(elysiaFsRouter(config))
.listen(3006)