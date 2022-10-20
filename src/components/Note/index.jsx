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
    tooltip = true,
  }) => {
  return <Typography.Paragraph
    ellipsis={{rows: 1, tooltip}}
    className={className}
    style={{width, margin: 0, maxWidth, ...style}}>
    {value || children}
  </Typography.Paragraph>;
};

export default Note;
