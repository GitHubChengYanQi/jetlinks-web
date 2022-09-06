import React from 'react';
import {Tree as AntdTree} from 'antd';
import {useRequest} from '@/util/Request';


const Tree = (
  {
    value,
    onChange = () => {
    },
    api,
    border,
    ...other
  }
) => {
  if (!api) {
    throw new Error('Table component: api cannot be empty,But now it doesn\'t exist!');
  }
  const {data} = useRequest(api);

  if (data) {
    return (<div style={border ? {maxHeight: '50vh', overflow: 'auto', border: 'solid 1px #d9d9d9', padding: 8} : {}}>
      <AntdTree
        onCheck={(values, checkInfo) => {
          onChange(values, checkInfo.checkedNodes);
        }}
        defaultExpandedKeys={['0']}
        selectable={false}
        checkable
        checkedKeys={value}
        treeData={data}
        {...other}
      />
    </div>);
  } else {
    return null;
  }

};

export default Tree;
