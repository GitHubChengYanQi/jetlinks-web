import React, {useRef} from 'react';
import Table from '@/components/Table';
import {dictList} from '@/Config/ApiUrl/system/dict';
import {Input, Button} from 'antd';
import {useParams} from 'ice';
import EditButton from '@/components/EditButton';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import DictEdit from '@/pages/BaseSystem/dictType/dict/Edit';
import AddButton from '@/components/AddButton';
import {RollbackOutlined} from '@ant-design/icons';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = Table;
const {FormItem} = Form;

const DictList = () => {
  const tableRef = useRef();
  const ref = useRef();
  const {dictTypeId} = useParams();

  const actions = () => {
    return (
      <>
        <Button onClick={() => {
          window.history.back();
        }}><RollbackOutlined/>返回</Button>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
      </>
    );
  };

  const searchForm = () => {
    return (
      <FormItem name="dictTypeId" label="" component={Input} initialValue={dictTypeId} placeholder="父级Id" type="hidden"/>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
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
                ref.current.open(row.dictId);
              }}/>
              <DelButton/>
            </>
          );
        }}/>
      </Table>
      <Drawer title="编辑字典" ref={ref} component={DictEdit} onSuccess={() => {
        ref.current.close();
        tableRef.current.refresh();
      }} dictTypeId={dictTypeId}
      />
    </>
  );
};

export default DictList;
