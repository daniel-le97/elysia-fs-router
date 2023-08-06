import { validMethods } from ".";

export function routeFixer(_route:string, prefix: string){
    // remove/add any / that we need to normalize the routes
    prefix = prefix.trim().replace(/^\/|\/$/g, '');

    // if we have a prefix we would like to put infront of these routes add it from the config
    let route: string = _route
    
    // if the route has a .post|.get|.delete|.put we want to clean that up
    if ((route.includes('.')) && (validMethods.includes(route.split('.')[1]?.toLowerCase()))) {
        route = route.split('.')[0]
    }
    // if the route has a [param] or [param1]-[param2] we want to turn that into /:param or /:param1/:param2
    const regex = /\[([^[]+)\]/g
    if (regex.test(route)) {
        route = route
                .replace(/\[([^[]+)\]/g, ':$1')
                .replace('-', '/')
    }
    // this lets us replace [...something] to * for wildcard routes
    if (route.includes(':...')) {
        route = route
                .replace(/:\.\.\.[^/]+$/, '*')
    }

    // finally return the route after all the sanitization
    return route
}