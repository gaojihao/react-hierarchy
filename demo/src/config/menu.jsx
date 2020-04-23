import React from 'react';
import {
    CommentOutlined,
    AppstoreOutlined,
    BookOutlined,
    VideoCameraOutlined,
    WhatsAppOutlined,
    UserOutlined,
    TagOutlined,
    MessageOutlined,
    FileImageOutlined,
    CompassOutlined,
  } from '@ant-design/icons';

let menuConfig = [{
    label: '分类管理',
    icon: <AppstoreOutlined />,
    link: '/app/category'
}, {
    label: '标签管理',
    icon: <TagOutlined />,
    link: '/app/tags'
},{
    label: '课程管理',
    icon: <BookOutlined />,
    link: '/app/course'
},{
    label: '视频管理',
    icon: <VideoCameraOutlined />,
    link: '/app/video'
},{
    label: '音频管理',
    icon: <WhatsAppOutlined />,
    link: '/app/audio'
},{
    label: '文章管理',
    icon: <CompassOutlined />,
    link: '/app/posts'
},{
    label: '用户管理',
    link: '/app/user',
    icon: <UserOutlined />,
}, {
    label: '评论管理',
    link: '/app/comment',
    icon: <CommentOutlined />,
},{
    label: '图片资源',
    link: '/app/picture',
    icon: <FileImageOutlined />,
}, {
    label: '意见反馈',
    icon: <MessageOutlined />,
    link: '/app/feebback',
}]

export default menuConfig