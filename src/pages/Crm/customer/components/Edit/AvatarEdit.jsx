import React, {useState} from 'react';
import {Avatar, Image, Popover} from 'antd';
import {FormOutlined} from '@ant-design/icons';
import UpLoadImg from '@/components/Upload';

const AvatarEdit = ({value, onChange,name}) => {

  const [change, setChange] = useState(value);

  return (
    <Popover
      placement="top"
      trigger="hover"
      content={<UpLoadImg button={<FormOutlined />} type="picture" onChange={(value) => {
        setChange(value);
        onChange(value);
      }} />}>
      <Avatar size={72} src={change && <Image src={change} />}>{name.substring(0, 1)}</Avatar>
    </Popover>
  );

};
export default AvatarEdit;
