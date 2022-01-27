/**
 * 仓库总表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, {useEffect, useRef, useState,} from 'react';
import {Button, message, Modal as AntModal, Space, Table as AntTable, Upload} from 'antd';
import {createFormActions} from '@formily/antd';
import {config, useHistory} from 'ice';
import cookie from 'js-cookie';
import Breadcrumb from '@/components/Breadcrumb';
import Form from '@/components/Form';
import Table from '@/components/Table';
import {stockList} from '../../StockUrl';
import * as SysField from '../../StockField';
import Icon from '@/components/Icon';
import AddButton from '@/components/AddButton';

const {baseURI} = config;


const {Column} = AntTable;
const {FormItem} = Form;
const formActionsPublic = createFormActions();
const StockTable = (props) => {

  const {choose, state, ...other} = props;
  const tableRef = useRef(null);
  const history = useHistory();


  const [filelist, setFilelist] = useState([]);

  const importErrData = (errData) => {
    const data = errData && errData.map((item, index) => {
      return {
        key: index,
        line: item.line,
        sku: item.classItem,
        class: item.spuClass,
        unit: item.unit,
        name: item.spuName,
        coding: item.standard,
        batch: item.isNotBatch,
        attributes: item.attributes && item.attributes.map((item) => {
          return item;
        }).toString()
      };
    });
    AntModal.error({
      width: 1200,
      title: `异常数据 / ${data.length}`,
      content: <div style={{padding: 8}}>
        <AntTable rowKey="key" dataSource={data || []} pagination={false} scroll={{y: '50vh'}}>
          <Table.Column title="错误行" dataIndex="line" />
          <Table.Column title="分类" dataIndex="class" />
          <Table.Column title="产品" dataIndex="sku" />
          <Table.Column title="型号" dataIndex="name" />
          <Table.Column title="成品码" dataIndex="coding" />
          <Table.Column title="单位" dataIndex="unit" />
          <Table.Column title="是否批量" dataIndex="batch" />
          <Table.Column title="参数配置" dataIndex="attributes" />
        </AntTable>
      </div>
    });
  };

  const actions = () => {
    return (
      <Space>
        <Upload
          fileList={filelist}
          action={`${baseURI}Excel/importInstock`}
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
              if (file.response.data && file.response.data.length > 0) {
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
          <Button icon={<Icon type="icon-daoru" />}>导入库存</Button>
        </Upload>
      </Space>
    );
  };

  useEffect(() => {
    if (state) {
      tableRef.current.formActions.setFieldValue('storehouseId', state ? state[0] : null);
      tableRef.current.submit();
    }
  }, [state]);

  const searchForm = () => {

    return (
      <>
        <FormItem hidden name="storehouseId" value={state} component={SysField.Storehouse} />
        <FormItem placeholder="物料" name="skuId" component={SysField.Sku} />
        <FormItem
          placeholder="品牌"
          name="brandId"
          component={SysField.BrandId}
        />
        <FormItem label="所有库存" name="stockNumber" component={SysField.Stock} />
      </>
    );
  };


  return (
    <>
      <Table
        title={<Breadcrumb />}
        actions={actions()}
        api={stockList}
        isModal={false}
        formActions={formActionsPublic}
        rowKey="stockId"
        searchForm={searchForm}
        ref={tableRef}
        rowSelection
        {...other}
      >
        <Column title="物料" render={(text, record) => {
          return (
            <>
              {record.spuResult && record.spuResult.spuClassificationResult && record.spuResult.spuClassificationResult.name}
              &nbsp;/&nbsp;
              {record.spuResult && record.spuResult.name}
              &nbsp;&nbsp;
              {record.backSkus && record.backSkus.length > 0 && <em style={{color: '#c9c8c8', fontSize: 10}}>
                (
                {
                  record.backSkus.map((items, index) => {
                    return <span key={index}>{items.itemAttribute.attribute}
                      ：
                      {items.attributeValues.attributeValues}</span>;
                  })
                }
                )
              </em>}
            </>
          );

        }} sorter />
        <Column title="品牌" width={200} render={(text, record) => {
          return (
            <>
              {record.brandResult && record.brandResult.brandName}
            </>
          );
        }} />
        <Column title="供应商" width={200} render={(text, record) => {
          return (
            <>
              {record.customerResult && record.customerResult.customerName}
            </>
          );
        }} />
        <Column title="仓库名称" render={(text, record) => {
          return (
            <>
              {record.storehouseResult && record.storehouseResult.name}
            </>
          );
        }} />
        <Column title="数量" width={120} align="center" sorter dataIndex="inventory" />
        <Column title="操作" fixed="right" align="center" width={100} render={(value, record) => {
          return <Button type="link" onClick={() => {
            history.push(`/ERP/stock/detail?stockId=${record.stockId}`);
          }}>查看库存详情</Button>;
        }} />

      </Table>
    </>
  );
};

export default StockTable;
