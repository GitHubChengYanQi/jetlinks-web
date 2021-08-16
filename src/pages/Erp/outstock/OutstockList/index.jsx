/**
 * 出库表列表页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef} from 'react';
import {Button, Modal, notification, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import Modal2 from '@/components/Modal';
import OutstockEdit from '@/pages/Erp/outstock/OutstockEdit';
import {useBoolean} from 'ahooks';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import {outstockDelete, outstockEdit, outstockList} from '../OutstockUrl';
import * as SysField from '../OutstockField';
import Table from '@/pages/Crm/customer/CustomerDetail/compontents/Table';

const {Column} = AntTable;
const {FormItem} = Form;

const OutstockList = (props) => {

  const {outstockOrderId} = props;

  const ref = useRef(null);
  const tableRef = useRef(null);


  const [search, {toggle}] = useBoolean(false);


  const searchForm = () => {


    return (
      <FormItem mega-props={{span: 1}} placeholder="出库单" name="outstockOrderId" hidden value={outstockOrderId} component={SysField.ItemIdSelect} />
    );
  };

  return (
    <>
      <Button style={{width:'100%'}} onClick={()=>{
        ref.current.open(false);
      }}>
        添加库存
      </Button>
      <Table
        api={outstockList}
        rowKey="outstockId"
        ref={tableRef}
        showSearchButton={false}
        searchForm={searchForm}
      >
        <Column title="仓库名称" width={200} fixed dataIndex="storehouseId" render={(text, record) => {
          return (
            <>
              {record.storehouseResult.name}
            </>
          );
        }} />
        <Column title="产品名称" width={200} dataIndex="itemId" render={(text, record) => {
          return (
            <>
              {record.itemsResult.name}
            </>
          );
        }} />

        <Column title="品牌名称"  width={200} dataIndex="brandName" render={(text, record) => {
          return (
            <>
              {record.brandResult.brandName}
            </>
          );
        }} />
        <Column title="出库数量" width={120} align="center" dataIndex="number" sorter />
        <Column title="操作" fixed="right" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.outstockId);
              }} />
              <DelButton api={outstockDelete} value={record.outstockId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={100} />
      </Table>
      <Modal2 title="产品出库" component={OutstockEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} outstockOrderId={outstockOrderId}  />
    </>
  );
};

export default OutstockList;
