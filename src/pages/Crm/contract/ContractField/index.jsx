/**
 * 机床合同表字段配置页
 *
 * @author
 * @Date 2021-07-20 13:34:41
 */


import React, {useEffect} from 'react';
import {Input, InputNumber, Select as AntSelect} from 'antd';
import parse from 'html-react-parser';
import Select from '@/components/Select';
import * as apiUrl from '@/pages/Crm/contract/ContractUrl';
import DatePicker from '@/components/DatePicker';
import Choose from '@/pages/Crm/contract/components/Choose';
import {contractClassListSelect} from '@/pages/Crm/contract/components/contractClass/contractClassUrl';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import {brandIdSelect} from '@/pages/Erp/stock/StockUrl';
import {customerIdSelect} from '@/pages/Erp/order/OrderUrl';


export const Name = (props) => {
  return (<Input  {...props} />);
};


export const SkuId = (props) => {
  return (<SelectSku  {...props} />);
};


export const Quantity = (props) => {
  return (<InputNumber min={1}  {...props} />);
};

export const SalePrice = (props) => {
  return (<InputNumber min={1}  {...props} />);
};

export const BrandId = (props) => {
  const {skuId, supplySkus = [], ...other} = props;

  const ids = skuId ? supplySkus.filter((item) => {
    return item.skuId === skuId;
  }).map((item) => {
    return item.brandId;
  }) : [];

  return (<Select width={150} api={brandIdSelect} data={{ids}} resh={ids.length}  {...other} />);
};

export const CustomerId = (props) => {
  return (<Select api={customerIdSelect} data={{supply: 1}}  {...props} />);
};

export const Note = (props) => {
  return (<Input  {...props} />);
};

export const MoneyName = (props) => {
  return (<Input  {...props} />);
};
export const ContractClassId = (props) => {
  return (<Select disabled api={contractClassListSelect} {...props} />);
};

export const Time = (props) => {
  return (<DatePicker  {...props} />);
};
export const Audit = (props) => {
  props.onChange(props.value || 0);
  return (<AntSelect
    disabled
    defaultValue={[0]}
    allowClear
    options={[{label: '不合格', value: 0}, {label: '合格', value: 1}]}    {...props} />);
};

export const CustomerNameListSelect = (props) => {
  return (<Select api={apiUrl.CustomerNameListSelect} {...props} />);
};

export const Template = (props) => {

  return (<>
    <Select width="100%" api={apiUrl.templateSelect} {...props} />
  </>);
};

export const Money = (props) => {

  return <InputNumber min={0} precision={2} {...props} />;
};


export const AllMoney = (props) => {

  return <InputNumber min={0} style={{width: 200}} precision={0} {...props} />;
};


export const Percent = (props) => {

  return <><InputNumber precision={2} min={0} max={100} {...props} />&nbsp;&nbsp;%</>;
};

export const ContentUpdate = (props) => {


  return (
    <>
      {
        parse(props.value)
      }
    </>
  );
};


export const Content = (props) => {

  const {result} = props;

  const replaceDom = (domNode, value, type) => {
    const pattern = /<input (.*?)\/>/g;
    let newDom = '';
    switch (type) {
      case 'dom':
        newDom = `<${domNode.name} class="${domNode.attribs.class}" key="${domNode.attribs.key}" placeholder="${value || ''}"/>`;
        break;
      case 'string':
        newDom = value || '';
        break;
      default:
        break;
    }
    if (props.value.match(pattern)) {
      const oldDom = props.value.match(pattern).filter((value) => {
        return value.indexOf(`class="${domNode.attribs.class}"`) !== -1
          &&
          value.indexOf(`key="${domNode.attribs.key}"`) !== -1
          &&
          value.indexOf(`placeholder="${domNode.attribs.placeholder}"`) !== -1;
      });
      if (oldDom.length > 0)
        props.onChange(props.value.replace(oldDom[0], newDom));
    }
  };


  const replaceHtml = (domNode) => {
    switch (domNode.attribs && domNode.attribs.class) {
      case 'inp':
        return <Input
          value={domNode.attribs.placeholder !== '文本框' ? domNode.attribs.placeholder : null}
          placeholder="输入文本"
          style={{width: '100px', margin: '0 10px'}}
          onChange={(value) => {
            replaceDom(domNode, value.target.value, 'dom');
          }}
        />;
      case 'number':
        return <InputNumber
          placeholder="输入数字"
          value={domNode.attribs.placeholder !== '数字框' ? domNode.attribs.placeholder : null}
          min={0}
          style={{margin: '0 10px'}}
          onChange={(value) => {
            replaceDom(domNode, value, 'dom');
          }}
        />;
      case 'date':
        return <DatePicker
          placeholder="选择时间"
          value={domNode.attribs.placeholder !== '时间框' ? domNode.attribs.placeholder : null}
          style={{margin: '0 10px'}}
          onChange={(value) => {
            replaceDom(domNode, value, 'dom');
          }} />;
      case 'customer':
        return <Choose
          type="customer"
          value={domNode.attribs.placeholder !== '客户' ? domNode.attribs.placeholder : null}
          onChange={(value) => {
            replaceDom(domNode, value, 'dom');
          }} />;
      default:
        break;
    }
  };

  // eslint-disable-next-line no-template-curly-in-string
  const string = props.value.replace('${{Acontacts}}', result.partyAContacts ? result.partyAContacts.contactsName : '').replace('${{Bcontacts}}', result.partyBContacts ? result.partyBContacts.contactsName : '').replace('${{AAddress}}', result.partyAAdress ? result.partyAAdress.location : '').replace('${{BAddress}}', result.partyBAdress ? result.partyBAdress.location : '').replace('${{APhone}}', result.phoneA ? result.phoneA.phoneNumber : '').replace('${{BPhone}}', result.phoneB ? result.phoneB.phoneNumber : '').replace('${{ACustomer}}', result.partA ? result.partA.customerName : '').replace('${{BCustomer}}', result.partB ? result.partB.customerName : '');

  useEffect(() => {
    props.onChange(string);
  }, []);

  return (
    <>
      {
        parse(string, {
          replace: domNode => {
            if (domNode.name === 'input')
              return replaceHtml(domNode);
          }
        })
      }
    </>
  );
};

export const SeeContent = (props) => {
  return null;
};




