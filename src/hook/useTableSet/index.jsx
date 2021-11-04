import Icon from '@/components/Icon';
import {Button} from 'antd';
import React, {useState} from 'react';

/**
 * 设置表格列的hook
 * @param column
 * @returns {{setButton: JSX.Element, tableColumn}}
 */
const useTableSet = (column)=>{

  const [tableColumn,setTableColumn] = useState(column);

  return{
    tableColumn,
    setButton:<Button type="text"><Icon type="icon-xitongpeizhi" />设置列</Button>
  };
};

export default useTableSet;
