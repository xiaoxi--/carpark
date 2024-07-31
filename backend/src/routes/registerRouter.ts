import { sysParameter } from '@/config'
import _ from 'lodash'
import index from './index'
import { news_api } from './news_api/index'
import { tag_api } from './tag_api/index'
import { news_target_api, news_target_org_api, news_target_org_group_api, news_target_person_api } from './news_target_api/index'
import { upload_cos_api } from './upload_api/index'

function open_route_register(app: any, ...routers: any[]) {
    _.each(routers, router => {
        app.use(`/api/${sysParameter.version}`, router)
    })
}
function auth_route_register(app: any, ...routers: any[]) {
    _.each(routers, router => {
        app.use(`/api/${sysParameter.version}/auth`, router)
    })
}

// All the APIs need to register here in order to be accessed
function setRoutes(app: any): void {
    open_route_register(app, [index])
    let auth_routes = [upload_cos_api, news_api, tag_api, news_target_api, news_target_org_api, news_target_org_group_api, news_target_person_api]
    auth_route_register(app, auth_routes)
}

export default setRoutes
