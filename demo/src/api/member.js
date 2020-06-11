import request from '../utils/ajax';

//登录
export function memberLogin(data) {
    return request.post('/api/member/login',data)
}

//用户列表
export function memberList() {
    return request.get('/api/member/sso/list')
}