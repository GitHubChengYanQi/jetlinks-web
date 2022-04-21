import React, {useState} from 'react';
import {Typography} from 'antd';

const Note = (
  {
    value,
    children,
    width,
    maxWidth,
  }) => {

  return <Typography.Paragraph
    ellipsis={{rows: 1, tooltip: true,}}
    style={{width, margin: 0,maxWidth}}>
    {value || children}
  </Typography.Paragraph>;
};

export default Note;
