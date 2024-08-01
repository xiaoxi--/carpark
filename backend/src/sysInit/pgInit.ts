import { Sequelize } from 'sequelize'
import { initModels } from '@/models/tables/init-models'
import { RUNTIME } from '@/env'
const { pgServer } = RUNTIME
require('pg').defaults.parseInt8 = true
let sequelize = new Sequelize(pgServer)
sequelize
    .authenticate()
    .then(() => {
        let connectMsg = '成功连接数据库 ' + pgServer.host + ':' + pgServer.port + '/' + pgServer.database
        initModels(sequelize)
        console.log('\x1b[32m%s\x1b[0m', connectMsg)
    })
    .catch(err => {
        let connectError = '连接数据库 ' + pgServer.host + ':' + pgServer.port + '/' + pgServer.database + ' 出错:' + err.message
        console.log('\x1b[31m%s\x1b[0m', connectError)
        // sequlize = 0
    })

export { sequelize }
