import { Module, validMethods } from ".";

 export async function moduleImporter(path: string, route: string) : Promise<Module> {
    // dynamically import the handlers declared
    const module = await import(path);
    // create an empty option to help reformat the module's imports
    let sanitizedModule: Module = {}
    // if the import is only importing one handler
    if(module.default && typeof module.default === 'function') {
        // find the method in the route if it has one
        const handler = route.split('.')[1]?.toLowerCase()
       // check if $handler is an allowed http method 
        if ((validMethods.includes(handler))) {
            // if it is we want the sanitizedModules method to be set
            sanitizedModule[handler] = module.default
        }else {
            // if its not an allowed method, we are setting it to get
            sanitizedModule['get'] = module.default
        }
        // return the sanitizedModule and not the actual modules themselves
        return sanitizedModule
    }
    //  if there are multiple exports or multiple default exports, reformat it so they are common
    let newObject: Module = module.default ?? module

        for (const key in newObject) {
            // we need to lowercase the key/method so it is cleaned up for adding as a real method
            const sanitizedKey = key.toLowerCase()
            // check to see if the method is an allowed http method
            if (validMethods.includes(sanitizedKey)) {
                // set the module ex: module: {get: Function}
                sanitizedModule[sanitizedKey] = newObject[key]
            }
        }
    // return of cleaned up module
    return sanitizedModule
  }