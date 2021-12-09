const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();
router.get("/", ctx => {
    ctx.body = "hhh";
});
app.use(router.routes());
app.listen(8000, () => {
    console.log("run");
});
