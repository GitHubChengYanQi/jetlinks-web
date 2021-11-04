/**
 * sku表列表页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, message, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {deleteBatch, skuDelete, skuList} from '../skuUrl';
import SkuEdit from '../skuEdit';
import * as SysField from '../skuField';
import Modal from '@/components/Modal';
import Breadcrumb from '@/components/Breadcrumb';
import {CopyOutlined} from '@ant-design/icons';

const {Column} = AntTable;
const {FormItem} = Form;

const SkuList = ({...props}) => {

  const [ids, setIds] = useState([]);
  const [sku, setSku] = useState([]);

  const [edit, setEdit] = useState([]);

  const ref = useRef(null);
  const formRef = useRef(null);
  const tableRef = useRef(null);

  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
          setEdit(false);
        }} />
      </>
    );
  };

  const footer = () => {
    return (
      <>
        <Button type="link" icon={<CopyOutlined />} onClick={() => {
          setEdit(false);
          if (sku.length === 0) {
            message.info('请选择数据');
          } else if (sku.length === 1) {
            const value = {
              ...sku[0],
              skuId:null,
            };
            ref.current.open(value);
          } else {
            message.error('只能复制一条');
          }
        }}>
          复制添加
        </Button>
        <DelButton api={{
          ...deleteBatch,
        }} onSuccess={() => {
          tableRef.current.refresh();
        }} value={ids}>批量删除</DelButton>
      </>
    );
  };

  const searchForm = () => {
    return (
      <>
        <FormItem label="名字" style={{width: 200}} name="spuId" component={SysField.SpuId} />
        <FormItem name="type" style={{display: 'none'}} hidden value={0} component={SysField.Type} />
      </>
    );
  };


  return (
    <>
      <Table
        title={<Breadcrumb title="物料管理" />}
        api={skuList}
        rowKey="skuId"
        searchForm={searchForm}
        actions={actions()}
        contentHeight
        bordered={false}
        ref={tableRef}
        footer={footer}
        onChange={(value,record) => {
          setIds(value);
          setSku(record);
        }}
      >
        <Column title="型号 / 名称" dataIndex="spuId" render={(value, record) => {
          return (
            <>
              {record.skuName}
              &nbsp;/&nbsp;
              {record.spuResult && record.spuResult.name}
            </>
          );
        }} />

        <Column title="配置" render={(value, record) => {
          return (
            <>
              {
                record.skuJsons
                &&
                record.skuJsons.map((items, index) => {
                  if (index === record.skuJsons.length - 1) {
                    return (
                      <span
                        key={index}>{(items.values && items.values.attributeValues) && (`${(items.attribute && items.attribute.attribute)}：${items.values && items.values.attributeValues}`)}</span>
                    );
                  } else {
                    return (
                      <span
                        key={index}>{(items.values && items.values.attributeValues) && (`${(items.attribute && items.attribute.attribute)}：${items.values && items.values.attributeValues}`)}&nbsp;,&nbsp;</span>
                    );
                  }
                })
              }
            </>
          );
        }
        } />
        {/*<Column title="编码" dataIndex="standard" />*/}
        <Column title="操作" dataIndex="isBan" width={100} render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record);
                setEdit(true);
              }} />
              <DelButton api={skuDelete} value={record.skuId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} />
      </Table>
      <Modal title="物料" compoentRef={formRef} component={SkuEdit} onSuccess={() => {
        tableRef.current.submit();
        ref.current.close();
      }} ref={ref} footer={<>
        {!edit && <Button
          type="primary"
          ghost
          onClick={() => {
            formRef.current.nextAdd(true);
          }}
        >完成并添加下一个</Button>}
        <Button
          type="primary"
          onClick={() => {
            formRef.current.nextAdd(false);
          }}
        >完成</Button>
      </>} />
    </>
  );
};

export default SkuList;
