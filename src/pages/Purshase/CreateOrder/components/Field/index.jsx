/**
 * 询价任务字段配置页
 *
 * @author cheng
 * @Date 2022-01-17 09:29:56
 */

import React, {useRef, useState} from 'react';
import {Input, Radio, Spin, Select as AntSelect, Button, Space, InputNumber, message, List} from 'antd';
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
import AddSkuTable from '@/pages/Purshase/CreateOrder/components/AddSkuTable';
import CheckSku from '@/pages/Purshase/CreateOrder/components/CheckSku';


export const AddSku = ({value, customerId, onChange}) => {

  const skuTableRef = useRef();

  const ref = useRef();

  const addSkuRef = useRef();

  const [type, setType] = useState();

  return (<>
    <AddSkuTable
      ref={skuTableRef}
      value={value}
      onChange={onChange}
      onAddSku={(type) => {
        setType(type);
        if (type === 'supplySku' && !customerId) {
          message.warn('请选择供应商！');
          return false;
        }
        ref.current.open(true);
      }}
    />

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
        type={type}
        value={value}
        ref={addSkuRef}
        customerId={customerId}
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
  return (<InputNumber min={1} precision={2} {...props} />);
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

export const AllField = ({value, onChange, array}) => {

  const [values, setValues] = useState([]);

  const replaceString = (stringArray, index, valueArray, valueIndex, lineIndex) => {
    if (stringArray[index].indexOf('<input class="inp" placeholder="文本框" disabled=""/>') !== -1) {
      let string = '';
      try {
        string = valueArray[valueIndex][lineIndex];
      } catch (e) {
        string = '';
      }
      stringArray[index] = stringArray[index].replace('<input class="inp" placeholder="文本框" disabled=""/>', string);
      return replaceString(stringArray, index, valueArray, valueIndex, lineIndex + 1);
    } else if (stringArray[index].indexOf('<input class="number" placeholder="数字框" disabled=""/>') !== -1) {
      let string = '';
      try {
        string = valueArray[valueIndex][lineIndex];
      } catch (e) {
        string = '';
      }
      stringArray[index] = stringArray[index].replace('<input class="number" placeholder="数字框" disabled=""/>', string);
      return replaceString(stringArray, index, valueArray, valueIndex, lineIndex + 1);
    } else if (stringArray[index].indexOf('<input class="date" placeholder="时间框" disabled=""/>') !== -1) {
      let string = '';
      try {
        string = valueArray[valueIndex][lineIndex];
      } catch (e) {
        string = '';
      }
      stringArray[index] = stringArray[index].replace('<input class="date" placeholder="时间框" disabled=""/>', string);
      return replaceString(stringArray, index, valueArray, valueIndex, lineIndex + 1);
    } else if (stringArray[index + 1]) {
      return replaceString(stringArray, index + 1, valueArray, valueIndex + 1, 0);
    } else {
      return stringArray;
    }
  };

  const change = (i, j, index, value) => {

    const allValues = [];

    for (let k = 0; k < array.length; k++) {
      allValues.push(values[k]);
    }

    allValues[index] = [];

    for (let k = 0; k < i; k++) {
      try {
        allValues[index].push(values[index][k]);
      } catch (e) {
        allValues[index].push(null);
      }
    }
    allValues[index][j] = value;

    const arr = array.filter(() => true);

    const allString = replaceString(arr, 0, allValues, 0, 0);

    const newTexts = allString.map((item, index) => {
      return {
        oldText: array[index],
        newText: item
      };
    });

    onChange(newTexts);

    setValues(allValues);
  };

  const replaceDom = (string, index) => {
    let i = 0;
    return parse(string, {
      replace: domNode => {
        if (domNode.name === 'input') {
          switch (domNode.attribs.class) {
            case 'inp':
              const inp = i;
              i++;
              return <Input
                placeholder="输入文本"
                style={{width: 200, margin: '0 10px'}}
                onChange={(value) => {
                  change(i, inp, index, value.target.value);
                }}
              />;
            case 'number':
              const number = i;
              i++;
              return <InputNumber
                placeholder="输入数值"
                style={{width: 200, margin: '0 10px'}}
                onChange={(value) => {
                  change(i, number, index, value);
                }}
              />;
            case 'date':
              const date = i;
              i++;
              return <DatePicker
                showTime
                placeholder="输入时间"
                style={{width: 200, margin: '0 10px'}}
                onChange={(value) => {
                  change(i, date, index, value);
                }}
              />;
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
