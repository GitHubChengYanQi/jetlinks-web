import React from 'react';

const MinWidthDiv = ({children, width}) => {


  return <div style={{minWidth: width}}>{children}</div>;
};

export default MinWidthDiv;
