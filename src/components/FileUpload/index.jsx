import React from 'react';
import {Button, message, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {config} from 'ice';
import cookie from 'js-cookie';

const {baseURI} = config;

const FileUpload = ({
  maxCount = 1,
  defaultFileList = [],
  onChange = () => {
  },
}) => {

  const uploadProps = {
    maxCount,
    accept: '*',
    action: `${baseURI}system/upload`,
    headers: {
      'Authorization': cookie.get('jetlink-token'),
    },
    onChange(info) {
      if (info.file.status === 'done') {
        onChange(info.file.response.data.fileId);
        message.success('文件上传成功');
      } else if (info.file.status === 'error') {
        message.error(info.file.response.message);
      }
    },
  };
  return <Upload defaultFileList={defaultFileList} {...uploadProps}>
    <Button type="primary" ghost icon={<UploadOutlined/>}>
      上传文件
    </Button>
  </Upload>;
};

export default FileUpload;
