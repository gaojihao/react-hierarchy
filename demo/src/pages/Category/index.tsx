import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button } from 'antd';
import { addCategory, categoryList } from '../../api/major';
import { ButtonDelegateModal } from '../../component/Modal/delegate.modal';
import { UpdateMajorFragment } from './fragment/update.fragment';

const layout = {
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 2, span: 4 },
};


export default () => {

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '类别',
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
    {
      title: '操作',
      key: 'action',
      render: (record: {}) => {
        return (
          <ButtonDelegateModal
            delegate={{ record, refreshPage: getMajorList }}
            button={<Button type='primary'>编辑</Button>}
            title='编辑'
            Fragment={UpdateMajorFragment}
          />
        );
      }
    }
  ];

  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    getMajorList();
  }, []);

  const getMajorList = () => {
    categoryList().then((res: any) => {
      setDataSource(res);
    })
  };


  const onFinish = (values: any) => {
    console.log('Success:', values);

    addCategory(values).then(res => {
      getMajorList();
    }, error => {
      console.log(`error=========${JSON.stringify(error)}`);
    })
  };

  return (
    <>
      <Form {...layout}
        layout="inline"
        name="basic"
        style={{ marginBottom: '10px' }}
        onFinish={onFinish}
      >
        <Form.Item
          label="类别"
          name="name"
          rules={[{ required: true, message: "请输入类别" }]}
        >
          <Input placeholder="请输入类别名称" size="large" />
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