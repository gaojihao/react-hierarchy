import React from 'react';
import {Table, Button} from 'antd';
import { ButtonDelegateModal } from '../../component/Modal/delegate.modal';
import { AddCourseFragment } from './fragment/add.fragment';
import './course.css';

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
  

export default () => {


    const getCourseList = () => {

      };

    return (
        <React.Fragment>
            <div className="add-course-button">
                <ButtonDelegateModal
                    delegate={{ record: {}, refreshPage: getCourseList }}
                    button={<Button size="middle" type='primary'>添加课程</Button>}
                    title='添加课程'
                    Fragment={AddCourseFragment}
                />
            </div>
            <Table bordered={true} dataSource={dataSource} columns={columns} />
        </React.Fragment>
    );
};