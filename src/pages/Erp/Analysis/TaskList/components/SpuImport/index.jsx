import React, {useRef} from 'react';
import {Input, Table as AntTable} from 'antd';
import Table from '@/components/Table';
import Form from '@/components/Form';

const {Column} = AntTable;
const {FormItem} = Form;

const api = {url: '/asynTaskDetail/errorlist', method: 'POST'};

const SpuImport = ({taskId}) => {

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
      contentHeight
      headStyle={{display: 'none'}}
      api={api}
      rowKey="detailId"
      searchForm={searchForm}
      ref={tableRef}
      noRowSelection
    >
      <Column title="错误行" dataIndex="spuExcel" align="center" render={(value) => {
        return <div style={{minWidth: 50}}>{value && value.line}</div>;
      }} />
      <Column title="产品编码" dataIndex="spuExcel" render={(value) => {
        return <div style={{minWidth: 70}}>{value && value.spuCoding}</div>;
      }} />
      <Column title="物料分类" dataIndex="spuExcel" render={(value) => {
        return <div style={{minWidth: 70}}>{value && value.spuClass}</div>;
      }} />
      <Column title="产品名称" dataIndex="spuExcel" render={(value) => {
        return <div style={{minWidth: 70}}>{value && value.spuName}</div>;
      }} />
      <Column title="规格" dataIndex="spuExcel" render={(value) => {
        return <div style={{minWidth: 70}}>{value && value.specifications}</div>;
      }} />
      <Column title="单位" dataIndex="spuExcel" render={(value) => {
        return <div style={{minWidth: 70}}>{value && value.unit}</div>;
      }} />
      <Column title="问题原因" dataIndex="spuExcel" render={(value) => {
        return <div style={{minWidth: 70}}>{value && value.error}</div>;
      }} />
    </Table>
  </div>;
};

export default SpuImport;
