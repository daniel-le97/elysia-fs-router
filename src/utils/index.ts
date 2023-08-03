export * from './router'
export * from './routeFixer'
export * from './moduleImporter'
// export type Module = {
//     get?: Function,
//     post?: Function,
//     put?: Function,
//     delete?: Function,
// }

export type Module = { 
    [method: string]: Function
}
export const validMethods = ['delete', 'get', 'head', 'patch', 'post', 'put', 'options']
export type Routes = {
    route: string,
    path: string,
    module: Module
}