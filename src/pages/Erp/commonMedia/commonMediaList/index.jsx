/**
 * 列表页
 *
 * @author Captain_Jazz
 * @Date 2022-03-15 08:54:48
 */

import React, {useState} from 'react';
import {Button, Divider, Image, Input, Space, Spin} from 'antd';
import {commonMediaList} from '../commonMediaUrl';
import {useRequest} from '@/util/Request';
import Empty from '@/components/Empty';
import UpLoadImg from '@/components/Upload';

const CommonMediaList = ({
  getImg = () => {
  },
}) => {

  const [name, setName] = useState();

  const {loading, data, refresh, run} = useRequest({
    ...commonMediaList,
    params: {limit: 19, page: 1},
    data: {types: ['png', 'PNG', 'jpeg', 'JPEG', 'jpg', 'JPG', 'gif', 'GIF']}
  });


  return (
    <>
      <Space>
        图片名称：
        <Input
          value={name}
          placeholder="请输入图片名称"
          onChange={(value) => {
            setName(value.target.value);
          }} />
        <Button type="primary" onClick={() => {
          run({
            params: {limit: 19, page: 1},
            data: {
              fieldName: name,
              types: ['png', 'PNG', 'jpeg', 'JPEG', 'jpg', 'JPG', 'gif', 'GIF']
            }
          });
        }}>查询</Button>
      </Space>
      <Divider />
      <Spin spinning={loading}>
        <Space wrap size={16}>
          <UpLoadImg
            onlyButton
            onChange={() => {
              refresh();
            }} />
          {data && data.map((item, index) => {
            return <Image
              alt={item.fieldName}
              style={{cursor: 'pointer'}}
              preview={false}
              key={index}
              src={item.url}
              height={100}
              width={100}
              onClick={() => {
                getImg(item.mediaId, item.url);
              }} />;
          })}
        </Space>
      </Spin>
    </>
  );
};

export default CommonMediaList;
