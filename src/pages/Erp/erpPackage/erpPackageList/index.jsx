/**
 * 套餐表列表页
 *
 * @author qr
 * @Date 2021-08-04 11:01:43
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Card, Col, Input, Row, Table as AntTable, Tabs} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {erpPackageDelete, erpPackageList} from '../erpPackageUrl';
import ErpPackageEdit from '../erpPackageEdit';
import * as SysField from '../erpPackageField';
import Breadcrumb from "@/components/Breadcrumb";
import TableList from "@/pages/Erp/erpPackage/erpPackageList/components/TableList";
const {Column} = AntTable;
const {FormItem} = Form;

const ErpPackageList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const [data, setData] = useState();
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="套餐名称" name="productName" component={SysField.productName}/>

      </>
    );
  };

  return (
    <>
      <div>
        {/*<Row gutter={12}>*/}
        {/*  <Col span={16}>*/}
        <Table
          title={<Breadcrumb />}
          api={erpPackageList}
          rowKey="packageId"
          searchForm={searchForm}
          actions={actions()}
          ref={tableRef}
          expandable={{
            expandedRowRender: record => <TableList value = {record.packageId}/>
          }}
        >
          <Column title="套餐名称" dataIndex="productName" render={(text, record, index)=>{
            return (
              <Button type="link" onClick={()=>{
                setData(record.packageId);
              }}>{text}</Button>
            );
          }} />
          <Column/>
          <Column title="操作" align="right" render={(value, record) => {
            return (
              <>
                <EditButton onClick={() => {
                  ref.current.open(record.packageId);
                }}/>
                <DelButton api={erpPackageDelete} value={record.packageId} onSuccess={()=>{
                  tableRef.current.refresh();
                }}/>
              </>
            );
          }} width={300}/>
        </Table>
          {/*</Col>*/}
          {/*<Col span={8}>*/}

        {/*  </Col>*/}
        {/*</Row>*/}


      </div>

      <Drawer width={800}  title="套餐" component={ErpPackageEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default ErpPackageList;
