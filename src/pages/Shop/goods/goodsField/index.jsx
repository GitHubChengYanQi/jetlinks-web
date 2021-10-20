/**
 * 首页商品字段配置页
 *
 * @author siqiang
 * @Date 2021-08-19 08:53:11
 */

import React, {useState} from 'react';
import {Button, Input, message, Space, Upload} from 'antd';
import UpLoadImg from "@/components/Upload";
import TextArea from "antd/es/input/TextArea";
import {useRequest} from '@/util/Request';
import {UploadOutlined} from '@ant-design/icons';

export const GoodName = (props) =>{
  return (<Input {...props}/>);
};
export const Title = (props) =>{
  return (<TextArea rows={4} {...props}/>);
};
export const Price = (props) =>{
  return (<Input {...props}/>);
};
export const LastPrice = (props) =>{
  return (<Input {...props}/>);
};
export const Comment = (props) =>{
  return (<Input {...props}/>);
};
export const Sort = (props) =>{
  return (<Input {...props}/>);
};

export const Pin = (props) =>{
  return (<Input {...props}/>);
};
export const Ku = (props) =>{
  return (<Input {...props}/>);
};

export const Xiao = (props) =>{
  return (<Input {...props}/>);
};
export const ImgUrl = (props) =>{
  return (<UpLoadImg {...props}/>);
};
export const Attachment = (props) => {


  const {onChange, fileName,value} = props;

  console.log(value);

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
        maxCount={5}
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
              if (value){
                onChange([...value,`${oss && oss.host}/${oss && oss.key}`]);
              }else {
                onChange([`${oss && oss.host}/${oss && oss.key}`]);
              }
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
