const sys_parameter = {
    jwtTokenSecret: 'dssnqsbqmyxqmlhxz',
    tokenExp: 86400000, //token过期时间1天
    sessionExp: 259200000,
    version: 'v0.1.0',
    MegaByte: 1048576,
    MAXDEPTH_EMPLOYEE: 9, //最大员工管理深度，对超过该深度的员工不能进行管理
    MAXDEPTH_ORGANIZATION: 9, //最大组织机构管理深度，对超过该深度的组织机构不能进行管理
    MAXDEPTH_RESIDENT: 9,
}
export default sys_parameter
