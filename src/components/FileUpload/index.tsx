import React from "react";
import {UploadProps} from "antd/lib/upload";
import {Button, Input, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

interface Props {
  value?: any;
  onChange?: (url: any) => void,
  fileData?: (file: { size: any, url: any }) => void,
}

const FileUpload: React.FC<Props> = (props) => {

  const {
    value,
    onChange = () => {
    },
    fileData = () => {
    }
  } = props;

  const uploadProps: UploadProps = {
    accept: '*',
    action: '/jetlinks/file/static',
    headers: {
      'X-Access-Token': '',
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        fileData({
          size: info.file.size,
          url: info.file.response.result,
        });
        onChange(info.file.response.result);
        message.success('文件上传成功');
      } else if (info.file.status === 'error') {
        message.error(info.file.response.message);
      }
    },
  };
  return <div>
    <Input.Group>
      <Input value={value} style={{width: 'calc(100% - 110px)'}} />
      <Upload {...uploadProps}>
        <Button type="primary" ghost icon={<UploadOutlined />}>
          上传文件
        </Button>
      </Upload>
    </Input.Group>
  </div>
};

export default FileUpload;
