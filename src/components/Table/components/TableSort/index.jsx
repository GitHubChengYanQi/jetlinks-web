import React from 'react';
import {InputNumber} from 'antd';
import style from '@/components/Table/index.module.less';

const TableSort = ({rowKey, sorts, value = [], onChange}) => {

  const sort = sorts.filter((items) => {
    return items.id === rowKey;
  });

  return <InputNumber
    bordered={false}
    min={0}
    className={style.sortInput}
    value={sort.length > 0 ? sort[0].sort : value}
    onChange={((changeValue) => {
      const array = sorts.filter((items) => {
        return items.id !== rowKey;
      });
      if (typeof onChange === 'function') {
        onChange([...array, {
          id: rowKey,
          sort: changeValue
        }]);
      }
    })} />;
};

export default TableSort;
