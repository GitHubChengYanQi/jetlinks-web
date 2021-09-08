/**
 * 清单列表页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useEffect, useRef} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Modal2 from '@/components/Modal';
import {useHistory, useParams} from "ice";
import {partsDelete, partsDetail, partsList} from '../PartsUrl';
import PartsEdit from '../PartsEdit';
import {useRequest} from "@/util/Request";
import * as SysField from '../PartsField';



const {Column} = AntTable;
const {FormItem} = Form;

const PartsList = (props) => {

  const params = useParams();
  const itemId = params.id;
  const ref = useRef(null);
  const tableRef = useRef(null);
  const history = useHistory();
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
      </>
    );
  };

  const {loading, data, run,refresh} = useRequest(partsDetail, {
    defaultParams: {
      data: {
        itemId: params.id
      }
    }
  });

  useEffect(()=>{
    tableRef.current.formActions.setFieldValue('ItemId', itemId);
    tableRef.current.refresh();
  },[itemId]);

  const searchForm = () => {
    return (
      <>
        <FormItem label="产品名称" disabled name="ItemId" value={itemId} component={SysField.ItemId}/>
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb title='清单管理'/>}
        api={partsList}
        isModal={false}
        rowKey="partsId"
        searchForm={searchForm}
        SearchButton
        actions={actions()}
        ref={tableRef}
      >
        <Column title="零件名称" render={(value,record)=>{
          return (
            <Button type="link" onClick={() => {
              history.push(`/ERP/parts/${record.itemsResult.itemId}`);
            }}>{record.itemsResult ? record.itemsResult.name : ''}  </Button>
          );
        }}/>
        <Column title="零件数量" width={120} align='center' dataIndex="number"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record);
              }}/>
              <DelButton api={partsDelete} value={record.partsId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Modal2 width={900} title="清单" component={PartsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} itemsId={itemId}/>
    </>
  );
};

export default PartsList;
