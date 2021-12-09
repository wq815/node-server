export const db = {
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    // 加上这句话，才可以执行多条语句
    multipleStatements:true,
    useConnectionPooling: true
}

export const database = 'wq_base'

export const base_API = '/api'

export const secret = 'wq_base'