/**
 * 二维码列表页
 *
 * @author song
 * @Date 2021-10-29 10:23:27
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Space, Table as AntTable} from 'antd';
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

const {Column} = AntTable;
const {FormItem} = Form;

const OrCodeList = () => {
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
          </>;
        } else {
          return null;
        }
      case 'instock':
        return <>{object.result && object.result.coding}</>;
      case 'storehouse':
        return object.result && <>
          {object.result.storehouseResult && object.result.storehouseResult.name} - {object.result && object.result.name}
        </>;
      default:
        break;
    }
  };


  const type = (type) => {
    switch (type) {
      case 'sku':
        return '物料';
      case 'instock':
        return '入库';
      case 'outstock':
        return '出库';
      case 'stock':
        return '库存';
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
        title={<Breadcrumb />}
        api={orCodeList}
        rowKey="orCodeId"
        SearchButton={
          <Space>
            <Button type="primary" onClick={() => {
              tableRef.current.submit();
            }}>
              <SearchOutlined />查询
            </Button>
            <Button type="default" onClick={() => {
              tableRef.current.formActions.setFieldValue('*', null);
              tableRef.current.submit();
            }}>
              <RedoOutlined />刷新
            </Button>
            <Button type="dashed" onClick={() => {
              tableRef.current.formActions.setFieldValue('type', 'null');
              tableRef.current.submit();
            }}>
              查询所有空码
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
            {
              items(record.object)
            }
          </>);
        }} />
        <Column title="类型" dataIndex="type" render={(value, record) => {
          return (<>
            {type(value)}
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
