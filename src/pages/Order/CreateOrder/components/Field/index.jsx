/**
 * 询价任务字段配置页
 *
 * @author cheng
 * @Date 2022-01-17 09:29:56
 */

import React, {useRef, useState} from 'react';
import {Input, Radio, Spin, Select as AntSelect, Button, Space, message, List} from 'antd';
import parse from 'html-react-parser';
import Coding from '@/pages/Erp/tool/components/Coding';
import DatePicker from '@/components/DatePicker';
import {useRequest} from '@/util/Request';
import Modal from '@/components/Modal';
import {adressIdSelect} from '@/pages/Crm/adress/AdressUrl';
import SetSelectOrCascader from '@/components/SetSelectOrCascader';
import AdressEdit from '@/pages/Crm/adress/AdressEdit';
import TemplateList from '@/pages/Crm/template/TemplateList';
import {templateListSelect} from '@/pages/Crm/template/TemplateUrl';
import Editor from '@/components/Editor';
import AddSkuTable from '@/pages/Order/CreateOrder/components/AddSkuTable';
import CheckSku from '@/pages/Order/CreateOrder/components/CheckSku';
import InputNumber from '@/components/InputNumber';
import AddSpu from '@/pages/Order/CreateOrder/components/AddSpu';


export const AddSku = ({value = [], customerId, onChange, module, ...props}) => {



  const skuTableRef = useRef();

  const addSku = useRef();

  const addSpu = useRef();

  const addSkuRef = useRef();

  const [type, setType] = useState();

  return (<>
    <AddSkuTable
      module={module}
      ref={skuTableRef}
      value={value}
      onChange={onChange}
      onAddSku={(type) => {
        setType(type);
        switch (type) {
          case 'spu':
            addSpu.current.open(true);
            break;
          case 'sku':
            addSku.current.open(true);
            break;
          case 'supplySku':
            if (!customerId) {
              message.warn('请选择供应商！');
              return false;
            }
            addSku.current.open(true);
            break;
          default:
            break;
        }
      }}
    />

    <Modal
      headTitle="添加产品"
      ref={addSpu}
      width={1000}
      footer={<Space>
        <Button type="primary" onClick={() => {
          addSpu.current.close();
        }}>选择</Button>
      </Space>}
    >
      <AddSpu />
    </Modal>

    <Modal
      ref={addSku}
      width={1000}
      footer={<Space>
        <Button onClick={() => {
          onChange(addSkuRef.current.check());
        }}>选中</Button>
        <Button type="primary" onClick={() => {
          onChange(addSkuRef.current.change());
          addSku.current.close();
        }}>选中并关闭</Button>
      </Space>}
    >
      <CheckSku
        {...props}
        type={type}
        value={value}
        ref={addSkuRef}
        customerId={customerId}
      />
    </Modal>
  </>);
};

export const Name = (props) => {
  return (<Input  {...props} />);
};

export const Show = ({value}) => {
  return (<>{value || '无'}</>);
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
  return (<InputNumber min={0} precision={2} {...props} />);
};

export const Index = (props) => {
  return (<></>);
};

export const AdressId = (props) => {
  const {customerId, ...other} = props;
  return (customerId ? <SetSelectOrCascader
    placeholder="请选择交货地址"
    width={200}
    customer={customerId}
    api={adressIdSelect}
    data={{customerId}}
    title="添加其他地址"
    component={AdressEdit} {...other} /> : '请选择甲方公司');
};
export const PayPlan = (props) => {

  const {loading, data, ...other} = props;

  const style = {borderTop: 'dashed 1px #d9d9d9'};

  if (loading) {
    props.onChange(null);
    return <Spin />;
  }

  return (<AntSelect
    {...other}
    placeholder="请选择付款计划"
  >
    {
      data && data.map((item, index) => {
        return <AntSelect.Option key={index} value={item.value}>{item.label}</AntSelect.Option>;
      })
    }
    <AntSelect.Option key={99} value={2} style={style}>按时间分期付款</AntSelect.Option>
    <AntSelect.Option key={98} value={3} style={style}>按动作分期付款</AntSelect.Option>
    <AntSelect.Option key={97} value={4} style={style}>其他模板</AntSelect.Option>
  </AntSelect>);
};

export const PayType = (props) => {
  return (<AntSelect
    style={{width: 120}}
    options={[{
      label: '订单创建后',
      value: 0,
    }, {
      label: '合同签订后',
      value: 1,
    }, {
      label: '订单发货前',
      value: 2,
    }, {
      label: '订单发货后',
      value: 3,
    }, {
      label: '入库后',
      value: 4,
    }]}
    {...props}
  />);
};

export const Percentum = (props) => {
  return (<InputNumber min={1} max={100} addonAfter="%" {...props} />);
};

export const TemplateId = (props) => {
  return (
    <SetSelectOrCascader component={TemplateList} api={templateListSelect} title="添加合同模板" width={200} {...props} />);
};

export const Freight = (props) => {
  return (<Radio.Group {...props}><Radio value={1}>是</Radio><Radio value={0}>否</Radio></Radio.Group>);
};
export const PayMethod = (props) => {
  return (<Input placeholder="请输入 现金/承兑/电汇" {...props} />);
};

export const DateWay = (props) => {
  return (<AntSelect
    options={[{
      label: '天',
      value: 0,
    }, {
      label: '月',
      value: 1,
    }, {
      label: '年',
      value: 2,
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
export const Note = (props) => {
  return (<Editor {...props} />);
};

export const AllField = ({onChange, array}) => {

  const [values, setValues] = useState([]);

  const change = (index, value) => {
    const newString = [];
    for (let i = 0; i < array.length; i++) {
      newString.push(values[i]);
    }
    newString[index] = value;
    if (!newString.includes(undefined)) {
      onChange(newString.map((item, index) => {
        return {
          oldText: array[index],
          newText: item
        };
      }));
    }
    setValues(newString);
  };

  const replaceDom = (string, index) => {
    return parse(string, {
      replace: domNode => {
        if (domNode.name === 'input') {
          switch (domNode.attribs.type) {
            case 'text':
              return <Space>{domNode.attribs['data-title']}<Input
                placeholder="输入文本"
                style={{width: 200, margin: '0 10px'}}
                onChange={(value) => {
                  change(index, value.target.value);
                }}
              /></Space>;
            case 'number':
              return <Space>{domNode.attribs['data-title']}<InputNumber
                placeholder="输入数值"
                style={{width: 200, margin: '0 10px'}}
                onChange={(value) => {
                  change(index, value);
                }}
              /></Space>;
            case 'date':
              return <Space>{domNode.attribs['data-title']}<DatePicker
                showTime
                placeholder="输入时间"
                style={{width: 200, margin: '0 10px'}}
                onChange={(value) => {
                  change(index, value);
                }}
              /></Space>;
            default:
              break;
          }
        }
      }
    });
  };

  if (!Array.isArray(array)) {
    return <></>;
  }

  return (<>
    <List
      size="large"
      bordered
      dataSource={array || []}
      renderItem={(item, index) => <List.Item>{replaceDom(item, index)}</List.Item>}
    />
  </>);
};
