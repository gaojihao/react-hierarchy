import Audio from './../pages/Audio';
import Category from './../pages/Category';
import Member from './../pages/Member';
import Picture from './../pages/Picture';
import Posts from './../pages/Posts';
import Tag from './../pages/Tag';
import Video from './../pages/Video';
import Feedback from './../pages/Feedback';
import Comment from './../pages/Comment';
import Auth from './../pages/Auth';


const routes = [{
	path: '/app',
	component: Audio,
	breadcrumbName: 'Dashboard',
	breadcrumbPath: '#'
}, {
	path: '/app/category',
	component: Category,
	breadcrumbName: '分类列表',
	breadcrumbPath: '/app/category'
}, {
	path: '/app/tags',
	component: Tag,
	breadcrumbName: '标签列表',
	breadcrumbPath: '/app/tags'
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
	component: Video,
	breadcrumbName: '视频列表',
	breadcrumbPath: '/app/video'
}, {
	path: '/app/video/add',
	component: Video,
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
	component: Posts,
	breadcrumbName: '文章列表',
	breadcrumbPath: '/app/posts'
}, {
	path: '/app/posts/add',
	component: Posts,
	breadcrumbName: '添加文章',
	breadcrumbPath: '/app/posts/add'
}, {
	path: '/app/user',
	component: Member,
	breadcrumbName: '用户管理',
	breadcrumbPath: '/app/user'
}, {
	path: '/app/comment',
	component: Comment,
	breadcrumbName: '评论管理',
	breadcrumbPath: '/app/comment'
}, {
	path: '/app/feedback',
	component: Feedback,
	breadcrumbName: '意见列表',
	breadcrumbPath: '/app/feedback'
}, {
	path: '/app/picture',
	component: Picture,
	breadcrumbName: '图片资源',
	breadcrumbPath: '/app/picture'
}, {
	path: '/app/common',
	component: Auth,
	breadcrumbName: '验证码',
	breadcrumbPath: '/app/common'
}]

export default routes