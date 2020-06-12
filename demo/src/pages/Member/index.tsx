import React,{useState, useEffect} from 'react';
import {Table} from 'antd';
import { memberList } from '../../api/member';
  
  const columns = [
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },{
      title: '姓名',
      dataIndex: 'nick_name',
      key: 'nick_name',
    },{
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },{
      title: '等级',
      dataIndex: 'level',
      key: 'level',
    },{
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },{
      title: '是否是vip',
      dataIndex: 'vip',
      key: 'vip',
    },{
      title: '用户Id',
      dataIndex: 'user_id',
      key: 'user_id',
    }
  ];
  

export default () => {

  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    getMemberList();
  },[]);

  const getMemberList = () => {
    memberList().then((res: any) => {
      setDataSource(res);
    })
  };

    return (
        <Table bordered={true} dataSource={dataSource} columns={columns} />
    );
};