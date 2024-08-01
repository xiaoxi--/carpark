import { createClient } from 'redis'
import {RUNTIME} from '@/env'

const {redisServer} = RUNTIME
let connect_url = `redis://:${redisServer.pwd}@${redisServer.host}:${redisServer.port}/${redisServer.selectDb}`
let redisClient = createClient({
    url: connect_url,
})
;(async () => {
    try {
        console.log(connect_url)

        redisClient.on('error', function (err) {
            console.log('\x1b[31m%s\x1b[0m', err.message)
        })

        await redisClient.connect()

        redisClient.on('reconnecting', () => {
            console.log('CacheStore - Connection status: reconnecting')
        })
    } catch (err: any) {
        console.log('\x1b[31m%s\x1b[0m', err.message)
    }
})()

export { redisClient }
