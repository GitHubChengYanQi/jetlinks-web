/**
 * 仓库产品明细表列表页
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

import React, { useRef, useState} from 'react';
import {Button, Card, Table as AntTable} from 'antd';
import {useHistory, useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';
import Table from '@/components/Table';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import {stockDetailsList} from '@/pages/Erp/stockDetails/StockDetailsUrl';
import * as SysField from '../StockDetailsField';
import Icon from '@/components/Icon';
import Modal2 from '@/components/Modal';
import DeliveryDetailsEdit from '@/pages/Erp/deliveryDetails/deliveryDetailsEdit';
import {useRequest} from '@/util/Request';
import TreeSelectSee from '@/pages/Erp/TreeSelectSee';
import Code from '@/pages/Erp/spu/components/Code';
import {StockId} from '../StockDetailsField';


const {Column} = AntTable;
const {FormItem} = Form;

const StockDetailsList = (props) => {

  const refDelivery = useRef(null);
  const tableRef = useRef(null);
  const history = useHistory(null);

  const {value} = props;

  const {stockId} = props.searchParams;

  const [ids, setIds] = useState([]);

  const {loading, data} = useRequest({
    url: '/storehousePositions/treeView',
    method: 'GET',
  });

  if (loading){
    return (<ProSkeleton type="descriptions" />);
  }

  const searchForm = () => {

    return (
      <>
        <FormItem disabled placeholder="库存" name="stockId" value={stockId} component={SysField.StockId} />
        <FormItem placeholder="入库时间" name="storageTime" component={SysField.StorageTime} />
        <FormItem hidden name="stage" value={value ? 2 : 1} component={SysField.outStockOrderId} />
        {value && <FormItem hidden name="outStockOrderId" value={value} component={SysField.outStockOrderId} />}
      </>
    );
  };

  const footer = () => {
    return (
      <>
        <Button icon={<Icon type="icon-chuhuo" />} onClick={() => {
          refDelivery.current.open(false);
        }} type="text" >批量发货</Button>
        <Modal2 title="产品出库" component={DeliveryDetailsEdit} onSuccess={() => {
          tableRef.current.refresh();
          refDelivery.current.close();
        }} ref={refDelivery} ids={ids} />
      </>
    );

  };

  return (
    <Card title='库存明细' extra={<Button onClick={()=>{
      history.push('/ERP/stock');
    }}>返回</Button>}>
      <Table
        title={<Breadcrumb />}
        api={stockDetailsList}
        isModal={false}
        headStyle={{display:'none'}}
        rowKey="stockItemId"
        searchForm={searchForm}
        rowSelection
        footer={value ? footer : false}
        onChange={(keys,all) => {
          setIds(all);
        }}
        ref={tableRef}
      >
        <Column title="物料" render={(text, record) => {
          return (
            <>
              {record.qrCodeId && <Code value={record.qrCodeId} />}
              {record.sku && `${record.sku.skuName  }  /  `}
              {record.spuResult && record.spuResult.name}
              &nbsp;&nbsp;
              { record.backSkus && record.backSkus.length>0 && <em style={{color: '#c9c8c8', fontSize: 10}}>
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
              &nbsp;&nbsp;&nbsp;&nbsp;
              ×
              {record.number}
            </>
          );

        }} sorter />
        <Column title="仓库库位" dataIndex="pname" render={(text, record) => {
          return (
            <>
              {record.storehouseResult && record.storehouseResult.name}
              {record.storehousePositionsId !== 0 && record.storehousePositionsId
              &&
              <>
                -<TreeSelectSee data={data} value={record.storehousePositionsId} />
              </>}
            </>
          );
        }} sorter />
        <Column title="供应商(品牌)" dataIndex="brandId" render={(text, record) => {
          return (
            <>
              {record.brandResult.brandName}
            </>
          );
        }} />
        <Column title="产品价格" dataIndex="price" sorter />
        <Column title="入库时间" dataIndex="createTime" sorter />
      </Table>
    </Card>
  );
};

export default StockDetailsList;
