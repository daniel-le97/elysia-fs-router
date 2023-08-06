import Elysia from "elysia";
import { _Elysia, router } from "./utils";

export type Config = {
    serverDir: string,
    apiPrefix: string,
    app?: Elysia | undefined
}
export async function elysiaFsRouter(config?: Config){
    // let app = new Elysia({prefix: config?.apiPrefix})

    if (!config?.app && !config?.apiPrefix) {
        console.log('consider adding an apiPrefix if you dont want to make your own Elysia instance')
    }

    config = {
        serverDir: config?.serverDir ?? './server',
        apiPrefix: config?.apiPrefix ?? '',
        app: config?.app
    }

    let app = config.app ? config.app : config.apiPrefix? new Elysia({prefix: config.apiPrefix}) : new Elysia()
      
    async function plugin(app: Elysia){
       return await router(app as _Elysia, config!) as Elysia
    }

   app = await plugin(app)

   return app
}