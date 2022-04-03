/**
 * 仓库总表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useEffect, useRef, useState,} from 'react';
import {
  Button, Input,
  message,
  Modal as AntModal, Progress,
  Space, Statistic,
  Table as AntTable,
  Tabs,
  Upload
} from 'antd';
import {config} from 'ice';
import cookie from 'js-cookie';
import Table from '@/components/Table';
import Icon from '@/components/Icon';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Breadcrumb from '@/components/Breadcrumb';
import Form from '@/components/Form';
import {Position} from '@/pages/Erp/stock/StockField';
import Analysis from '@/pages/Erp/Analysis';

const {baseURI} = config;
const {FormItem} = Form;

const StockTable = (props) => {

  const {state} = props;

  const tableRef = useRef();

  const [filelist, setFilelist] = useState([]);

  const [data, setData] = useState([]);

  const dataTable = (dataSource) => {
    return <AntTable rowKey="key" dataSource={dataSource || []} pagination={false} scroll={{y: '50vh'}}>
      <Table.Column title="错误行" dataIndex="line"/>
      <Table.Column title="分类" dataIndex="spuClass"/>
      <Table.Column title="编码" dataIndex="strand"/>
      <Table.Column title="产品" dataIndex="item"/>
      <Table.Column title="型号" dataIndex="spuName"/>
      <Table.Column title="库存数量" dataIndex="stockNumber"/>
      <Table.Column title="上级库位" dataIndex="supperPosition"/>
      <Table.Column title="库位" dataIndex="position"/>
      <Table.Column title="品牌" dataIndex="brand"/>
      <Table.Column title="问题原因" dataIndex="error"/>
    </AntTable>;
  };

  const importErrData = (data) => {
    const errorDataSource = data && data.errorList && data.errorList.map((item, index) => {
      return {
        key: index,
        line: item.line,
        spuClass: item.spuClass,
        strand: item.strand,
        item: item.item,
        spuName: item.spuName,
        specifications: item.specifications,
        stockNumber: item.stockNumber,
        supperPosition: item.supperPosition,
        position: item.position,
        brand: item.brand,
        error: item.error,
      };
    });

    const successDataSource = data && data.successList && data.successList.map((item, index) => {
      return {
        key: index,
        line: item.line,
        spuClass: item.spuClass,
        strand: item.strand,
        item: item.item,
        spuName: item.spuName,
        specifications: item.specifications,
        stockNumber: item.stockNumber,
        supperPosition: item.supperPosition,
        position: item.position,
        brand: item.brand,
        error: item.error,
      };
    });

    AntModal.error({
      width: 1200,
      title: '导入数据',
      content: <div style={{padding: 8}}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab={`异常数据 / ${errorDataSource ? errorDataSource.length : '0'}`} key="1">
            {dataTable(errorDataSource)}
          </Tabs.TabPane>
          <Tabs.TabPane tab={`成功数据 / ${successDataSource ? successDataSource.length : '0'}`} key="2">
            {dataTable(successDataSource)}
          </Tabs.TabPane>
        </Tabs>

      </div>
    });
  };

  const token = cookie.get('tianpeng-token');

  const actions = () => {
    return (
      <Space>
        <Analysis type='link'/>
        <Button type='link' icon={<Icon type="icon-daoru"/>} onClick={() => {
          window.location.href = `${baseURI}stockExcel/stockExport?authorization=${token}`;
        }}>导出库存</Button>
        <Upload
          fileList={filelist}
          action={`${baseURI}Excel/importPositionBind`}
          headers={
            {Authorization: cookie.get('tianpeng-token')}
          }
          name="file"
          beforeUpload={() => {
            message.loading({
              content: '导入中，请稍后...',
              key: 1,
              style: {
                marginTop: '20vh',
              },
            });
            return true;
          }}
          onChange={async ({file, fileList}) => {
            setFilelist(fileList);
            if (file.status === 'done') {
              setFilelist([]);
              if (file.response.data) {
                importErrData(file.response && file.response.data);
              }
              message.success({
                content: '导入成功！',
                key: 1,
                duration: 2,
                style: {
                  marginTop: '20vh',
                },
              });
            }
          }}
        >
          <Button type='link' icon={<Icon type="icon-daoru"/>}>导入库存</Button>
        </Upload>
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
      actions={<>
        <Space style={{padding: 16}}>
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
      </>}
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
