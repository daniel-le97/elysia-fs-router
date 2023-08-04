import { Context } from "elysia";

export default(ctx: Context) => {

    return {id: ctx.params?.id, name: ctx.params?.name};
}