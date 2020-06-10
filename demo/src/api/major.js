import request from '../utils/ajax';

//添加分类
export function addCategory(data) {
    return request.post('/api/major/sso',data)
}

//编辑分类
export function editCategory(data) {
    return request.post('/api/major/sso/update',data)
}

//获取分类列表
export function categoryList() {
    return request.get('/api/major')
}