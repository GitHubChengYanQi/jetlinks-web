import React, {useRef, useState} from 'react';
import {Affix, Alert, Button, Card, Descriptions, Input, notification, Result, Space, Spin, Table, Tabs} from 'antd';
import ProCard from '@ant-design/pro-card';
import {useBoolean} from 'ahooks';
import moment from 'moment';
import Breadcrumb from '@/components/Breadcrumb';
import PlanList from '@/pages/Production/ProductionPlan/List/components/PlanList';
import OrderList from '@/pages/Production/ProductionPlan/List/components/OrderList';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import Form from '@/components/Form';
import Modal from '@/components/Modal';
import SkuResultSkuJsons from '@/pages/Erp/sku/components/SkuResult_skuJsons';
import Coding from '@/pages/Erp/tool/components/Coding';
import Note from '@/components/Note';
import {useRequest} from '@/util/Request';
import DatePicker from '@/components/DatePicker';
import Select from '@/components/Select';
import {UserIdSelect} from '@/pages/Erp/instock/InstockUrl';

const {FormItem} = Form;
const {Column} = Table;

const List = () => {

  const ref = useRef();

  const [checkedSkus, setCheckedSkus] = useState([]);

  const [value, onChange] = useState({});

  const [type, setType] = useState('order');

  const [loading, setLoading] = useState();

  const [result, setResult] = useState();

  const [refresh, {setTrue, setFalse}] = useBoolean();

  const {run} = useRequest({
    url: '/productionPlan/add',
    method: 'POST'
  }, {
    manual: true,
    onSuccess: () => {
      setCheckedSkus([]);
      setTrue();
      setLoading(false);
      setResult('success');
    },
    onError: () => {
      setCheckedSkus([]);
      setLoading(false);
      setResult('error');
    }
  });

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

  const footer = () => {
    switch (result) {
      case 'success':
        return <Button type="primary" onClick={() => {

        }}>查看生产计划</Button>;
      case 'error':
        return <></>;
      default:
        return <Button type="primary" onClick={() => {
          if (!value.coding) {
            return notification.warn({
              message: '请输入编码！'
            });
          } else {
            setLoading(true);
            run({
              data: {
                ...value,
                orderDetailParams: checkedSkus
              }
            });
          }
        }}>创建生产计划</Button>;
    }
  };

  const modalBody = () => {
    switch (result) {
      case 'success':
      case 'error':
        return <Result
          status={result}
          title={result === 'success' ? '创建生产计划成功！' : '创建生产计划失败！'}
        />;
      default:
        return <div>
          <ProCard className="h2Card" title="生产计划信息" headerBordered>
            <Descriptions column={2} labelStyle={{width: 80, padding: 4}}>
              <Descriptions.Item
                label="计划编码">
                <Coding module={13} value={value.coding} onChange={(coding) => {
                  onChange({...value, coding});
                }} /></Descriptions.Item>
              <Descriptions.Item
                label="计划主题">
                <Input placeholder="请输入主题" onChange={(string) => {
                  onChange({...value, theme: string.target.value});
                }} />
              </Descriptions.Item>
              <Descriptions.Item
                label="执行时间">
                <DatePicker
                  width="100%"
                  showTime
                  disabledDate={(currentDate) => {
                    return currentDate && currentDate < moment().subtract(1, 'days');
                  }}
                  onChange={(value) => {
                    onChange({...value, executionTime: value});
                  }} />
              </Descriptions.Item>
              <Descriptions.Item
                label="负责人">
                <Select api={UserIdSelect} width="100%" value={value.userId} onChange={(value) => {
                  onChange({...value, userId: value});
                }} />
              </Descriptions.Item>
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
        </div>;
    }
  };

  const module = () => {
    switch (type) {
      case 'order':
        return <OrderList
          searchForm={searchForm}
          setCheckedSkus={setCheckedSkus}
          checkedSkus={checkedSkus}
          refresh={refresh}
        />;
      case 'plan':
        return <PlanList
          searchForm={searchForm}
          setCheckedSkus={setCheckedSkus}
          checkedSkus={checkedSkus}
          refresh={refresh}
        />;
      default:
        return <></>;
    }
  };

  return <>
    <Card title={<Breadcrumb />}>
      <div style={{position:'sticky',top:0,zIndex:999,backgroundColor:'#fff',}}>
        <Tabs
          centered
          activeKey={type}
          destroyInactiveTabPane
          onTabClick={(key) => {
            setType(key);
            setCheckedSkus([]);
          }}
        >
          <Tabs.TabPane tab="订单式生产" key="order" />
          <Tabs.TabPane tab="计划式生产" key="plan" />
        </Tabs>
      </div>

      {module()}
    </Card>

    <Modal ref={ref} width={800} headTitle="创建生产计划" footer={!loading && <Space>
      {footer()}
      <Button onClick={() => {
        ref.current.close();
      }}>取消</Button>
    </Space>}>
      <div style={{padding: 16}}>
        {
          loading ?
            <Spin>
              <Alert
                message="创建中..."
                description="正在创建生产计划，请稍后..."
                type={result || 'info'}
              />
            </Spin>
            :
            modalBody()
        }
      </div>
    </Modal>

    <Affix offsetBottom={0}>
      <div
        style={{
          height: 47,
          borderTop: '1px solid #e7e7e7',
          background: '#fff',
          textAlign: 'right',
          paddingTop: 8,
          paddingRight: 16
        }}>
        <Space>
          <Button
            type="primary"
            disabled={checkedSkus.length === 0}
            onClick={() => {
              setFalse();
              onChange({});
              ref.current.open(true);
              setResult(null);
            }}>创建生产计划</Button>
        </Space>
      </div>
    </Affix>
  </>;
};

export default List;
