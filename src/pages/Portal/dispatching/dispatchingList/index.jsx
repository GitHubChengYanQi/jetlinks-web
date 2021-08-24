/**
 * 派工表列表页
 *
 * @author n
 * @Date 2021-08-23 10:25:48
 */

import React, {useEffect, useRef} from 'react';
import {Button, Image, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import {dispatchingDelete, dispatchingList} from '../dispatchingUrl';
import * as SysField from '../dispatchingField';
import Modal from '@/components/Modal';
import DispatchingTable from '@/pages/Portal/dispatching/dispatchingList/components/DispatchingTable';
import Table from '@/components/Table';

const {Column} = AntTable;
const {FormItem} = Form;

const DispatchingList = (props) => {

  const {data} = props;





  const ref = useRef(null);
  const tableRef = useRef(null);


  const searchForm = () => {
    return (
      <>
        <FormItem hidden value={data && data.repairId} name='repairId' component={SysField.Repairid} />
      </>
    );
  };

  return (
    <>
      <Table
        api={dispatchingList}
        rowKey="dispatchingId"
        showSearchButton={false}
        searchForm={searchForm}
        ref={tableRef}
        foo
        footer={false}
      >
        <Column title="姓名" dataIndex="name" />
        <Column title="手机号" dataIndex="phone" />
        <Column title="预计到达时间" dataIndex="time" />
        <Column title="负责区域" dataIndex="address" />
        <Column title="状态" dataIndex="state" />
        <Column title="备注" dataIndex="note" />
        <Column title="完成照片" dataIndex="imgUrl" render={(value, record) => {
          return (
            <>
              <Image width={100} height={50} src={value} />
            </>
          );
        }} />
        <Column title="评价" dataIndex="evaluation" />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <Button type='link' onClick={()=>{
                ref.current.open(record);
              }}>
                查看
              </Button>
            </>
          );
        }} width={100} />
      </Table>
      <Modal width={800} component={DispatchingTable} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default DispatchingList;
