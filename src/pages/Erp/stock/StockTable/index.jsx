/**
 * 仓库总表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useEffect, useRef, useState,} from 'react';
import {
  Input, Progress,
  Space, Statistic,
} from 'antd';
import {config} from 'ice';
import cookie from 'js-cookie';
import Table from '@/components/Table';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Breadcrumb from '@/components/Breadcrumb';
import Form from '@/components/Form';
import {Position} from '@/pages/Erp/stock/StockField';
import Analysis from '@/pages/Erp/Analysis';
import Import from '@/pages/Erp/sku/SkuTable/Import';

const {baseURI} = config;
const {FormItem} = Form;

const StockTable = (props) => {

  const {state} = props;

  const tableRef = useRef();

  const [data, setData] = useState([]);

  const token = cookie.get('tianpeng-token');

  const actions = () => {
    return (
      <Space size={24}>
        <Analysis type='link' style={{padding:0}}/>
        <a href={`${baseURI}stockExcel/stockExport?authorization=${token}`} target='_blank' rel="noreferrer">导出库存</a>
        <Import
          url={`${baseURI}Excel/importPositionBind`}
          title="导入库存"
          module="stock"
          onOk={() => {
            tableRef.current.submit();
          }}
        />
      </Space>
    );
  };

  useEffect(() => {
    tableRef.current.formActions.setFieldValue('storehouseId', state);
    tableRef.current.submit();
  }, [state]);


  const searchForm = () => {

    return (
      <>
        <FormItem
          label="物料名称"
          placeholder="搜索物料"
          name="skuName"
          component={Input}/>
        <FormItem
          visible={state || false}
          label="库位"
          id={state}
          placeholder="搜索库位"
          name="storehousePositionsId"
          component={Position}/>
        <FormItem
          hidden
          name="type"
          value="sku"
          component={Input}/>
        <FormItem
          hidden
          name="storehouseId"
          component={Input}/>
      </>
    );
  };

  const positionResult = (data) => {

    if (!data) {
      return '';
    }

    if (!data.supper) {
      return data.name;
    }

    return `${positionResult(data.supper)}-${data.name}`;
  };


  return (
    <Table
      ref={tableRef}
      noRowSelection
      actionButton={actions()}
      showCard={<div style={{borderBottom:'solid 1px #eee',marginBottom:16}}>
        <Space size={24} style={{paddingBottom:24}}>
          <Progress
            type="circle"
            percent={100}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            format={() =>
              <Statistic title="物料种类" value={data[0] ? data[0].skuTypeNum : 0}/>
            }/>
          <Progress
            type="circle"
            percent={100}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            format={() =>
              <Statistic title="总数量" value={data[0] ? data[0].skuCount : 0}/>
            }/>
        </Space>
      </div>}
      title={<Breadcrumb/>}
      searchForm={searchForm}
      branch={(data) => {
        setData(data);
        return data;
      }}
      api={{
        url: '/viewStockDetails/list',
        method: 'POST',
      }}
      tableKey="stockSku"
      rowKey="skuId"
      {...props}
    >
      <Table.Column key={1} title="物料编码" dataIndex="skuResult" render={(value) => {
        return value && value.standard;
      }}/>
      <Table.Column key={2} title="物料名称" dataIndex="skuResult" render={(value) => {
        return <div style={{minWidth: 60}}>{value && value.spuResult && value.spuResult.name}</div>;
      }}/>
      <Table.Column key={3} title="物料型号" dataIndex="skuResult" render={(value) => {
        return value && value.skuName;
      }}/>
      <Table.Column key={4} title="物料规格" dataIndex="skuResult" render={(value) => {
        return <div style={{minWidth: 60}}>{value && value.specifications}</div>;
      }}/>
      <Table.Column key={5} title="物料描述" dataIndex="skuResult" render={(value) => {
        return <div style={{minWidth: 60}}><SkuResultSkuJsons skuResult={value} describe/></div>;
      }}/>
      <Table.Column key={6} title="库存数量" dataIndex="number" render={(value) => {
        return <div style={{minWidth: 60}}>{value}</div>;
      }}/>
      <Table.Column key={7} title="库位" dataIndex="positionsResult" render={(value) => {
        return <div style={{minWidth: 60}}>{positionResult(value)}</div>;
      }}/>
      <Table.Column key={8} title="仓库" dataIndex="storehouseResult" render={(value) => {
        return <div style={{minWidth: 60}}>{value && value.name}</div>;
      }}/>
      <Table.Column/>
    </Table>
  );
};

export default StockTable;
