const jwt = require('jsonwebtoken')
const { secret } = require('../config.ts')
export default async (ctx, next)=>{
    const XToken = ctx.get('X-Token');
    if (XToken === '') {
        // ctx.throw(401, "no token detected in http header 'X-Token'");
        ctx.body={
            code:'401',
            message:'token过期'
        }
    }
    let tokenContent;
    try {
        tokenContent = await jwt.verify(XToken,secret);     //如果token过期或验证失败，将抛出错误
        await next();
    } catch (err) {
        console.log(err)
        if(err.message == 'jwt expired'){
            ctx.body={
                code:'401',
                message:'token过期'
            }
        }else{
            ctx.throw(500);
        }
    }
}