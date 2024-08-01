/*
 Utils functions used by API server methods
*/
// 获取n位随机数
export default {
    getRandom(n) {
        var num = ''
        for (var i = 0; i < n; i++) {
            num += Math.floor(Math.random() * 10)
        }
        return num
    },
}
