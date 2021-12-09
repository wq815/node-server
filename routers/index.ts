const Router = require("koa-router")
import {base_API} from '../config'
const router = new Router();
import checkToken from '../utils/checkToken'

// 前端发来的请求都是 http://loaclhost:3000/api/...
router.prefix(`${base_API}`)

router.get('/',async ctx=>{
    ctx.body = '欢迎使用vue-blog接口服务器'
})

export default router