import React from 'react';
import {Card, Input, Tabs} from 'antd';
import Breadcrumb from '@/components/Breadcrumb';
import PlanList from '@/pages/Production/ProductionPlan/List/components/PlanList';
import OrderList from '@/pages/Production/ProductionPlan/List/components/OrderList';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import Form from '@/components/Form';

const {FormItem} = Form;

const List = () => {

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
      <Tabs>
        <Tabs.TabPane tab="订单式生产" key="order">
          <OrderList searchForm={searchForm} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="计划式生产" key="plan">
          <PlanList searchForm={searchForm} />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  </>;
};

export default List;
