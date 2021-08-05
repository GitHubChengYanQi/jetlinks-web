import React from 'react';
import {Avatar} from 'antd';

const AvatarList = (props) => {

  const {value} = props;

  if (value){
    return(
      <>
        <Avatar size={40}>{value.user ? value.user.account : null}</Avatar>
      </>
    );
  }


};

export default AvatarList;
