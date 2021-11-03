/**
 * sku表列表页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {deleteBatch, skuDelete, skuList} from '../skuUrl';
import SkuEdit from '../skuEdit';
import * as SysField from '../skuField';
import Modal from '@/components/Modal';
import {createFormActions} from '@formily/antd';

const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const SkuList = ({...props}) => {

  const [ids, setIds] = useState();

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

  const footer = () => {
    return (<DelButton api={{
      ...deleteBatch,
    }} onSuccess={() => {
      tableRef.current.refresh();
    }} value={ids}>删除</DelButton>);
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="种类名字" style={{width: 200}} name="spuId" component={SysField.SpuId} />
      </>
    );
  };


  return (
    <>
      <Table
        api={skuList}
        rowKey="skuId"
        searchForm={searchForm}
        formActions={formActionsPublic}
        actions={actions()}
        contentHeight
        bordered={false}
        ref={tableRef}
        footer={footer}
        onChange={(value) => {
          setIds(value);
        }}
      >
        <Column title="名称" dataIndex="spuId" render={(value, record) => {
          return (
            <>
              {record.spuResult && record.spuResult.name}
            </>
          );
        }} />

        <Column title="属性" render={(value, record) => {
          return (
            <>
              {
                record.skuJsons
                &&
                record.skuJsons.map((items, index) => {
                  if (index === record.skuJsons.length - 1) {
                    return (
                      <span
                        key={index}>{items.attribute && items.attribute.attribute}：{items.values && items.values.attributeValues}</span>
                    );
                  } else {
                    return (
                      <span
                        key={index}>{items.attribute && items.attribute.attribute}：{items.values && items.values.attributeValues}&nbsp;,&nbsp;</span>
                    );
                  }
                })
              }
            </>
          );
        }
        } />

        <Column title="型号" dataIndex="skuName" />
        <Column title="执行标准" dataIndex="standard" />
        <Column title="操作" dataIndex="isBan" width={100} render={(value, record) => {
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
        }} />
      </Table>
      <Modal title="物料" component={SkuEdit} onSuccess={() => {
        tableRef.current.submit();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default SkuList;
