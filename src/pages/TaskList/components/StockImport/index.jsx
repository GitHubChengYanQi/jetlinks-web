import React, {useRef} from 'react';
import {Input, Table as AntTable} from 'antd';
import {createFormActions} from '@formily/antd';
import Table from '@/components/Table';
import Form from '@/components/Form';

const {Column} = AntTable;
const {FormItem} = Form;

const api = {url: '/asynTaskDetail/errorlist', method: 'POST'};

const formActionsPublic = createFormActions();

const StockImport = ({taskId}) => {

  const tableRef = useRef();

  const searchForm = () => {
    return (
      <>
        <FormItem hidden name="taskId" value={taskId} component={Input} />
      </>
    );
  };

  return <div style={{maxWidth:1500}}>
    <Table
      noSort
      formActions={formActionsPublic}
      contentHeight
      headStyle={{display: 'none'}}
      api={api}
      rowKey="detailId"
      searchForm={searchForm}
      ref={tableRef}
      noRowSelection
    >
      <Column title="错误行" dataIndex="positionBind" align="center" render={(value) => {
        return <div style={{minWidth: 50}}>{value && value.line}</div>;
      }} />
      <Column title="编码" dataIndex="positionBind" render={(value) => {
        return <div style={{minWidth: 70}}>{value && value.strand}</div>;
      }} />
      <Column title="分类" dataIndex="positionBind" render={(value) => {
        return <div style={{minWidth: 70}}>{value && value.spuClass}</div>;
      }} />
      <Column title="产品" dataIndex="positionBind" render={(value) => {
        return <div style={{minWidth: 70}}>{value && value.item}</div>;
      }} />
      <Column title="型号" dataIndex="positionBind" render={(value) => {
        return <div style={{minWidth: 70}}>{value && value.spuName}</div>;
      }} />
      <Column title="库位" dataIndex="positionBind" render={(value) => {
        return <div style={{minWidth: 70}}>{value && value.position}</div>;
      }} />
      <Column title="上级库位" dataIndex="positionBind" render={(value) => {
        return <div style={{minWidth: 70}}>{value && value.supperPosition}</div>;
      }} />
      <Column title="库存余额" dataIndex="positionBind" render={(value) => {
        return <div style={{minWidth: 70}}>{value && value.stockNumber}</div>;
      }} />
      <Column title="问题原因" dataIndex="positionBind" render={(value) => {
        return <div style={{minWidth: 70}}>{value && value.error}</div>;
      }} />
    </Table>
  </div>;
};

export default StockImport;
