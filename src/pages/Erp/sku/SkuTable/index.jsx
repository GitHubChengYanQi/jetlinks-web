/**
 * sku表列表页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useEffect, useRef, useState} from 'react';
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
import {CopyOutlined, SearchOutlined} from '@ant-design/icons';
import {SelectSkuName, SelectSpu, SelectSpuClass} from '../skuField';
import {useBoolean} from 'ahooks';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import Icon from '@/components/Icon';
import Code from '@/pages/Erp/spu/components/Code';

const {Column} = AntTable;
const {FormItem} = Form;

const SkuTable = (props) => {

  const {spuClass, ...other} = props;

  const [ids, setIds] = useState([]);
  const [sku, setSku] = useState([]);

  const [edit, setEdit] = useState([]);

  const ref = useRef(null);
  const formRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    tableRef.current.formActions.setFieldValue('spuClass', spuClass ? spuClass[0] : null);
    tableRef.current.submit();
  }, [spuClass]);

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

  const [search, {toggle}] = useBoolean(false);

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="物料名称" style={{width: 200}} name="spuId" component={SysField.SelectSpu} />
          <FormItem mega-props={{span: 1}} placeholder="编码" name="standard" component={SysField.Standard} />
        </>
      );
    };


    return (
      <div style={{maxWidth: 800}}>
        <MegaLayout
          responsive={{s: 1, m: 2, lg: 2}} labelAlign="left" layoutProps={{wrapperWidth: 200}} grid={search}
          columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="型号" name="skuName" component={SysField.SelectSkuName} />
          {search ? formItem() : null}
        </MegaLayout>

      </div>
    );
  };


  const Search = () => {
    return (
      <>
        <MegaLayout>
          <FormButtonGroup>
            <Submit><SearchOutlined />查询</Submit>
            <Button type="link" title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              toggle();
            }}>
              <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
            <MegaLayout inline>
              <FormItem mega-props={{span: 1}} name="type" style={{display: 'none'}} hidden value={0} component={SysField.Type} />
              <FormItem mega-props={{span: 1}} name="spuClass" style={{display: 'none'}} hidden component={SysField.SelectSpuClass} />
            </MegaLayout>
          </FormButtonGroup>
        </MegaLayout>
      </>
    );
  };


  const footer = () => {
    return (
      <>
        <Button type="link" disabled={sku.length !== 1} icon={<CopyOutlined />} onClick={() => {
          setEdit(false);
          const value = {
            ...sku[0],
            skuId: null,
          };
          ref.current.open(value);
        }}>
          复制添加
        </Button>
        <DelButton
          disabled={ids.length === 0}
          api={{
            ...deleteBatch,
          }}
          onSuccess={() => {
            tableRef.current.refresh();
          }}
          value={ids}>批量删除</DelButton>
      </>
    );
  };



  return (
    <>
      <Table
        title={<Breadcrumb title="物料管理" />}
        api={skuList}
        tableKey="sku"
        rowKey="skuId"
        layout={search}
        SearchButton={Search()}
        searchForm={searchForm}
        actions={actions()}
        bordered={false}
        ref={tableRef}
        footer={footer}
        onChange={(value, record) => {
          setIds(value);
          setSku(record);
        }}
        {...other}
      >

        <Column title="型号 / 名称" key={1} dataIndex="spuId" render={(value, record) => {
          return (
            <>
              <Code source="sku" id={record.skuId} />
              {record.skuName}
              &nbsp;/&nbsp;
              {record.spuResult && record.spuResult.name}
            </>
          );
        }} sorter />

        <Column title="配置" key={2} render={(value, record) => {
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
        }} />

        <Column title='编码' key={3} dataIndex='standard' />

        <Column key={4} title="创建时间" sorter width={159} align="center" dataIndex="createTime" />

        <Column />

        <Column title="操作" key={5} dataIndex="isBan" width={100} render={(value, record) => {
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

export default SkuTable;
