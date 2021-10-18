/**
 * sku表列表页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {skuDelete, skuDetail, skuList} from '../skuUrl';
import SkuEdit from '../skuEdit';
import * as SysField from '../skuField';
import {useRequest} from '@/util/Request';
import {customerDetail} from '@/pages/Crm/customer/CustomerUrl';
import {useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import Modal from '@/components/Modal';

const {Column} = AntTable;
const {FormItem} = Form;

const SkuList = () => {

  const params = useParams();

  const {loading, data, refresh} = useRequest(spuDetail, {
    defaultParams: {
      data: {
        spuId: params.cid
      }
    }
  });

  const ref = useRef(null);
  const tableRef = useRef(null);
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
        <FormItem label="sku名字" name="skuName" component={SysField.SkuName} />
        <FormItem label="spu id" name="spuId" component={SysField.SpuId} />
      </>
    );
  };

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }


  if (!data) {
    return null;
  }

  return (
    <>
      <Table
        title={<h2>{data.name}</h2>}
        api={skuList}
        rowKey="skuId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="sku名字" dataIndex="skuName" />
        <Column title="spu id" dataIndex="spuId" />
        <Column title="属性" dataIndex="spuId" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.skuId);
              }} />
              <DelButton api={skuDelete} value={record.skuId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal width={800} title="产品属性" component={SkuEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} spuId={data.spuId} attributes={data.skuRequests} />
    </>
  );
};

export default SkuList;
