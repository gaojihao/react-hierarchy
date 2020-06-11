import React from 'react';
import {Table, Upload, message} from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { InboxOutlined } from '@ant-design/icons';
import './picture.css';

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: false,
  action: '/api/picture/upload',
  onChange(info: UploadChangeParam) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};




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
  return (
    <React.Fragment>
      <div className="ant-upload-drag-dragger">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽上传</p>
        </Dragger>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </React.Fragment>
  );
};