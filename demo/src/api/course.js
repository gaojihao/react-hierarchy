import request from '../utils/ajax';

//获取获取课程列表
export function getCourseList() {
    return request.get('/api/course')
}

//添加课程
export function addCourse(data) {
    return request.post('/api/course',data)
}

//编辑分类
export function editCourse(data) {
    return request.post('/api/course/update',data)
}

//发布课程
export function publishCourse(data) {
    return request.post('/api/course/publish',data)
}
