/**
 * 列表页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {deleteBatch, spuDelete, spuList} from '../spuUrl';
import SpuEdit from '../spuEdit';
import * as SysField from '../spuField';
import {useHistory} from 'ice';
import Modal from '@/components/Modal';
import Breadcrumb from '@/components/Breadcrumb';
import Code from '@/pages/Erp/spu/components/Code';

const {Column} = AntTable;
const {FormItem} = Form;

const SpuList = () => {
  const ref = useRef(null);
  const formRef = useRef(null);
  const tableRef = useRef(null);
  const history = useHistory();

  const [ids, setIds] = useState([]);

  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem placeholder="产品名称" name="name" component={SysField.Name} />
        <FormItem hidden name="type" value={1} component={SysField.type} />
      </>
    );
  };

  const footer = () => {
    return <>
      <DelButton api={{
        ...deleteBatch,
      }} onSuccess={() => {
        tableRef.current.refresh();
      }} value={ids}>批量删除</DelButton>
    </>;
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={spuList}
        rowKey="spuId"
        tableKey="spu"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        footer={footer}
        onChange={(ids) => {
          setIds(ids);
        }}
      >
        <Column title="名称" key={1} dataIndex="name" render={(value, record) => {
          return (
            <>
              <Code source="spu" id={record.spuId} />
              <Button type="link" onClick={() => {
                history.push(`/spu/SPUS/detail/${record.spuId}`);
              }}>
                {value}
              </Button>
            </>
          );
        }} sorter />

        <Column title="配置" key={2} dataIndex="categoryId" render={(value, record) => {
          return (
            <>
              {record.category && record.category.categoryName}
            </>
          );
        }} />
        <Column title="单位" key={3} width={120} align="center" dataIndex="unitId" render={(value, record) => {
          return (
            <>
              {record.unitResult && record.unitResult.unitName}
            </>
          );
        }} sorter />
        <Column title="分类" key={4} width={120} render={(value, record) => {
          return (
            <>
              {
                record.spuClassificationResult && record.spuClassificationResult.name
              }
            </>
          );
        }} sorter />
        <Column title="生产类型" key={5} width={120} align="center" dataIndex="productionType" render={(value) => {
          switch (value) {
            case 0:
              return '自制件';
            case 1:
              return '委派件';
            case 2:
              return '外购件';
            default:
              break;
          }

        }} sorter />
        <Column title="养护周期" key={6} width={120} align="center" dataIndex="curingCycle" render={(value) => {
          return (
            <>
              {value && `${value}天`}
            </>
          );
        }} sorter />
        <Column />
        <Column title="操作" key={7} fixed="right" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                // history.push(`/SPU/spu/add?id=${record.spuId}`);
                ref.current.open(record.spuId);
              }} />
              <DelButton api={spuDelete} value={record.spuId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} />
      </Table>
      <Modal
        width={1000}
        title="产品"
        compoentRef={formRef}
        component={SpuEdit}
        footer={<>
          <Button type='primary' onClick={()=>{
            formRef.current.formRef.current.submit();
          }}>保存</Button>
          <Button type='default' onClick={()=>{
            ref.current.close();
          }}>取消</Button>
        </>}
        onSuccess={() => {
          tableRef.current.refresh();
          ref.current.close();
        }} ref={ref} />
    </>
  );
};

export default SpuList;
