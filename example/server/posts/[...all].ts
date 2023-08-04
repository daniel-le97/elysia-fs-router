import { Context } from "elysia";

export default(ctx: Context) => {
    return {params: ctx.params};
}