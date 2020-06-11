import React,{useState, useEffect} from 'react';
import {Table, Form, Input, Button} from 'antd';
import {addTag, editTag, tagList} from '../../api/tag';


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
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标签',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建日期',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '更新日志',
    dataIndex: 'update_time',
    key: 'update_time',
  },
];

const layout = {
wrapperCol: { span: 16 },
};

const tailLayout = {
wrapperCol: { offset: 4, span: 4 },
};


export default () => {

  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    getTagsList();
  },[]);

  const getTagsList = () => {
    tagList().then((res) => {
      setDataSource(res);
    },onrejected => {
      console.log(`onrejected=========${JSON.stringify(onrejected)}`);
    })
  };

const onFinish = (values: any) => {
  console.log('Success:', values);

  addTag(values).then(res => {
    getTagsList();
  },error => {
    console.log(`error=========${JSON.stringify(error)}`);
  })

};

  return (
    <>
      <Form {...layout}
        layout="inline"
        name="basic"
        style={{marginBottom:'10px'}}
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
      <Table bordered={true} dataSource={dataSource} columns={columns} />
    </>
  );
};