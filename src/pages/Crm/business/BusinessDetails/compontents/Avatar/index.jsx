import React from 'react';
import {Avatar} from 'antd';

const AvatarList = (props) => {

  const {value} = props;


  return(
    <>
      <Avatar size={40}>{value.getuser[0] ? value.getuser[0].account : null}</Avatar>
    </>
  );
};

export default AvatarList;
