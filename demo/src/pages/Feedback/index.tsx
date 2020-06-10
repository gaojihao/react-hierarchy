import React from 'react';
import {Table, Tag} from 'antd';

const dataSource = [
    {
        name:'name',
        phone:'phone',
        type:1,
        content:'center',
        createTime:'2020-03-08',
        fixed:1,
    },{
        name:'name',
        phone:'phone',
        type:1,
        content:'center',
        createTime:'2020-03-08',
        fixed:1,
    },{
        name:'name',
        phone:'phone',
        type:1,
        content:'center',
        createTime:'2020-03-08',
        fixed:1,
    }
];
  
const columns = [{
    title: '昵称',
    dataIndex: 'name',
    width: 1,
}, {
    title: '电话',
    dataIndex: 'phone',
    width: 1,
}, {
    title: '反馈类型',
    dataIndex: 'type',
    width: 1,
    render: (type: number | undefined, index: any) => (
        <span>
            <Tag color="red" key={type}>
                {type}
            </Tag>
        </span>
    ),
}, {
    title: '内容',
    dataIndex: 'content',
    width: 1,
}, {
    title: '反馈时间',
    dataIndex: 'createTime',
    width: 1,
}, {
    title: '是否解决',
    dataIndex: 'fixed',
    width: 1,
}]
  

export default () => {
    return (
        <Table dataSource={dataSource} columns={columns} />
    );
};