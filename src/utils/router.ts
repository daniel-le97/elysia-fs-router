// import Elysia from "elysia";
import { Module, Routes } from ".";
import { routeFixer } from "./routeFixer";
import { moduleImporter } from "./moduleImporter";
import { Config } from "..";
import Elysia from "elysia";
import fs from 'fs'

export type _Elysia = Elysia & {
    [method: string]: Function

  };
export async function router(app: _Elysia , config: Config){
    let router: Routes[] = []

    const dir = process.cwd() + config.serverDir

    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory())
    throw new Error('directory: ' + dir + ' does not exist or is not a directory')
    
    
    const {routes} = new Bun.FileSystemRouter({
        dir: process.cwd() + config.serverDir,
        style: 'nextjs',
    })

    for await(const [route, path] of Object.entries(routes)) {
        // clean the route of [param] and of .post/get/delete/put
        const sanitizedRoute = routeFixer(route, config.apiPrefix)
        // find the handlers for the routes from exporting GET/PUT/DELETE/POST
        const module: Module = await moduleImporter(path, route)
        // if this route has been declared already, we dont want to make it again
        const found = router.find( route => route.route === sanitizedRoute)
        if (found)return
        router.push({route: sanitizedRoute, path, module})
        
      }

      for await (const {route, module} of router) {
        for await (const [method, handler] of Object.entries(module)) {
            // now we can finally start adding routes and handlers to our Elysia app
            // our ELysia app can now be written with a fileSystem syntax
            //example app.get('/hello', () => return 'Hello, World!')
            // console.log(`registering ${route}`)
            app[method](route, handler)
        }
      }
      return app
}