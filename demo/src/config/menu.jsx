import React from 'react';
import {
    PushpinOutlined,
  } from '@ant-design/icons';

let menuConfig = [{
    label: '分类管理',
    icon: <PushpinOutlined />,
    link: '/app/category'
}, {
    label: '标签管理',
    icon: <PushpinOutlined />,
    link: '/app/tags'
},{
    label: '课程管理',
    icon: <PushpinOutlined />,
    link: '/app/course'
},{
    label: '视频管理',
    icon: <PushpinOutlined />,
    link: '/app/video'
},{
    label: '音频管理',
    icon: <PushpinOutlined />,
    link: '/app/audio'
},{
    label: '文章管理',
    icon: <PushpinOutlined />,
    link: '/app/posts'
},{
    label: '用户管理',
    link: '/app/user',
    icon: <PushpinOutlined />,
}, {
    label: '评论管理',
    link: '/app/comment',
    icon: <PushpinOutlined />,
},{
    label: '图片资源',
    link: '/app/picture',
    icon: <PushpinOutlined />,
}, {
    label: '意见反馈',
    icon: <PushpinOutlined />,
    link: '/app/feebback',
}]

export default menuConfig