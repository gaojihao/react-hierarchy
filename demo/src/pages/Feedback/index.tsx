import React from 'react';
import {Table, Tag} from 'antd';

const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
];
  
const columns = [{
    title: '昵称',
    dataIndex: 'name',
    width: 1,
    align: 'center'
}, {
    title: '电话',
    dataIndex: 'phone',
    width: 1,
    align: 'center'
}, {
    title: '反馈类型',
    dataIndex: 'type',
    width: 1,
    render: (type: string | number | undefined, record: { typeDesc: React.ReactNode; }, index: any) => (
        <span>
            <Tag color="red" key={type}>
                {record.typeDesc}
            </Tag>
        </span>
    ),
    align: 'center'
}, {
    title: '内容',
    dataIndex: 'content',
    width: 1,
    align: 'center'
}, {
    title: '反馈时间',
    dataIndex: 'createTime',
    width: 1,
    align: 'center'
}, {
    title: '是否解决',
    dataIndex: 'fixed',
    width: 1,
    align: 'center'
}]
  

export default () => {
    return (
        <Table dataSource={dataSource} columns={columns} />
    );
};