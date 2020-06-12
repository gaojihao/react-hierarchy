import React,{useState, useEffect} from 'react';
import {Table, Upload, message} from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { InboxOutlined } from '@ant-design/icons';
import './picture.css';
import { PictureList } from '../../api/picture';

const { Dragger } = Upload;
  
const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: {id: number}, b: {id: number}) => b.id - a.id,
    },
    {
      title: 'url',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      render: (record: number) => {
        return (
        <div>{`${record/1024}kb`}</div>
        );
      }
    },
    {
      title: '宽高',
      render: (record: {height: number, width: number}) => {
        return (
        <div>{`${record.width}x${record.height}`}</div>
        );
      }
    },
    {
      title: '图片',
      render: (record: {height: number, width: number, url: string}) => {
        return (
        <img height={60} width={60*record.width/record.height} alt="" src={'http://127.0.0.1:8080/'+record.url} />
        );
      }
    },
];
  

export default () => {

  const props = {
    name: 'file',
    multiple: false,
    action: '/api/picture/upload',
    onChange(info: UploadChangeParam) {

      const { status } = info.file;
      if (status !== 'uploading') {
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        getPictureList();
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    getPictureList();
  },[]);

  const getPictureList = () => {
    PictureList().then((res: any) => {
      setDataSource(res);
    })
  };

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