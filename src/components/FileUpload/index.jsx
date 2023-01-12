import React from 'react';
import {Button, message, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {config} from 'ice';
import cookie from 'js-cookie';
import {isObject} from '@/util/Tools';

const {baseURI} = config;

const FileUpload = ({
  maxCount = 1,
  defaultFileList = [],
  onChange = () => {
  },
  disbaled,
}) => {

  const uploadProps = {
    maxCount,
    accept: '*',
    action: `${baseURI}/system/upload`,
    headers: {
      'Authorization': cookie.get('jetlink-token'),
    },
    onChange(info) {
      const file = info.file || {};
      const response = file.response || {};
      if (file.status === 'done') {
        if (isObject(response.data).fileId) {
          onChange(response.data.fileId);
          message.success('文件上传成功');
        } else {
          message.error(response.message || '上传失败！');
        }
      } else if (file.status === 'error') {
        message.error(response.message || '上传失败！');
      }
    },
    beforeUpload(file) {
      const type = file.name.substring(file.name.lastIndexOf('.') + 1);
      const flag = ['png', 'jpg', 'jpeg'].includes(type);
      if (!flag) {
        message.warn('请上传正确格式的文件！');
        return false;
      }
      // toLowerCase
      return true;
    }
  };
  return <Upload disabled={disbaled} defaultFileList={defaultFileList} {...uploadProps}>
    <Button disabled={disbaled} type="primary" ghost icon={<UploadOutlined/>}>
      上传文件
    </Button>
  </Upload>;
};

export default FileUpload;
