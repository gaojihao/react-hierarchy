import React from 'react';
import {Table, Form, Input, Button} from 'antd';

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
  
const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
];

const layout = {
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 4 },
};
  

export default () => {

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
    return (
      <>
        <Form {...layout}
          layout="inline"
          name="basic"
          style={{marginBottom:'10px'}}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="类别"
            name="name"
            rules={[{ required: true, message: "请输入类别" }]}
          >
            <Input size="large"/>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button size="large" type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
        <Table dataSource={dataSource} columns={columns} />
      </>
    );
};