import Elysia from "elysia";
import { _Elysia, router } from "./utils";

export type Config = {
    serverDir: string,
    apiPrefix: string
}
export function elysiaFsRouter(config?: Config){
    
    return async function plugin(app: Elysia){
        config = {
            serverDir: config?.serverDir ?? './server',
            apiPrefix: config?.apiPrefix ?? '',
          }
        await router(app as _Elysia, config)
        return app
    }
}