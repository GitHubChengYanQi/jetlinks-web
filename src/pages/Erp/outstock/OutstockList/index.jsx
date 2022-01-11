/**
 * 出库表列表页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef, useState} from 'react';
import {Badge, Button, Col, Descriptions, message, Row, Table as AntTable, Tag} from 'antd';
import Form from '@/components/Form';
import Modal from '@/components/Modal';
import OutstockEdit from '@/pages/Erp/outstock/OutstockEdit';
import {outstockDelete, outstockEdit, outstockList} from '../OutstockUrl';
import * as SysField from '../OutstockField';
import EditButton from '@/components/EditButton';
import DelButton from '@/components/DelButton';
import Icon from '@/components/Icon';
import DeliveryDetailsEdit from '@/pages/Erp/deliveryDetails/deliveryDetailsEdit';
import Table from '@/components/Table';
import {createFormActions} from '@formily/antd';
import ProCard from '@ant-design/pro-card';
import Code from '@/pages/Erp/spu/components/Code';
import OutstockListingList from '@/pages/Erp/outstock/outstockListing/outstockListingList';


const {Column} = AntTable;
const {FormItem} = Form;

const formActionsPublic = createFormActions();

const OutstockList = (props) => {

  const {outstockOrderId, value, sourhouse} = props;

  const ref = useRef(null);
  const refDelivery = useRef(null);
  const tableRef = useRef(null);
  const [ids, setIds] = useState();

  const footer = () => {
    return (
      <>
        <Button icon={<Icon type="icon-chuhuo" />} onClick={() => {
          if (!ids || ids.length <= 0) {
            message.error('请选择发货产品！！！');
          } else {
            refDelivery.current.open(false);
          }
        }} type="text">批量发货</Button>
        <Modal title="产品出库" component={DeliveryDetailsEdit} onSuccess={() => {
          tableRef.current.refresh();
          refDelivery.current.close();
          setIds();
        }} ref={refDelivery} ids={ids} />
      </>
    );

  };


  const searchForm = () => {
    return (
      <>
        <FormItem
          mega-props={{span: 1}}
          placeholder="出库单"
          name="outstockOrderId"
          hidden
          value={outstockOrderId || (value && value.outstockOrderId)}
          component={SysField.ItemIdSelect} />
      </>
    );
  };

  return (
    <div style={{padding: 24}}>
      <ProCard className="h2Card" title="出库信息" headerBordered>
        <Row gutter={24}>
          <Col span={16}>
            <Descriptions column={1} bordered labelStyle={{width: 120}}>
              <Descriptions.Item label="出库单号">{value.coding}
              </Descriptions.Item>
              <Descriptions.Item label="仓库">{value.storehouseResult && value.storehouseResult.name}</Descriptions.Item>
              <Descriptions.Item label="负责人">{value.userResult && value.userResult.name}</Descriptions.Item>
              <Descriptions.Item label="备注">{value.note}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={8}>
            <Code source="outstock" id={value.outstockOrderId} image codeWidth={210} />
          </Col>
        </Row>
      </ProCard>
      <ProCard className="h2Card" title="出库清单" headerBordered>
        <OutstockListingList value={value} />
      </ProCard>
      <ProCard className="h2Card" title="出库详情" headerBordered>
        <Table
          headStyle={{display: 'none'}}
          api={outstockList}
          contentHeight
          isModal={false}
          noPagination
          formActions={formActionsPublic}
          rowKey="outstockId"
          ref={tableRef}
          showSearchButton={false}
          searchForm={searchForm}
          getCheckboxProps={(record) => ({
            disabled: record.state === 1,
          })}
          footer={value ? footer : false}
          onChange={(value, record) => {
            setIds(record);
          }}
        >

          <Column title="产品" render={(text, record) => {
            return (
              <>
                {record.spuResult && record.spuResult.spuClassificationResult && record.spuResult.spuClassificationResult.name}
                &nbsp;/&nbsp;
                {record.spuResult && record.spuResult.name}
                &nbsp;&nbsp;
                <em style={{color: '#c9c8c8', fontSize: 10}}>
                  (
                  {
                    record.backSkus
                    &&
                    record.backSkus.map((items, index) => {
                      return (
                        <span key={index}>{items.itemAttribute.attribute}：{items.attributeValues.attributeValues}</span>
                      );
                    })
                  }
                  )
                </em>
              </>
            );

          }} sorter />

          <Column title="品牌名称" width={200} dataIndex="brandId" render={(text, record) => {
            return (
              <>
                {record.brandResult.brandName}
              </>
            );
          }} />
          <Column title="数量" dataIndex="number" width={70} align="center" />
          <Column title="状态" width={200} dataIndex="state" render={(text, record) => {
            return (
              <>
                {text === 0 ? <Badge text="已出库" color="blue" /> : <Badge text="已发货" color="green" />}
              </>
            );
          }} />
        </Table>
      </ProCard>
      <Modal title="产品出库" component={OutstockEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} outstockOrderId={outstockOrderId} sourhouse={sourhouse} />
    </div>
  );
};

export default OutstockList;
