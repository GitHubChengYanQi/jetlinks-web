import React, {useState} from 'react';
import {Avatar, Image, Popover} from 'antd';
import {FormOutlined} from '@ant-design/icons';
import UpLoadImg from '@/components/Upload';

const AvatarEdit = ({value, onChange, name}) => {

  const [change, setChange] = useState(value);

  return (
    <div style={{cursor: 'pointer'}}>
      <UpLoadImg
        button={<Avatar size={72} src={change}>{name.substring(0, 1)}</Avatar>}
        type="picture"
        onChange={(value) => {
          setChange(value);
          onChange(value);
        }} />
    </div>
  );

};
export default AvatarEdit;
