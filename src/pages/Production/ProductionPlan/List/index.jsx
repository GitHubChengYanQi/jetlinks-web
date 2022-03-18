import React, {useRef, useState} from 'react';
import {Button, Card, Descriptions, Input, notification, Space, Table, Tabs} from 'antd';
import ProCard from '@ant-design/pro-card';
import Breadcrumb from '@/components/Breadcrumb';
import PlanList from '@/pages/Production/ProductionPlan/List/components/PlanList';
import OrderList from '@/pages/Production/ProductionPlan/List/components/OrderList';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import Form from '@/components/Form';
import Modal from '@/components/Modal';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Coding from '@/pages/Erp/tool/components/Coding';
import Note from '@/components/Note';

const {FormItem} = Form;
const {Column} = Table;

const List = () => {

  const ref = useRef();

  const [checkedSkus, setCheckedSkus] = useState([]);

  const [value, onChange] = useState({});

  const actions = () => {
    return <>
      <Button
        type="primary"
        disabled={checkedSkus.length === 0}
        onClick={() => {
          ref.current.open(true);
        }}>创建生产计划</Button>
    </>;
  };

  const searchForm = () => {

    return (
      <>
        <FormItem
          label="订单编号"
          name="coding"
          placeholder="请输入订单编号"
          component={Input}
        />
        <FormItem
          label="产品"
          placeholder="请选择产品"
          name="skuId"
          noAdd
          component={SelectSku} />
      </>
    );
  };

  return <>
    <Card title={<Breadcrumb />}>
      <Tabs onTabClick={() => {
        setCheckedSkus([]);
      }}>
        <Tabs.TabPane tab="订单式生产" key="order">
          <OrderList
            searchForm={searchForm}
            actions={actions}
            setCheckedSkus={setCheckedSkus}
            checkedSkus={checkedSkus} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="计划式生产" key="plan">
          <PlanList
            searchForm={searchForm}
            actions={actions}
            setCheckedSkus={setCheckedSkus}
            checkedSkus={checkedSkus}
          />
        </Tabs.TabPane>
      </Tabs>
    </Card>

    <Modal ref={ref} width={800} headTitle="创建生产计划" footer={<Space>
      <Button type="primary" onClick={() => {
        if (!value.coding) {
          return notification.warn({
            message: '请输入编码！'
          });
        }else {

        }
      }}>创建生产计划</Button>
      <Button>取消</Button>
    </Space>}>
      <div style={{padding: 16}}>
        <ProCard className="h2Card" title="生产计划信息" headerBordered>
          <Descriptions column={1} labelStyle={{width: 100}}>
            <Descriptions.Item
              label="生产计划编码">
              <Coding value={value.coding} onChange={(coding) => {
                onChange({...value, coding});
              }} /></Descriptions.Item>
            <Descriptions.Item label="备注">
              <Input.TextArea
                rows={2}
                placeholder="请输入生产计划备注"
                onChange={(text) => {
                  onChange({...value, remark: text.target.value});
                }} /></Descriptions.Item>
          </Descriptions>
        </ProCard>
        <ProCard className="h2Card" title="生产明细" headerBordered>
          <Table pagination={false} rowKey="detailId" dataSource={checkedSkus}>
            <Column title="物料编码" key={0} dataIndex="skuResult" render={(value) => {
              return value && value.standard;
            }} />
            <Column title="物料名称" key={1} dataIndex="skuResult" render={(value) => {
              return value && value.spuResult && value.spuResult.name;
            }} />
            <Column title="规格 / 型号" key={2} dataIndex="skuResult" render={(value) => {
              return <Note
                value={`${value.skuName}${value.specifications ? ` / ${value.specifications}` : ''}`}
                width={100} />;
            }} />
            <Column title="物料描述" key={3} dataIndex="skuResult" render={(value) => {
              return <Note value={<SkuResultSkuJsons describe skuResult={value} />} width={100} />;
            }} />
            <Column title="数量" key={4} dataIndex="purchaseNumber" />
          </Table>
        </ProCard>
      </div>
    </Modal>
  </>;
};

export default List;
