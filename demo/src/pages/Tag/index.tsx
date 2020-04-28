import React from 'react';
import {Table, Form, Input, Button} from 'antd';


const dataSource = [
  {
    tagId: 1,
    name: '胡彦斌',
  },
  {
    tagId: 2,
    name: '胡彦斌',
  },
];

const columns = [
  {
    title: 'ID',
    dataIndex: 'tagId',
    key: 'tagId',
  },
  {
    title: '标签',
    dataIndex: 'name',
    key: 'name',
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
          label="名称"
          name="name"
          rules={[{ required: true, message: "请输入标签名称" }]}
        >
          <Input placeholder="请输入标签名称" size="large"/>
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