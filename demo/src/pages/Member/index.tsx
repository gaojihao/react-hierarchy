import React,{useState, useEffect} from 'react';
import {Table} from 'antd';
import { memberList } from '../../api/member';
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'nick_name',
      key: 'nick_name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
  ];
  

export default () => {

  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    getMemberList();
  },[]);

  const getMemberList = () => {
    memberList().then((res) => {
      setDataSource(res);
    },onrejected => {
      console.log(`onrejected=========${JSON.stringify(onrejected)}`);
    })
  };

    return (
        <Table dataSource={dataSource} columns={columns} />
    );
};