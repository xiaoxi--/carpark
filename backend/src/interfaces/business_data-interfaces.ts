export interface permissionInterface {
    role_id: number
    role: string
    level: number
    org_id: number
    title: string
    parent_id: number
    ancient: number[]
}
export interface sessionInterface {
    sessionID: string
    username: string
    user_id: number
    name: string
    permission: permissionInterface
}
export interface newsInterface {
    news_id?: number
    cover: string
    title: string
    description: string
    content: string
    news_tag_id_list: number[]
}
export interface newsTargetInterface {
    news_id: number // 资讯ID
    news_target_org_list?: targetInterface[] // 问卷目标
    user_id_list?: Array<number> // 指定用户
}
export interface targetInterface {
    org_id: any
    role_id_list: Array<number> // 指定接收问卷的角色
}
export interface targetInterface {
    news_id?: number // 资讯ID
    org_id_list: Array<number> // 资讯目标组织id(与用户管理微服务中组织机构表保持一致)
    role_id_list: Array<number> // 指定接收资讯的角色
    user_id_list: Array<number> // 指定接收资讯的用户id
    query: string // 特征查询条件
    renderable_data: string // 前端可渲染数据
}
export interface availableInterface {
    available: string
}

export interface tagInterface {
    tag: string
    comment: string
}
