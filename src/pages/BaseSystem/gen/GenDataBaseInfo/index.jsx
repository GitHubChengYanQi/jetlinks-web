import React, {useEffect, useState} from 'react';
import {dbTableList} from '@/pages/BaseSystem/gen/GenUrl';
import {Button, Drawer, Input, Table} from 'antd';
import Form from '@/components/Form';
import {useRequest} from '@/util/Request';

console.log(dbTableList);

const {Column} = Table;


const GenDataBaseInfo = ({onChange,dataSourceId}) => {

  const {data,run} = useRequest(dbTableList, {
    manual: true,
  });
  useEffect(() => {
    if (dataSourceId) {
      run({
        data: {
          dbId: dataSourceId,
        }
      });
    }
  }, [
    dataSourceId
  ]);

  return (
    <Table
      dataSource={data}
      pagination={false}
      rowKey="tableName"
      rowSelection={{
        onChange:(selectedRowKeys)=>{
          onChange(selectedRowKeys);
        }
      }}
    >
      <Column title="表名" dataIndex="tableName" width={200}/>
      <Column title="名称" dataIndex="tableComment" width={200}/>
    </Table>
  );
};

export default GenDataBaseInfo;
