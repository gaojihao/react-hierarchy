import React,{useState, useEffect} from 'react';
import {Table} from 'antd';
import { authCodeList} from '../../api/common';


const columns = [
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '验证码',
      dataIndex: 'code',
      key: 'code',
    },
    {
        title: '是否使用',
        dataIndex: 'used',
    },
  ];

export default () => {
    
    const [dataSource, setDataSource] = useState();

  useEffect(() => {
    getAuthList();
  },[]);

  const getAuthList = () => {
    authCodeList().then((res) => {
      setDataSource(res);
    },onrejected => {
      console.log(`onrejected=========${JSON.stringify(onrejected)}`);
    })
  };

  return <Table bordered={true} dataSource={dataSource} columns={columns} />;
}