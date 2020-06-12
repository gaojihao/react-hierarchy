import React,{useState, useEffect} from 'react';
import {Table, Tag, Button} from 'antd';
import {FeedbackList,FixFeedback} from '../../api/feedback';
  

export default () => {

    const [dataSource, setDataSource] = useState();

    const toFix = (id: number) => {
        FixFeedback(id).then(() => getFeedbackList())
    };

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
            if (type === 0) {
                return (<Tag color="orange">改进意见</Tag>);
            } else if (type === 2) {
                return (<Tag color="geekblue">问题投诉</Tag>);
            } else if (type === 3) {
                return (<Tag color="pink">功能异常</Tag>);
            }else{
                return (<Tag color="magenta">其他</Tag>);
            }
        },
    }, {
        title: '反馈时间',
        dataIndex: 'create_time',
        width: 1,
    }, {
        title: '是否解决',
        width: 1,
        render: (record: {fixed: boolean, id: number}) => (
            record.fixed ? (<Tag color="green">已修复</Tag>) : <Button 
            onClick={() => toFix(record.id)} 
            size='middle' 
            type="primary" 
            >修复</Button>
        ),
    }]

    useEffect(() => {
        getFeedbackList();
    }, []);

    const getFeedbackList = () => {
        FeedbackList().then((res: any) => {
            setDataSource(res);
        })
    };

    return (<Table bordered={true} dataSource={dataSource} columns={columns} />);
};