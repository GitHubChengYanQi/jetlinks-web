import React from 'react';
import {Typography} from 'antd';

const Note = ({
  value,
  width,
}) => {

  return <Typography.Paragraph
    ellipsis={{rows: 1, tooltip: true}}
    style={{width}}>
    {value}
  </Typography.Paragraph>;
};

export default Note;
