import React, {useRef} from 'react';
import Table from '@/components/Table';
import {dictTypeList} from '@/Config/ApiUrl/system/dict';
import EditButton from '@/components/EditButton';
import DelButton from '@/components/DelButton';
import DictTypeEdit from '@/pages/BaseSystem/dictType/Edit';
import Drawer from '@/components/Drawer';
import {Button} from 'antd';
import {useHistory} from 'ice';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = Table;

const DictTypeList = () => {

  const history = useHistory();
  const ref = useRef();

  return (
    <>
      <Table
        api={dictTypeList}
        title={<Breadcrumb />}
      >
        <Column title="名称" width={200} render={(value, row) => {
          return (
            <Button type="link" onClick={() => {
              switch (row.code) {
                case 'PURCHASE':
                  history.push('/BASE_SYSTEM/dictType/purchaseConfig');
                  break;
                default:
                  history.push(`/BASE_SYSTEM/dictType/${row.dictTypeId}`);
                  break;
              }
            }}>{row.name}</Button>
          );
        }}/>
        <Column dataIndex="code" title="编码" width={200}/>
        <Column title="是否系统" align="center" width={100} render={(value, row) => {
          if (row.systemFlag === 'Y') {
            return ('是');
          }
          return ('否');
        }}/>
        <Column title="描述" dataIndex="description"/>
        <Column title="状态" align="center" width={100} render={(value, row) => {
          if (row.status === 'ENABLE') {
            return ('启用');
          }
          return ('禁用');
        }}/>
        <Column title="操作" align="right" width={260} render={(value, row) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(row.dictTypeId);
              }}/>
            </>
          );
        }}/>
      </Table>
      <Drawer title="编辑字典" ref={ref} component={DictTypeEdit}/>
    </>
  );
};

export default DictTypeList;
