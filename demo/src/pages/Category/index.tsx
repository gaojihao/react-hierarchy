import React,{useState, useEffect} from 'react';
import {Table, Form, Input, Button} from 'antd';
import {addCategory, editCategory, categoryList} from '../../api/major';
  
const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '类别',
      dataIndex: 'name'
    },
    {
      title: '创建日期',
      dataIndex: 'create_time'
    },
    {
      title: '更新日志',
      dataIndex: 'update_time'
    },
];

const layout = {
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 2, span: 4 },
};
  

export default () => {

  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    getMajorList();
  },[]);

  const getMajorList = () => {
    categoryList().then((res) => {
      setDataSource(res);
    },onrejected => {
      console.log(`onrejected=========${JSON.stringify(onrejected)}`);
    })
  };


  const onFinish = (values: any) => {
    console.log('Success:', values);

    addCategory(values).then(res => {
      getMajorList();
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
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="类别"
            name="name"
            rules={[{ required: true, message: "请输入类别" }]}
          >
            <Input placeholder="请输入类别名称" size="large"/>
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