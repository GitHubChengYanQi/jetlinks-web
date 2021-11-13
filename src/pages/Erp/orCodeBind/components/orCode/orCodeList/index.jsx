/**
 * 二维码列表页
 *
 * @author song
 * @Date 2021-10-29 10:23:27
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Radio, Space, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {orCodeDelete, orCodeList} from '../orCodeUrl';
import OrCodeEdit from '../orCodeEdit';
import * as SysField from '../orCodeField';
import Breadcrumb from '@/components/Breadcrumb';
import {RedoOutlined, ScanOutlined, SearchOutlined} from '@ant-design/icons';
import Code from '@/pages/Erp/spu/components/Code';
import {config} from 'ice';
import {useRequest} from '@/util/Request';

const {Column} = AntTable;
const {FormItem} = Form;

const {code,baseURI} = config;

const OrCodeList = () => {

  const [exports,setExports] = useState(0);


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
        <FormItem label="类型" style={{width: 200}} name="type" component={SysField.Type} />
        <FormItem hidden style={{width: 200}} name="state" component={SysField.Type} />
      </>
    );
  };

  const items = (object) => {
    switch (object && object.type) {
      case 'item':
      case 'sku':
        if (object.orcodeBackItem) {
          return <>
            {object.orcodeBackItem.skuName && `${object.orcodeBackItem.skuName}  /  `}
            {object.orcodeBackItem.backSpu && object.orcodeBackItem.backSpu.name}
            &nbsp;&nbsp;
            {object.orcodeBackItem.backSkus && object.orcodeBackItem.backSkus.length > 0 &&
            <em style={{color: '#c9c8c8', fontSize: 10}}>
              (
              {
                object.orcodeBackItem.backSkus.map((items, index) => {
                  return <span key={index}>{items.itemAttribute.attribute}
                    ：
                    {items.attributeValues.attributeValues}</span>;
                })
              }
              )
            </em>}
            &nbsp;&nbsp;&nbsp;&nbsp;
            ×
            {object.inKindNumber}
          </>;
        } else {
          return null;
        }
      case 'instock':
        return <>{object.result && object.result.coding}</>;
      case 'outstock':
        return <>{object.result && object.result.outstockOrderId}</>;
      case 'storehouse':
        return object.result && <>
          {object.result.name}
        </>;
      case 'storehousePositions':
        return object.result && <>
          {object.result.name}

        </>;
      default:
        break;
    }
  };


  const Type = (type) => {
    switch (type) {
      case 'sku':
        return '物料';
      case 'instock':
        return '入库';
      case 'outstock':
        return '出库';
      case 'storehouse':
        return '仓库';
      case 'storehousePositions':
        return '库位';
      case 'spu':
        return '产品';
      case 'item':
        return '实物';
      default:
        return null;
    }
  };

  return (
    <>
      <Table
        cardTitle={
          <>
            <Radio.Group defaultValue={0} value={exports} onChange={(value) => {
              setExports(value.target.value);
              switch (value.target.value) {
                case 0:
                  tableRef.current.formActions.setFieldValue('*', null);
                  break;
                case 1:
                  tableRef.current.formActions.setFieldValue('*', null);
                  tableRef.current.formActions.setFieldValue('state', '0');
                  break;
                case 2:
                  tableRef.current.formActions.setFieldValue('state', '1');
                  break;
                default:
                  break;
              }
              tableRef.current.submit();
            }}>
              <Radio.Button  value={0}>查看所有码</Radio.Button>
              <Radio.Button  value={1}>查看未使用码</Radio.Button>
              <Radio.Button  value={2}>查看已使用码</Radio.Button>
            </Radio.Group>
            <Button type='link' onClick={() => {
              const url = code.replaceAll(':','%3A').replaceAll('/','%2F').replaceAll('#','%23');
              window.location.href = `${baseURI}api/qrCodetoExcel?type=${exports}&url=${url}%3Fid%3DcodeId`;
            }}>
              导出当前选中的码
            </Button>
          </>
        }
        title={<Breadcrumb />}
        api={orCodeList}
        rowKey="orCodeId"
        SearchButton={
          <Space>
            <Button type="primary" onClick={() => {
              setExports(2);
              tableRef.current.formActions.setFieldValue('state', 1);
              tableRef.current.submit();
            }}>
              <SearchOutlined />查询
            </Button>
            <Button type="default" onClick={() => {
              setExports(0);
              tableRef.current.formActions.setFieldValue('*', null);
              tableRef.current.submit();
            }}>
              <RedoOutlined />刷新
            </Button>
          </Space>
        }
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="类型" dataIndex="type" render={(value, record) => {
          return (<>
            <Code value={record.orCodeId} />
            {Type(value)}
          </>);
        }} />
        <Column title="绑定关系" dataIndex="type" render={(value, record) => {
          return (<>
            {
              items(record.object)
            }
          </>);
        }} />
        <Column title="创建时间" dataIndex="createTime" />
        <Column />
      </Table>
      <Drawer width={800} title="编辑" component={OrCodeEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default OrCodeList;
