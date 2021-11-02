/**
 * 清单列表页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useEffect, useRef} from 'react';
import {Button, Card, Descriptions, Divider, notification, Table as AntTable} from 'antd';
import Form from '@/components/Form';
import {useHistory, useParams} from 'ice';
import {partsAdd, partsDelete, partsDetail, partsEdit, partsList} from '../PartsUrl';
import {useRequest} from '@/util/Request';
import {InternalFieldList as FieldList} from '@formily/antd';
import {DeleteOutlined, PlusOutlined, ScanOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import {spuDelete, spuDetail, spuList} from '@/pages/Erp/spu/spuUrl';
import SpuList from '@/pages/Erp/parts/components/SpuList';
import ProSkeleton from '@ant-design/pro-skeleton';
import {useBoolean} from 'ahooks';
import Table from '@/components/Table';
import Breadcrumb from '@/components/Breadcrumb';
import * as SysField from '@/pages/Erp/spu/spuField';
import ProCard from '@ant-design/pro-card';
import DelButton from '@/components/DelButton';
import Modal from '@/components/Modal';
import PartsEdit from '@/pages/Erp/parts/PartsEdit';
import Drawer from '@/components/Drawer';
import Parts from '@/pages/Erp/parts/PartsEdit/components/Parts';
import SkuList from '@/pages/Erp/sku/skuList';
import EditButton from '@/components/EditButton';
import Code from '@/pages/Erp/spu/components/Code';
import AddButton from '@/components/AddButton';

const {Column} = AntTable;
const {FormItem} = Form;

const PartsList = () => {

  const params = useParams();

  const ref = useRef();

  const refAdd = useRef();

  const refSku = useRef();

  const tableRef = useRef();


  const searchForm = () => {
    return (
      <>
        {params.cid && <FormItem name="spu_id" value={params.cid || 111} component={SysField.Name} />}
        <FormItem label='清单名称' name="partName" component={SysField.Name} />
      </>
    );
  };

  const action = () => {

    return (
      <AddButton onClick={()=>{
        refAdd.current.open(false);
      }} />
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={partsList}
        bordered={false}
        rowKey="partsId"
        contentHeight
        searchForm={searchForm}
        rowSelection
        actions={action()}
        ref={tableRef}
      >
        <Column title="清单名称" dataIndex="partName" />
        <Column title="操作" fixed="right" align="center" width={270} render={(value, record) => {
          return (
            <>
              <Button type="link" onClick={() => {
                ref.current.open(record.partsId);
              }}>
                查看详情
              </Button>
              <Button type="link" onClick={() => {
                refSku.current.open(record);
              }}>
                关联sku
              </Button>
              <EditButton onClick={() => {
                refAdd.current.open(record.partsId);
              }} />
              <DelButton api={partsDelete} value={record.partsId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} />
      </Table>;
      <Modal width={1300} title="编辑" component={PartsEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
      <Modal width={1200} title="清单" component={Parts} onSuccess={() => {
        tableRef.current.refresh();
        refAdd.current.close();
      }} ref={refAdd} spuId={params.cid} />
      <Modal width={800} title="编辑" component={SkuList} onSuccess={() => {
        tableRef.current.refresh();
        refSku.current.close();
      }} ref={refSku} />
    </>
  );
};

export default PartsList;
