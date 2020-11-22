import React from 'react';
import {Select as AntdSelect,Tree as AntdTree} from "antd";
import Tree from "@/components/Tree";

const SelectTree = ({api, ...props}) => {

  return (
    <div>
      <AntdSelect />
      <Tree api={api}/>
    </div>
  );
};

export default SelectTree;
