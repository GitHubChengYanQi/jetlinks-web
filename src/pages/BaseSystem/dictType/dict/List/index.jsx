import React, {useRef} from 'react';
import Table from '@/components/Table';
import {dictList} from '@/Config/ApiUrl/system/dict';
import {Input, Form, Button} from 'antd';
import {useParams} from 'ice';
import EditButton from '@/components/EditButton';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import DictEdit from "@/pages/BaseSystem/dictType/dict/Edit";
import AddButton from "@/components/AddButton";
import {RollbackOutlined} from '@ant-design/icons';

const {Column} = Table;

const DictList = () => {
  const tableRef = useRef();
  const ref = useRef();
  const {dictTypeId} = useParams();

  const actions = () => {
    return (
      <>
        <Button><RollbackOutlined />返回</Button>
        <AddButton />
      </>
    );
  };

  const searchForm = () => {
    return (
      <Form.Item name="dictTypeId" label="" initialValue={dictTypeId}>
        <Input placeholder="父级Id" type="hidden"/>
      </Form.Item>
    );
  };

  return (
    <>
      <Table
        title={<h2>字典管理</h2>}
        ref={tableRef}
        api={dictList}
        searchForm={searchForm}
        actions={actions()}
      >
        <Column title="名称" dataIndex="name" width={200}/>
        <Column title="编码" dataIndex="code" width={100}/>
        <Column title="状态" align="center" width={100} render={(value, row) => {
          if (row.status === 'ENABLE') {
            return ('启用');
          }
          return ('禁用');
        }}/>
        <Column title="描述" dataIndex="description"/>
        <Column title="操作" align="right" width={260} render={(value, row) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(row.dictTypeId);
              }}/>
              <DelButton/>
            </>
          );
        }}/>
      </Table>
      <Drawer ref={ref} component={DictEdit}/>
    </>
  );
};

export default DictList;
