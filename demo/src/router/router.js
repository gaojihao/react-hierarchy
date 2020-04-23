import Audio from './../pages/Audio';
import Category from './../pages/Category';
import Member from './../pages/Member';
import Picture from './../pages/Picture';
import Posts from './../pages/Posts';
import Tag from './../pages/Tag';
import Video from './../pages/Video';


const routes = [{
	path: '/app',
	component: Audio,
	breadcrumbName: 'Dashboard',
	breadcrumbPath: '#'
}, {
	path: '/app/category',
	component: Audio,
	breadcrumbName: '分类列表',
	breadcrumbPath: '/app/category'
}, {
	path: '/app/category/add',
	component: Audio,
	breadcrumbName: '添加分类',
	breadcrumbPath: '/app/category/add'
}, {
	path: '/app/tags',
	component: Audio,
	breadcrumbName: '标签列表',
	breadcrumbPath: '/app/tags'
}, {
	path: '/app/tags/add',
	component: Audio,
	breadcrumbName: '添加标签',
	breadcrumbPath: '/app/tags/add'
}, {
	path: '/app/course',
	component: Audio,
	breadcrumbName: '课程列表',
	breadcrumbPath: '/app/course'
}, {
	path: '/app/course/add',
	component: Audio,
	breadcrumbName: '添加课程',
	breadcrumbPath: '/app/course/add'
}, {
	path: '/app/video',
	component: Audio,
	breadcrumbName: '视频列表',
	breadcrumbPath: '/app/video'
}, {
	path: '/app/video/add',
	component: Audio,
	breadcrumbName: '添加视频',
	breadcrumbPath: '/app/video/add'
}, {
	path: '/app/audio',
	component: Audio,
	breadcrumbName: '音频列表',
	breadcrumbPath: '/app/audio'
}, {
	path: '/app/audio/add',
	component: Audio,
	breadcrumbName: '添加音频',
	breadcrumbPath: '/app/audio/add'
}, {
	path: '/app/posts',
	component: Audio,
	breadcrumbName: '文章列表',
	breadcrumbPath: '/app/posts'
}, {
	path: '/app/posts/add',
	component: Audio,
	breadcrumbName: '添加文章',
	breadcrumbPath: '/app/posts/add'
}, {
	path: '/app/user',
	component: Audio,
	breadcrumbName: '用户管理',
	breadcrumbPath: '/app/user'
}, {
	path: '/app/comment',
	component: Audio,
	breadcrumbName: '评论管理',
	breadcrumbPath: '/app/comment'
}, {
	path: '/app/feedback',
	component: Audio,
	breadcrumbName: '意见列表',
	breadcrumbPath: '/app/feedback'
}, {
	path: '/app/feedback/detail',
	component: Audio,
	breadcrumbName: '意见详情',
	breadcrumbPath: '/app/feedback/detail'
},{
	path: '/app/picture',
	component: Audio,
	breadcrumbName: '图片资源',
	breadcrumbPath: '/app/picture'
}]

export default routes