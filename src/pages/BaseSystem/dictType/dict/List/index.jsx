import React, {useRef} from 'react';
import {RollbackOutlined} from '@ant-design/icons';
import {useParams, useHistory} from 'ice';
import {Input, Button} from 'antd';
import Table from '@/components/Table';
import {dictList} from '@/Config/ApiUrl/system/dict';
import EditButton from '@/components/EditButton';
import Drawer from '@/components/Drawer';
import DictEdit from '@/pages/BaseSystem/dictType/dict/Edit';
import AddButton from '@/components/AddButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Note from '@/components/Note';

const {Column} = Table;
const {FormItem} = Form;

const DictList = () => {

  const history = useHistory();

  const tableRef = useRef();
  const ref = useRef();
  const {dictTypeId} = useParams();

  const searchForm = () => {
    return (
      <FormItem
        name="dictTypeId"
        label=""
        component={Input}
        initialValue={dictTypeId}
        placeholder="请选择父级Id"
        type="hidden"
      />
    );
  };

  return (
    <>
      <Table
        formSubmit={(values) => ({...values, dictTypeId})}
        isModal={false}
        noPagination
        title={<Breadcrumb />}
        ref={tableRef}
        api={dictList}
        searchButtons={[
          <Button key={1} onClick={() => {
            history.push('/BASE_SYSTEM/dictType');
          }}><RollbackOutlined />返回</Button>,
          <AddButton key={2} onClick={() => {
            ref.current.open(false);
          }} />
        ]}
      >
        <Column title="名称" dataIndex="name" width={200} render={(value) => {
          return <Note width={200}>{value}</Note>;
        }} />
        <Column title="编码" dataIndex="code" width={100} />
        <Column title="状态" align="center" width={100} render={(value, row) => {
          if (row.status === 'ENABLE') {
            return ('启用');
          }
          return ('禁用');
        }} />
        <Column title="描述" dataIndex="description" />
        <Column title="操作" align="right" width={260} render={(value, row) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(row.dictId);
              }} />
            </>
          );
        }} />
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
