/**
 * 资料字段配置页
 *
 * @author song
 * @Date 2021-09-11 13:35:54
 */

import React, {useEffect, useState} from 'react';
import {
  Input,
  Select as AntSelect, Space, Upload, Button
} from 'antd';
import {useRequest} from '@/util/Request';
import {UploadOutlined} from '@ant-design/icons';
import {itemIdSelect} from '../dataUrl';

export const Content = (props) => {
  return (<Input {...props} />);
};
export const Attachment = (props) => {

  const {value, onChange} = props;

  // const fileList = value ? [{
  //   url: value,
  // }] : [];

  const [oss, setOss] = useState();

  const {run} = useRequest({
    url: '/media/getToken',
    method: 'GET'
  }, {manual: true});


  return (
    <Space direction="vertical" style={{width: '100%'}} size="large">
      <Upload
        action={oss && oss.host}
        data={oss}
        // fileList={fileList}
        maxCount={1}
        listType="picture"
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
            onChange(`${data && data.host}/${data && data.key}`);
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

  // const {value,displays} = props;
  //
  //
  // const userIds = [];
  //
  //
  // // eslint-disable-next-line no-nested-ternary
  // value && value.length > 0 ? typeof(value[0])==='object' ? value.forEach((items)=>{
  //   userIds.push(items && `${items.userId}`);
  // }) : value.forEach((items)=>{
  //   userIds.push(items);
  // }) : [];
  //
  // useEffect(()=>{
  //   if (value){
  //     props.onChange(userIds);
  //   }
  // },[]);


  const {data} = useRequest(itemIdSelect);

  const options = data || [];


  return (
    <AntSelect
      mode="multiple"
      showArrow
      style={{width: '100%'}}
      options={options}
      onChange={(value) => {
        props.onChange(value);
      }}
    />
  );
};
