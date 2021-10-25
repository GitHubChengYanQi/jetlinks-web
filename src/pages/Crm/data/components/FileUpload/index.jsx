import React, {useState} from 'react';
import {useRequest} from '@/util/Request';
import {Button, message, Space, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';


const FileUpload = ({value,onChange,fileName}) => {


  const [fileList,setFileList] = useState(value ? [{
    url: value,
  }] : null);


  const [oss, setOss] = useState({});

  const {run} = useRequest({
    url: '/media/getToken',
    method: 'GET'
  }, {
    manual: true,
    onSuccess:(res)=>{
      if (res.errCode === 0) {
        oss.key = res.data.key;
        oss.host = res.data.host;
        oss.policy = res.data.policy;
        oss.Signature = res.data.Signature;
        oss.mediaId = res.data.mediaId;
        oss.OSSAccessKeyId = res.data.OSSAccessKeyId;
        setOss({...oss});
      }
    }
  });


  return (
    <Space direction="vertical" style={{width: '100%'}} size="large">
      <Upload
        action={oss && oss.host}
        data={oss}
        fileList={fileList}
        maxCount={1}
        listType="picture"
        onChange={(file) => {
          switch (file.file.status) {
            case 'removed':
              message.warning("已删除！");
              setFileList([]);
              typeof fileName === 'function' && fileName('');
              onChange(null);
              break;
            case 'uploading':
              // message.success("上传中！");
              break;
            case 'done':
              message.success("上传成功！");
              setFileList([{url:`${oss && oss.host}/${oss && oss.key}`,name:file.file.name}]);
              typeof fileName === 'function' && fileName(file.file.name);
              onChange(`${oss && oss.host}/${oss && oss.key}`);
              break;
            case 'error':
              message.error("上传失败！");
              setFileList([]);
              typeof fileName === 'function' && fileName('');
              onChange(null);
              break;
            default:
              break;
          }
          setFileList(file.fileList);
        }}
        beforeUpload={async (file) => {
          const type = file.type.split('/')[1];
          if (type) {
            const data = await run(
              {
                params: {
                  type
                }
              }
            );
            setOss({...data});
          } else {
            alert('附件类型不正确！');
          }
        }}
      >
        <div>
          <Button icon={<UploadOutlined />}>上传附件</Button>
        </div>
      </Upload>
    </Space>
  );
};

export default FileUpload;
