import request from '../utils/ajax';


//获取意见反馈列表
export function FeedbackList() {
    return request.get('/api/feedBack')
}

//获取意见反馈列表
export function FixFeedback(id) {
    return request.post('/api/feedBack/sso/fix',{id})
}