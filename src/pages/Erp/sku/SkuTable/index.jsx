/**
 * sku表列表页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, message, Space, Table as AntTable, Upload} from 'antd';
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
import {config, useHistory} from 'ice';
import cookie from 'js-cookie';

const {Column} = AntTable;
const {FormItem} = Form;

const {baseURI} = config;

const SkuTable = (props) => {

  const {spuClass, ...other} = props;

  const [loading, setLoading] = useState();

  const [ids, setIds] = useState([]);
  const [sku, setSku] = useState([]);

  const [edit, setEdit] = useState([]);

  const ref = useRef(null);
  const formRef = useRef(null);
  const tableRef = useRef(null);
  const history = useHistory(null);

  useEffect(() => {
    tableRef.current.formActions.setFieldValue('spuClass', spuClass ? spuClass[0] : null);
    tableRef.current.submit();
  }, [spuClass]);

  const actions = () => {
    return (
      <Space>
        <Upload
          action={`${baseURI}Excel/importSku`}
          headers={
            {Authorization: cookie.get('tianpeng-token')}
          }
          name='file'
          fileList={null}
        >
          <Button icon={<Icon type='icon-daoru' />}>导入物料</Button>
        </Upload>
        <AddButton onClick={() => {
          ref.current.open(false);
          setEdit(false);
        }} />
      </Space>
    );
  };

  const searchForm = () => {

    return (
      <div style={{maxWidth: 800}}>
        <FormItem
          placeholder="型号(零件号) / 编码 / 物料名称"
          name="skuName"
          component={SysField.SelectSkuName} />
        <FormItem
          style={{display: 'none'}}
          hidden v
          alue={0}
          component={SysField.Type} />
        <FormItem
          name="spuClass" style={{display: 'none'}}
          hidden
          component={SysField.SelectSpuClass} />
      </div>
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
        isModal={false}
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
        footer={footer}
        onChange={(value, record) => {
          setIds(value);
          setSku(record);
        }}
        {...other}
      >

        <Column title="型号(零件号) / 名称" key={1} dataIndex="spuId" render={(value, record) => {
          return (
            <>
              <Code source="sku" id={record.skuId} />
              <Button type="link" onClick={() => {
                history.push(`/SPU/sku/${record.skuId}`);
              }}>
                {record.skuName}
                &nbsp;/&nbsp;
                {record.spuResult && record.spuResult.name}
              </Button>
            </>
          );
        }} sorter />

        <Column title="规格" key={2} render={(value, record) => {
          return (
            <>
              {
                record.skuJsons
                &&
                record.skuJsons.map((items, index) => {
                  if (items.values && items.values.attributeValues && items.attribute && items.values){
                    return `${items.attribute.attribute} : ${items.values.attributeValues}`;
                  }else {
                    return null;
                  }
                }).toString()
              }
            </>
          );
        }} />

        <Column title="编码" key={3} dataIndex="standard" />

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

      <Modal
        title="物料"
        compoentRef={formRef}
        loading={(load) => {
          setLoading(load);
        }}
        component={SkuEdit}
        onSuccess={() => {
          tableRef.current.submit();
          ref.current.close();
        }}
        ref={ref}
        footer={<>
          {!edit && <Button
            loading={loading}
            type="primary"
            ghost
            onClick={() => {
              formRef.current.nextAdd(true);
            }}
          >完成并添加下一个</Button>}
          <Button
            loading={loading}
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
