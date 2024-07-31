const child_process = require('child_process')
import { RUNTIME } from '../env'
const { pgServer } = RUNTIME

const { exec } = child_process
const modelName = process.argv[2]
const database: any = {
    // [required] * 数据库地址
    host: pgServer['host'],
    // [required] * 数据库名称
    database: pgServer['database'],
    // 数据库用户名
    user: pgServer['username'],
    // 数据库密码
    pass: pgServer['password'],
    // 数据库端口号
    port: pgServer['port'],
    // Sequelize的构造函数“options”标记对象的JSON文件路径
    config: '',
    // 输出文件路径
    output: './src/models/tables',
    // 数据库类型：postgres, mysql, sqlite
    dialect: 'postgres',
    // 包含在model的配置参数中define的模型定义的JSON文件路径
    additional: '',
    // 表名,多个表名逗号分隔
    tables: modelName || '',
    // 要跳过的表名，多个表名逗号分隔
    'skip-tables': '',
    // 使用驼峰命名模型和字段
    camel: true,
    // 是否写入文件
    'no-write': false,
    // 从中检索表的数据库架构
    schema: false,
    // 将模型输出为typescript文件
    typescript: false,
    // 视图
    views: true,
    lang: 'ts',
}

let connectShell = 'sequelize-auto'

for (const i in database) {
    const value = database[i]
    if (value) {
        if (value === true) {
            connectShell += ` --${i}`
        } else {
            connectShell += ` --${i} ${value}`
        }
    }
}
exec(connectShell, (err: any, stdout: any, stderr: any) => {
    console.log(`stderr: ${stderr}`)
    console.log(`stdout: ${stdout}`)
    if (err) {
        console.log(`exec error: ${err}`)
    }
})
