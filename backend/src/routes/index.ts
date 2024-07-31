import express from 'express'
const router: express.Router = express.Router()
import { Response } from 'express'
import { redisClient } from '@/sysInit'
import { toolKit } from '@/sysInit'
import { RUNTIME } from '@/env'
import { sessionInterface } from '@/interfaces'
import { isPermissionSetUp } from '@/utils/validators'
const { failBody } = toolKit.utils.backend
const { redisServer } = RUNTIME

router.use('/auth', async function (req: any, res: Response, next) {
    let sessionid = req.cookies['sessionid'] ? req.cookies['sessionid'] : ''
    // const sessionid = req.headers['sessionid'] ? req.headers['sessionid'] : '';
    const sessionArr = sessionid.split('::')
    const userId = sessionArr[0]
    const sessionId = sessionArr[1]
    let userInfo = await redisClient.get(`${redisServer.redis_cms_login_session}:${userId}`)
    toolKit.validator.auth.isValidSessionId(userInfo, sessionId)
    const parsedUserInfo: sessionInterface = JSON.parse(userInfo)
    parsedUserInfo.permission
    // await isPermissionSetUp(parsedUserInfo)
    req.payload = parsedUserInfo
    // await authorization.isApiAccessible(userInfoObj.permission.role_id, req.method, req.path);
    next()
})

export default router
