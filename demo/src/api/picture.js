import request from '../utils/ajax';

//获取图片列表
export function PictureList() {
    return request.get('/api/picture')
}