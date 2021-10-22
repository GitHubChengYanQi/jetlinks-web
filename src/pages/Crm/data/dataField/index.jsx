/**
 * 资料字段配置页
 *
 * @author song
 * @Date 2021-09-11 13:35:54
 */

import React, {useEffect, useState} from 'react';
import {
  Input,
  Select as AntSelect, Space, Upload, Button, message
} from 'antd';
import {useRequest} from '@/util/Request';
import {UploadOutlined} from '@ant-design/icons';
import {dataClassificationSelect, itemIdSelect} from '../dataUrl';
import Select from '@/components/Select';
import Editor from '@/components/Editor';

export const Content = (props) => {
  return (<Editor {...props} onChange={(value)=>{
    props.onChange(value && value.replace('img','img mode=\'widthFix\''));
  }}  />);
};

export const Name = (props) => {
  return (<Input {...props} />);
};

export const Attachment = (props) => {

  const {onChange, fileName,value} = props;

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
export const ItemIds = (props) => {

  const {value} = props;

  const itemIds = [];

  // eslint-disable-next-line no-nested-ternary
  value && value.length > 0 ? typeof (value[0]) === 'object' ? value.forEach((items) => {
    itemIds.push(items && `${items.itemId}`);
  }) : value.forEach((items) => {
    itemIds.push(items);
  }) : [];

  useEffect(() => {
    if (value) {
      props.onChange(itemIds);
    }
  }, []);


  const {data} = useRequest(itemIdSelect);

  const options = data || [];


  return (
    <AntSelect
      mode="multiple"
      showArrow
      style={{width: '100%'}}
      options={options}
      value={itemIds}
      onChange={(value) => {
        props.onChange(value);
      }}
    />
  );
};

export const DataClassificationId = (props) => {
  return (<Select api={dataClassificationSelect} {...props}/>);
};
