import React from 'react';
import Cascader from '@/components/Cascader';

const commonArea = {
  url: '/commonArea/treeView',
  method: 'POST',
};


const CascaderAdress = (props) => {

  return (
    <Cascader api={commonArea} {...props} />
  );
};

export default CascaderAdress;
