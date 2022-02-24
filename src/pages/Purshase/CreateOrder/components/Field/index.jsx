/**
 * 询价任务字段配置页
 *
 * @author cheng
 * @Date 2022-01-17 09:29:56
 */

import React, {useRef} from 'react';
import {Input, Radio, Spin, Select as AntSelect, Button, Space, InputNumber} from 'antd';
import ProCard from '@ant-design/pro-card';
import Coding from '@/pages/Erp/tool/components/Coding';
import DatePicker from '@/components/DatePicker';
import {useRequest} from '@/util/Request';
import AddSkuTable from '@/pages/Purshase/purchaseAsk/components/AddSkuTable';
import Modal from '@/components/Modal';
import CheckSku from '@/pages/Erp/sku/components/CheckSku';
import {adressIdSelect} from '@/pages/Crm/adress/AdressUrl';
import SetSelectOrCascader from '@/components/SetSelectOrCascader';
import AdressEdit from '@/pages/Crm/adress/AdressEdit';
import TemplateList from '@/pages/Crm/template/TemplateList';
import {templateListSelect} from '@/pages/Crm/template/TemplateUrl';


export const AddSku = ({value, onChange}) => {

  const skuTableRef = useRef();

  const ref = useRef();

  const addSkuRef = useRef();

  return (<>
    <ProCard
      style={{marginTop: 24}}
      bodyStyle={{padding: 16}}
      className="h2Card"
      title="采购申请明细"
      headerBordered
      extra={<Button onClick={() => {
        ref.current.open(true);
      }}>添加物料</Button>}
    >

      <AddSkuTable
        ref={skuTableRef}
        value={value}
        onChange={onChange}
      />
    </ProCard>

    <Modal
      ref={ref}
      width={1000}
      footer={<Space>
        <Button onClick={() => {
          addSkuRef.current.check();
        }}>选中</Button>
        <Button type="primary" onClick={() => {
          addSkuRef.current.change();
        }}>选中并关闭</Button>
      </Space>}
    >
      <CheckSku
        value={value}
        ref={addSkuRef}
        onCheck={(value) => {
          skuTableRef.current.addDataSource(value);
        }}
        onChange={(value) => {
          skuTableRef.current.addDataSource(value);
          ref.current.close();
        }}
      />
    </Modal>
  </>);
};

export const Name = (props) => {
  return (<Input  {...props} />);
};

export const Codings = (props) => {
  return (<Coding  {...props} />);
};

export const Date = (props) => {
  return (<DatePicker {...props} />);
};


export const PayTime = (props) => {
  return (<DatePicker showTime {...props} />);
};


export const Remark = (props) => {
  return (<Input.TextArea rows={4} placeholder="请输入采购单备注" {...props} />);
};

export const Currency = (props) => {
  const {loading, data} = useRequest({
    url: '/Enum/money',
    method: 'GET'
  });

  if (loading) {
    return <Spin />;
  }
  const options = data ? data.map((item) => {
    return {
      label: item.name,
      value: item.name,
    };
  }) : [];

  return (<AntSelect style={{width: 100}} defaultValue="人民币" options={options} {...props} />);
};

export const Money = (props) => {
  return (<InputNumber min={1} precision={2} {...props} />);
};

export const Index = (props) => {
  return (<></>);
};

export const Percentum = (props) => {
  return (<InputNumber min={1} max={100} addonAfter="%" {...props} />);
};

export const TemplateId = (props) => {
  return (<SetSelectOrCascader component={TemplateList} api={templateListSelect} title='添加合同模板' width={200} {...props} />);
};

export const Freight = (props) => {
  return (<Radio.Group {...props}><Radio value='是'>是</Radio><Radio value='否'>否</Radio></Radio.Group>);
};
export const PayMethod = (props) => {
  return (<Input placeholder="请输入 现金/承兑/电汇" {...props} />);
};
export const AdressId = (props) => {
  return (<SetSelectOrCascader
    placeholder="请选择交货地址"
    width={200}
    api={adressIdSelect}
    title="添加其他地址"
    component={AdressEdit} {...props} />);
};
export const PayPlan = (props) => {

  const style = {borderTop: 'dashed 1px #d9d9d9'};

  return (<AntSelect
    placeholder='请选择付款计划'
    {...props}
  >
    <AntSelect.Option value={101}>模板1</AntSelect.Option>
    <AntSelect.Option value={102}>模板2</AntSelect.Option>
    <AntSelect.Option value={2} style={style}>按时间分期付款</AntSelect.Option>
    <AntSelect.Option value={3} style={style}>按动作分期付款</AntSelect.Option>
    <AntSelect.Option value={4} style={style}>其他模板</AntSelect.Option>
  </AntSelect>);
};
export const PayType = (props) => {
  return (<AntSelect
    style={{width:120}}
    options={[{
      label: '订单创建后',
      value: '0',
    }, {
      label: '合同签订后',
      value: '1',
    }, {
      label: '订单发货前',
      value: '2',
    }, {
      label: '订单发货后',
      value: '3',
    }, {
      label: '入库后',
      value: '4',
    }]}
    {...props}
  />);
};

export const DateWay = (props) => {
  return (<AntSelect
    options={[{
      label: '天',
      value: '天',
    }, {
      label: '月',
      value: '月',
    }, {
      label: '年',
      value: '年',
    }]}
    {...props}
  />);
};

export const dateNumber = (props) => {
  return (<InputNumber min={1} {...props} />);
};

export const DeliveryWay = (props) => {
  return (<Input placeholder="请输入交货方式" {...props} />);
};
export const UpdateUser = (props) => {
  return (<Input {...props} />);
};
export const Display = (props) => {
  return (<Input {...props} />);
};
export const DeptId = (props) => {
  return (<Input {...props} />);
};
