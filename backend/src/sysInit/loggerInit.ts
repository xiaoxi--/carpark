var log4js = require('log4js')
import { RUNTIME } from '@/env'
const { logstashConfig } = RUNTIME

if (!logstashConfig.host || !logstashConfig.port) {
    console.log('ERROR not config logstash_host or logstash_port')
}

const appendersConfig = {
    appenders: {
        console: { type: 'console' },
        logstash: {
            type: 'log4js-logstash-tcp',
            host: logstashConfig.host,
            port: parseInt(logstashConfig.port),
            fields: {
                appName: 'node-log-stash',
                indexname: 'default',
            },
        },
    },
    categories: {
        default: { appenders: ['logstash'], level: 'info' },
    },
}
/**
 * 发送Log到logstash
 * @param {object} message 日志数据
 * @param {string} indexname ES索引
 * @param {string} level Log4js类型
 * @returns array
 */
const sendLogELK = function (message: object, indexname: string, level: string) {
    appendersConfig.appenders.logstash.fields.indexname = indexname
    appendersConfig.categories.default.level = level
    log4js.configure(appendersConfig)
    const logger = log4js.getLogger('default')
    logger.level = level
    if (level == 'error') {
        logger.error(message)
    } else {
        logger.info(message)
    }
}

export { sendLogELK }
