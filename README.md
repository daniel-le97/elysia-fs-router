# elysia-fs-router

## Getting Started

Run `bun install elysia-fs-router`.

## Usage
minimal
```js
import Elysia from "elysia";
import { Config, elysiaFsRouter } from "elysia-fs-router";
const config: Config = {
    serverDir: '/example/server',
    apiPrefix: 'api'
}
const app = new Elysia()
.use(elysiaFsRouter(config))
.listen(3006)
```
```js
// example/server/hello.ts
import { Context } from "elysia";

const GET = (ctx: Context) => {
    return "Hello," + `${ctx.request.method}`;
}

export default {GET}
```
```ts
//example/server/hi.ts
//  delete request to http://localhost:3030/api/hi
export function DELETE(ctx: Context){
    console.log(ctx.query);
    return "hi," + `${ctx.request.method}`;
}
```
```ts
//example/server/posts/[id]-[name].ts
//this will be registered as
/// http://localhost:3030/api/posts/{id}/{name}
import { Context } from "elysia";

export default(ctx: Context) => {

    return {id: ctx.params?.id, name: ctx.params?.name};
}

```
```ts
// example/server/posts/[...all].ts
// http://localhost:3030/api/posts/*
import { Context } from "elysia";

export default(ctx: Context) => {
    return {params: ctx.params};
}
```


## License

MIT
