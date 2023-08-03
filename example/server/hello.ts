import { Context } from "elysia";

const GET = (ctx: Context) => {
    console.log(ctx.query);
    return "Hello," + `${ctx.request.method}`;
}
const POST = (ctx: Context) => {
    console.log(ctx.query);
    return "Hello," + `${ctx.request.method}`;
}

function DELETE(ctx: Context){
    console.log(ctx.query);
    return "Hello," + `${ctx.request.method}`;
}





export default {GET,POST,DELETE}