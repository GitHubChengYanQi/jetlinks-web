import React, {useState} from 'react';
import {dbTableList} from '@/pages/BaseSystem/gen/GenUrl';
import {Button, Drawer, Input, Table} from "antd";
import Form from '@/components/Form';

console.log(dbTableList);

const {Column} = Table;
const {FormItem} = Form;


const GenDataBaseInfo = () => {

  const [visible, setVisible] = useState(false);

  return (
    <Table
    >
      <Column title="名称" dataIndex="dbName" width={200}/>
    </Table>
  );
};

export default GenDataBaseInfo;
