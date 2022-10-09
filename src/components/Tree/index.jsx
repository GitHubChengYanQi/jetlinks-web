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
    treeData,
    halfChecked,
    ...other
  }
) => {

  const {data} = useRequest(api, {manual: !api});

  if (treeData || data) {
    return (<div style={border ? {maxHeight: '50vh', overflow: 'auto', border: 'solid 1px #d9d9d9', padding: 8} : {}}>
      <AntdTree
        onCheck={(values, checkInfo) => {
          const halfCheckedKeys = checkInfo.halfCheckedKeys || [];
          // const newValues = values.filter(item => !halfCheckedKeys.find(key => key === item));
          // console.log([...newValues, ...halfCheckedKeys]);
          const checkValues = halfChecked ? [...values, ...halfCheckedKeys] : values;
          onChange(checkValues, checkInfo.checkedNodes);
        }}
        defaultExpandedKeys={['0']}
        selectable={false}
        checkable
        defaultCheckedKeys={value}
        treeData={treeData || data}
        {...other}
      />
    </div>);
  } else {
    return null;
  }

};

export default Tree;
