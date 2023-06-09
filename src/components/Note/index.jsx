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
    margin = 0,
    tooltip = true,
    copyable,
  }) => {
  return <Typography.Paragraph
    copyable={copyable}
    ellipsis={{rows: 1, tooltip}}
    className={className}
    style={{width, margin, maxWidth, ...style}}>
    {value || children}
  </Typography.Paragraph>;
};

export default Note;
