/**
 * 工艺路线列表列表页
 *
 * @author Captain_Jazz
 * @Date 2022-02-15 14:12:28
 */

import React, {useImperativeHandle, useRef, useState} from 'react';
import {Table as AntTable} from 'antd';
import {useHistory} from 'ice';
import Table from '@/components/Table';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {processRouteDelete, processRouteList} from '../processRouteUrl';
import * as SysField from '../processRouteField';
import Breadcrumb from '@/components/Breadcrumb';
import Drawer from '@/components/Drawer';
import Detail from '@/pages/ReSearch/Detail';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import {processList, shipRouteShipList} from '@/pages/Workflow/Process/processUrl';

const {Column} = AntTable;
const {FormItem} = Form;

const ProcessRouteList = ({spuId, value}, ref) => {
  const tableRef = useRef(null);
  const refAdd = useRef(null);
  const history = useHistory(null);

  const [skuId, setSkuId] = useState();

  const add = (id) => {
    setSkuId(id);
    refAdd.current.open(false);
  };

  useImperativeHandle(ref, () => ({
    add,
  }));

  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          // history.push('/SPU/processRoute/add');
          add();
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="物料名称" name="skuName" component={SysField.ProcessRouteCoding} />
        <FormItem hidden value={spuId} name="spuId" component={SysField.ProcessRoteName} />
        <FormItem hidden value='ship' name="type" component={SysField.ProcessRoteName} />
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        headStyle={spuId && {display: 'none'}}
        api={shipRouteShipList}
        noRowSelection
        rowKey="processId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="物料" dataIndex="skuResult" render={(value) => {
          return <SkuResultSkuJsons skuResult={value} />;
        }} />
        <Column title="创建时间" dataIndex="createTime" width={200} />
        <Column />
        <Column title="操作" align="right" dataIndex="processId" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                refAdd.current.open(value);
                // history.push(`/SPU/processRoute/${value}`);
              }} />
            </>
          );
        }} width={100} />
      </Table>


      <Drawer
        bodyStyle={{padding: 0}}
        push={false}
        skuId={skuId}
        headTitle="添加子工艺路线"
        height="100%"
        placement="top"
        addChildren
        component={Detail}
        ref={refAdd}
        onSuccess={() => {
          refAdd.current.close();
          tableRef.current.submit();
        }}
        onBack={() => {
          refAdd.current.close();
        }}
      />

    </>
  );
};

export default React.forwardRef(ProcessRouteList);
