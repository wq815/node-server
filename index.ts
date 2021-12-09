require("./utils/query")
import Koa from "koa"
import routers from "./routers/index"

const app = new Koa()

app.use(routers.routes())

app.listen(8000,()=>{
    console.log("run")
})

