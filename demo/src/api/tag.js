import request from '../utils/ajax';

//添加标签
export function addTag(data) {
    return request.post('/api/tags/sso',data)
}

//编辑标签
export function editTag(data) {
    return request.post('/api/tags/sso/update',data)
}

//获取标签列表
export function tagList() {
    return request.get('/api/tags')
}