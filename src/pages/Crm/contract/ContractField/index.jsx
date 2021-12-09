/**
 * 机床合同表字段配置页
 *
 * @author
 * @Date 2021-07-20 13:34:41
 */


import React, {useEffect, useRef, useState} from 'react';
import {Button, Input, InputNumber, Select as AntSelect, Space} from 'antd';
import parse, {attributesToProps} from 'html-react-parser';
import Select from '@/components/Select';
import * as apiUrl from '@/pages/Crm/contract/ContractUrl';
import CustomerTable from '@/pages/Crm/customer/components/CustomerTable';
import DatePicker from '@/components/DatePicker';
import ItemsList from '@/pages/Erp/items/ItemsList';
import ErpPackageList from '@/pages/Erp/package/packageList';
import SelectCustomer from '@/pages/Crm/customer/components/SelectCustomer';
import TableDetail from '@/pages/Crm/contract/ContractEdit/components/TableDetail';
import {PlusOutlined} from '@ant-design/icons';
import Modal from '@/components/Modal';
import ContactsEdit from '@/pages/Crm/contacts/ContactsEdit';
import Drawer from '@/components/Drawer';
import AdressEdit from '@/pages/Crm/adress/AdressEdit';
import PhoneEdit from '@/pages/Crm/phone/phoneEdit';
import {customerIdSelect} from '@/pages/Erp/order/OrderUrl';
import {useRequest} from '@/util/Request';
import Choose from '@/pages/Crm/contract/components/Choose';

export const CustomerId = (props) => {
  const {customers, refresh, width, ...other} = props;

  useEffect(() => {
    customers(other.value);
  }, []);

  return (<Select disabled width={width} api={apiUrl.CustomerNameListSelect} {...other} />);
};

export const Customer = (props) => {

  const {customers, width, refresh, style, onChange, ...other} = props;

  useEffect(() => {
    if (!other.value) {
      onChange(undefined);
    }
  }, []);

  return (<>
    <SelectCustomer width={width} {...other} onChange={(value) => {
      onChange(value && value.customerId);
      customers(value && value.customerId);
      refresh();
    }} />
  </>);
};

export const Contacts = (props) => {

  const ref = useRef(null);
  const submitRef = useRef(null);

  const {customers, customerId, width, refresh, contact, onChange, ...other} = props;

  const data = customers ? customers.map((value) => {
    return {
      label: value.contactsName,
      value: value.contactsId,
    };
  }) : [];


  useEffect(() => {
    if (data.length > 0) {
      onChange(data[0].value);
    } else {
      onChange(undefined);
    }
    contact ? contact(data.length > 0 && data[0].value) : null;
  }, [customers || null]);


  return (<Space>
    <AntSelect
      showSearch
      style={{width}}
      filterOption={(input, option) => {
        option.label + ''.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
      options={data}
      {...other}
      onChange={(value) => {
        onChange(value);
        contact ? contact(value) : null;
      }} />
    <Button type="link" icon={<PlusOutlined />} style={{margin: 0}} onClick={() => {
      ref.current.open(false);
    }} />
    <Modal
      width={1000}
      title="联系人"
      component={ContactsEdit}
      customerId={customerId}
      onSuccess={(value) => {
        refresh && typeof refresh === 'function' && refresh();
        ref.current.close();
      }} ref={ref}
      compoentRef={submitRef}
      footer={
        <>
          <Button type="primary" onClick={() => {
            submitRef.current.formRef.current.submit();
          }}>
            保存
          </Button>
          <Button onClick={() => {
            ref.current.close();
          }}>
            取消
          </Button>
        </>}
    />
  </Space>);
};
export const Phone = (props) => {
  const {contacts, refresh, width, contactsId, onChange, ...other} = props;

  const ref = useRef(null);

  const data = contacts ? contacts.map((value) => {
    return {
      label: value.phoneNumber,
      value: value.phoneId,
    };
  }) : [];

  useEffect(() => {
    onChange(data.length > 0 ? data[0].value : undefined);
  }, [contacts || null]);

  return (<Space>
    <AntSelect
      style={{width}}
      options={data}
      showSearch
      filterOption={(input, option) => {
        option.label + ''.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
      {...other}
      onChange={(value) => {
        onChange(value);
      }} />
    <Button type="link" icon={<PlusOutlined />} style={{margin: 0}} onClick={() => {
      ref.current.open(false);
    }} />
    <Modal title="电话" component={PhoneEdit} contactsId={contactsId} ref={ref} onSuccess={() => {
      ref.current.close();
      refresh();
    }} />
  </Space>);
};
export const Adress = (props) => {
  const {customers, refresh, width, customerId, ...other} = props;

  const ref = useRef(null);

  const data = customers ? customers.map((value) => {
    return {
      label: value.location,
      value: value.adressId,
    };
  }) : [];


  useEffect(() => {
    if (data.length > 0) {
      props.onChange(data[0].value);
    } else {
      props.onChange();
    }
  }, [customers || null]);

  return (<Space>
    <AntSelect
      style={{width}}
      showSearch
      filterOption={(input, option) => {
        option.label + ''.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
      options={data}
      {...other} />

    <Button type="link" icon={<PlusOutlined />} style={{margin: 0}} onClick={() => {
      ref.current.open(false);
    }} />
    <Drawer width={800} title="编辑" component={AdressEdit} customer={customerId} onSuccess={() => {
      refresh();
      ref.current.close();
    }} ref={ref} />
  </Space>);
};


export const Name = (props) => {
  return (<Input  {...props} />);
};


export const Note = (props) => {
  return (<Input  {...props} />);
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

  console.log(props.value);

  const replaceDom = (domNode, value) => {
    const oldDom = `<${domNode.name} class="${domNode.attribs.class}" key="${domNode.attribs.key}">${domNode.children[0] && domNode.children[0].data}</${domNode.name}>`;
    const newDom = `<${domNode.name} class="${domNode.attribs.class}" key="${domNode.attribs.key}">${value || ' '}</${domNode.name}>`;
    if (props.value.indexOf(oldDom) !== -1) {
      props.onChange(props.value.replace(oldDom, newDom));
    }
  };

  const replaceHtml = (domNode) => {
    if (domNode.attribs && domNode.children[0].type === 'text')
      switch (domNode.attribs.class) {
        case 'inp':
          return <Input
            value={domNode.children[0].data !== '文本框' ? domNode.children[0].data : null}
            placeholder="输入文本"
            style={{width: '100px', margin: '0 10px'}}
            onChange={(value) => {
              replaceDom(domNode, value.target.value);
            }}
          />;
        case 'number':
          return <InputNumber
            placeholder="输入数字"
            value={domNode.children[0].data !== '数字框' ? domNode.children[0].data : null}
            min={0}
            style={{margin: '0 10px'}}
            onChange={(value) => {
              replaceDom(domNode, value);
            }}
          />;
        case 'date':
          return <DatePicker
            placeholder="选择时间"
            value={domNode.children[0].data.indexOf('时间框') === -1 ? domNode.children[0].data : new Date()}
            style={{margin: '0 10px'}}
            onChange={(value, date) => {
              replaceDom(domNode, value);
            }} />;
        case 'customer':
          return <Choose
            type="customer"
            value={domNode.children[0].data !== '客户' ? domNode.children[0].data : null}
            onChange={(value) => {
              replaceDom(domNode, value);
            }} />;
        case 'Acontacts':
          if (domNode.children[0].data === '甲方联系人')
            return replaceDom(domNode, result.partyAContacts ? result.partyAContacts.contactsName : ' ');
          else return null;
        case 'Bcontacts':
          if (domNode.children[0].data === '已方联系人')
            return replaceDom(domNode, result.partyBContacts ? result.partyBContacts.contactsName : ' ');
          else return null;
        case 'AAddress':
          if (domNode.children[0].data === '甲方地址')
            return replaceDom(domNode, result.partyAAdress ? result.partyAAdress.location : ' ');
          else return null;
        case 'BAddress':
          if (domNode.children[0].data === '乙方地址')
            return replaceDom(domNode, result.partyBAdress ? result.partyBAdress.location : ' ');
          else return null;
        case 'APhone':
          if (domNode.children[0].data === '甲方电话')
            return replaceDom(domNode, result.phoneA ? result.phoneA.phoneNumber : ' ');
          else return null;
        case 'BPhone':
          if (domNode.children[0].data === '乙方电话')
            return replaceDom(domNode, result.phoneB ? result.phoneB.phoneNumber : ' ');
          else return null;
        case 'ACustomer':
          if (domNode.children[0].data === '甲方客户')
            return replaceDom(domNode, result.partA ? result.partA.customerName : ' ');
          else return null;
        case 'BCustomer':
          if (domNode.children[0].data === '乙方客户')
            return replaceDom(domNode, result.partB ? result.partB.customerName : ' ');
          else return null;
        default:
          break;
      }
  };


  return (
    <>
      {
        parse(props.value, {
          replace: domNode => {
            if (domNode.name === 'strong') {
              return replaceHtml(domNode);
            }
          }
        })
      }
    </>
  );
};

export const SeeContent = (props) => {
  return (
    parse(props.value)
  );
};




