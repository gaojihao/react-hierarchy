import request from '../utils/ajax';

//获取验证码列表
export function authCodeList() {
    return request.get('/api/common/code/list')
}