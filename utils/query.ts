// 连接 mysql 数据库
const mysql = require("mysql")
const { db, database } = require('../config.ts')
const fs = require("fs")
const path = require("path")
const sqlContent = fs.readFileSync(path.resolve(__dirname, '..', './sql/wq_blog.sql'), 'utf-8');
// 这一次连接是为了 创建数据库 并执行 sql 文件建表
const init = mysql.createConnection(Object.assign(db,database))
init.connect();
let pool;
init.query("SHOW DATABASES LIKE 'wq_base'", (err, data) => {
    Object.assign(db, { database })
    pool = mysql.createPool(db)
    if (data.length != []) {
        console.log('已经创建数据库')
    } else {
        console.log('数据库第一次创建')
        // 如果数据库存在则不需要执行以下的代码
        init.query('CREATE DATABASE wq_base', err => {
            if (err) {
                console.log('create database wq_blog err')
            } else {
                console.log('create database wq_blog success')
                query(sqlContent,"").then(res => {
                    console.log('import sql is success')
                }).catch(err => { 
                    console.log(err)
                })
            }
        })
        init.end();
    }
    // console.log(data);
    // console.log(err)
})
export default function query (sql, value = "") {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, collection) => {
            if (err) {
                reject(err)
            } else {
                collection.query(sql, value, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data)
                    }
                    collection.release();
                })
            }
        })
    })
}