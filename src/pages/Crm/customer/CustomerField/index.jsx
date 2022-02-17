/**
 * 客户管理表字段配置页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useEffect, useRef, useState} from 'react';
import {Input, InputNumber, Select as AntdSelect, Radio, AutoComplete, Spin, Space, Modal, Button, Tag} from 'antd';
import moment from 'moment';
import ProCard from '@ant-design/pro-card';
import Select from '@/components/Select';
import * as apiUrl from '@/pages/Crm/customer/CustomerUrl';
import {useRequest} from '@/util/Request';
import DatePicker from '@/components/DatePicker';
import {CustomerLevelIdSelect} from '@/pages/Crm/customer/CustomerUrl';
import Cascader from '@/components/Cascader';
import OriginSelect from '@/pages/Crm/customer/components/OriginSelect';
import AdressMap from '@/pages/Crm/customer/components/AdressMap';
import FileUpload from '@/components/FileUpload';
import AddSkuTable from '@/pages/Crm/customer/components/AddSkuTable';
import CheckSku from '@/pages/Erp/sku/components/CheckSku';

export const ContactsName = (props) => {

  const {value, onChange} = props;

  const {loading, data, run} = useRequest({url: '/contacts/list?limit=5&page=1', method: 'POST'}, {
    debounceInterval: 300,
  });

  const options = (!loading && data) ? data.map((value) => {
    return {
      title: value.contactsName,
      value: value.contactsId,
      label: <>
        {value.contactsName}
        <div style={{float: 'right'}}>
          <Tag
            color="blue"
            style={{marginRight: 3}}
          >
            {value.phoneParams ? value.phoneParams[0] && value.phoneParams[0].phoneNumber : ''}
          </Tag>
        </div>
      </>
    };
  }) : [];

  return <>
    <AutoComplete
      dropdownMatchSelectWidth={100}
      notFoundContent={loading && <Spin />}
      options={options}
      value={typeof value === 'object' && value.name}
      onSelect={(value, option) => {
        onChange({id: value, name: option.title});
      }}
    >
      <Input
        placeholder="请输入联系人名称"
        onChange={(value) => {
          onChange({name: value.target.value});
          run({
            data: {
              contactsName: value.target.value,
            }
          });
        }}
      />
    </AutoComplete>
  </>;
};

export const Location = (props) => {
  return (<Input  {...props} />);
};
export const Longitude = (props) => {
  const {location} = props;
  if (location) {
    props.onChange(location.length > 0 && location[0] && location[0][0]);
  }
  return (<InputNumber min={0} disabled  {...props} />);
};
export const Map = (props) => {
  return (<AdressMap {...props} />);
};
export const PhoneNumber = (props) => {
  return (<Input style={{width: '100%'}}  {...props} />);
};

export const key = (props) => {
  return <Input {...props} />;
};
export const value = (props) => {
  return <Input {...props} />;
};

export const File = (props) => {
  return <FileUpload {...props} />;
};

export const Name = (props) => {
  return (<Input {...props} />);
};
export const Abbreviation = (props) => {
  return (<Input {...props} />);
};
export const Region = (props) => {
  return (<Cascader {...props} />);
};

export const CompanyRoleId = (props) => {
  return (<Select width="100%" api={apiUrl.CompanyRoleIdSelect} {...props} />);
};

export const AddSku = ({onChange}) => {

  const skuTableRef = useRef();

  const [visible, setVisible] = useState();

  return (<>
    <ProCard
      style={{marginTop: 24}}
      bodyStyle={{padding: 16}}
      className="h2Card"
      title="供应物料"
      headerBordered
      extra={<Button onClick={() => {
        setVisible(true);
      }}>添加物料</Button>}
    >

      <AddSkuTable
        ref={skuTableRef}
        onChange={onChange}
      />
    </ProCard>

    <Modal
      visible={visible}
      width={800}
      centered
      bodyStyle={{padding: 0}}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}>
      <CheckSku onChange={(value) => {
        skuTableRef.current.addDataSource(value);
        setVisible(false);
      }} />
    </Modal>
  </>);
};


export const CustomerName = (props) => {

  const {value, onChange, supply, onSuccess} = props;

  const {loading, data, run} = useRequest({url: '/customer/list?limit=5&page=1', method: 'POST'}, {
    debounceInterval: 300,
  });

  const options = (!loading && data) ? data.map((value) => {
    return {
      disabled: true,
      value: value.customerName,
      label: <div
        style={{
          color: '#000',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        {value.customerName}
        <a
          onClick={() => {
            onSuccess(value.customerId);
          }}>查看详情</a>
      </div>,
    };
  }) : [];


  return <>
    <AutoComplete
      dropdownMatchSelectWidth={100}
      notFoundContent={loading && <Spin />}
      options={[{
        label: '已存在供应商',
        options
      }]}
      placeholder={supply ? '请输入供应商名称' : '请输入客户名称'}
      value={value}
      onSelect={() => {

      }}
    >
      <Input
        onChange={(value) => {
          onChange(value);
          run({
            data: {
              customerName: value.target.value,
              supply
            }
          });
        }}
      />
    </AutoComplete>
  </>;

};

export const ContactsId = (props) => {
  return (<InputNumber min={0}  {...props} />);
};

export const Setup = (props) => {
  return (<DatePicker disabledDate={(current) => {
    return current && current > moment().endOf('day');
  }}  {...props} />);
};
export const Legal = (props) => {
  return (<Input {...props} />);
};

export const Money = (props) => {
  return (<Space><InputNumber min={0} {...props} />万元</Space>);
};
export const Utscc = (props) => {
  return (<Input {...props} />);
};
export const CompanyType = (props) => {
  return (<AntdSelect
    showSearch
    style={{maxWidth: 200}}
    allowClear
    filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    options={[{value: '有限责任公司（自然人独资）', label: '有限责任公司（自然人独资）'}, {value: '股份有限公司', label: '股份有限公司'}, {
      value: '有限合伙企业',
      label: '有限合伙企业'
    }, {value: '外商独资企业', label: '外商独资企业'}, {value: '个人独资企业', label: '个人独资企业'}, {
      value: '国有独资公司',
      label: '国有独资公司'
    }, {value: '其他类型', label: '其他类型'}]} {...props} />);
};
export const BusinessTerm = (props) => {
  return (<DatePicker disabledDate={(current) => {
    return current && current < moment().endOf('day');
  }} {...props} />);
};
export const SignIn = (props) => {
  return (<Input  {...props} />);
};
export const Introduction = (props) => {
  return (<Input.TextArea style={{width: '100%'}} showCount maxLength={100} {...props} />);
};

export const DeptId = (props) => {
  return (<Input   {...props} />);
};

export const client = (props) => {
  return (<Input   {...props} />);
};

export const Job = (props) => {
  return (<Input  {...props} />);
};

export const Dept = (props) => {
  return (<Input   {...props} />);
};

export const Client = (props) => {
  return (<Select api={apiUrl.customerIdSelect} {...props} />);
};

export const Status = (props) => {
  return (
    <Radio.Group {...props} defaultValue={0}>
      <Radio value={0}>潜在客户</Radio>
      <Radio value={1}>正式客户</Radio>
    </Radio.Group>
  );
};

export const Classification = (props) => {
  return (
    <Radio.Group {...props} defaultValue={0}>
      <Radio value={0}>代理商</Radio>
      <Radio value={1}>终端用户</Radio>
    </Radio.Group>
  );
};
export const Supply = (props) => {
  return (
    <Radio.Group {...props} defaultValue={0}>
      <Radio value={0}>否</Radio>
      <Radio value={1}>是</Radio>
    </Radio.Group>
  );
};

export const Note = (props) => {
  return (<Input.TextArea style={{width: '100%'}} showCount maxLength={100} rows={1}  {...props} />);
};

export const RowsNote = (props) => {
  return (<Input.TextArea style={{width: '100%'}} showCount maxLength={100} rows={2}  {...props} />);
};

export const CustomerLevelId = (props) => {
  const {loading, data} = useRequest(CustomerLevelIdSelect);

  useEffect(() => {
    if (data && data[data.length - 1]) {
      props.onChange(data && data[data.length - 1].value);
    }
  }, [data]);

  if (loading) {
    return <Spin />;
  }

  return (<AntdSelect options={data} {...props} />);
};

export const OriginId = (props) => {
  return (<OriginSelect width={120}  {...props} />);
};

export const UserName = (props) => {
  return (<Select width="100%" api={apiUrl.UserIdSelect}  {...props} />);
};

export const Emall = (props) => {
  return (<Input   {...props} />);
};

export const Url = (props) => {
  return (<Input   {...props} />);
};


export const IndustryOne = (props) => {
  return (<Cascader api={apiUrl.crmIndustryTreeView}  {...props} />);
};


