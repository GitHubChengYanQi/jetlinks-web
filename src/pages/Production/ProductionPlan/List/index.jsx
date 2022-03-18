import React from 'react';
import {Table as AntTable} from 'antd';
import Table from '@/components/Table';
import {pendingProductionPlan} from '@/pages/Production/Url';

const {Column} = AntTable;

const List = () => {

  return <>
    <Table
      api={pendingProductionPlan}
    >
      <Column />
    </Table>
  </>;
};

export default List;
