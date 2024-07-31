import { Options } from 'sequelize'

export interface RuntimeInterface {
    PORT: number
    pgServer: Options
    redisServer: {
        port: number
        host: string
        pwd: string
        selectDb: number
        [propeName: string]: any
    }
    cosServer: {
        host: string
        Domain: string
        [propeName: string]: any
    }
    logstashConfig?: {
        host: string
        port: string
    }
    corsOrigins: string[]
    msDomainBase?: {
        userOrg: string
    }
}
