import React,{useState, useEffect} from 'react';
import {Table, Tag} from 'antd';
import {FeedbackList,FixFeedback} from '../../api/feedback';

  
const columns = [{
    title: '电话',
    dataIndex: 'mobile',
    width: 1,
}, {
    title: '意见反馈',
    dataIndex: 'content',
    width: 4,
}, {
    title: '反馈类型',
    dataIndex: 'type',
    width: 1,
    render: (type: number) => {
        if(type === 0){
            return (<Tag color="orange">{type}</Tag>);
        }else if(type === 2){
            return (<Tag color="geekblue">{type}</Tag>);
        }else{
            return (<Tag color="pink">{type}</Tag>);
        }
    },
}, {
    title: '反馈时间',
    dataIndex: 'create_time',
    width: 1,
}, {
    title: '是否解决',
    dataIndex: 'fixed',
    width: 1,
    render: (fixed: boolean) => (
        <span>
            <Tag color="red">
                {fixed?'已修复':'未修复'}
            </Tag>
        </span>
    ),
}]
  

export default () => {
    const [dataSource, setDataSource] = useState();

  useEffect(() => {
    getFeedbackList();
  },[]);

  const getFeedbackList = () => {
    FeedbackList().then((res) => {
      setDataSource(res);
    },onrejected => {
      console.log(`onrejected=========${JSON.stringify(onrejected)}`);
    })
  };

    return (
        <Table dataSource={dataSource} columns={columns} />
    );
};