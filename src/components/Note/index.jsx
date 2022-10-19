import React from 'react';
import {Typography} from 'antd';

const Note = (
  {
    value,
    children,
    width,
    className,
    maxWidth,
    style,
  }) => {
  return <Typography.Paragraph
    ellipsis={{rows: 1}}
    className={className}
    style={{width, margin: 0, maxWidth, ...style}}>
    {value || children}
  </Typography.Paragraph>;
};

export default Note;
