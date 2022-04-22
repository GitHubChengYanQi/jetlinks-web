/**
 * 出库单字段配置页
 *
 * @author cheng
 * @Date 2021-08-16 10:51:46
 */

import React, {useEffect, useRef, useState} from 'react';
import {Button, Input, InputNumber, Select as AntSelect, Space, Spin} from 'antd';
import ProCard from '@ant-design/pro-card';
import {useBoolean} from 'ahooks';
import DatePicker from '@/components/DatePicker';
import Select from '@/components/Select';
import {storeHouseSelect} from '@/pages/Erp/outstock/OutstockUrl';
import * as apiUrl from '@/pages/Erp/outstockApply/outstockApplyUrl';
import SelectCustomer from '@/pages/Crm/customer/components/SelectCustomer';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import Coding from '@/pages/Erp/tool/components/Coding';
import {useRequest} from '@/util/Request';
import {stockList} from '@/pages/Erp/stock/StockUrl';
import {unitListSelect} from '@/pages/Erp/spu/spuUrl';
import Modal from '@/components/Modal';
import CheckSku from '@/pages/Erp/sku/components/CheckSku';
import AddSkuTable from '@/pages/Erp/outstock/components/AddSkuTable';

export const AddSku = ({
  value = [],
  onChange,
  loading,
  cardExtra,
}) => {

  const ref = useRef();

  const addSkuRef = useRef();

  return (<>
    <ProCard
      style={{marginTop: 24}}
      bodyStyle={{padding: 16}}
      className="h2Card"
      title="出库物料"
      headerBordered
      extra={<Space>
        {cardExtra}
        <Button onClick={() => {
          ref.current.open(true);
        }}>添加出库物料</Button>
      </Space>}
    >

      {
        loading
          ?
          <div style={{textAlign: 'center'}}>
            <Spin />
          </div>
          :
          <AddSkuTable
            value={value}
            onChange={onChange}
          />
      }
    </ProCard>

    <Modal
      ref={ref}
      headTitle="添加物料"
      width={1000}
      footer={<Space>
        <Button onClick={() => {
          const res = addSkuRef.current.check();
          onChange(res);
        }}>选中</Button>
        <Button type="primary" onClick={() => {
          const res = addSkuRef.current.change();
          onChange(res);
          ref.current.close();
        }}>选中并关闭</Button>
      </Space>}
    >
      <CheckSku
        noCreate
        value={value}
        ref={addSkuRef}
      />
    </Modal>
  </>);
};

export const Bom = (props) => {
  return <>
    <SelectSku noAdd {...props} />
  </>;
};

export const State = (props) => {
  props.onChange(1);
  return (<Input {...props} />);
};
export const Time = (props) => {
  return (<DatePicker {...props} />);
};
export const Storhouse = (props) => {
  return (<Select api={storeHouseSelect} {...props} />);
};
export const ApplyState = (props) => {
  return (<Input {...props} />);
};
export const BrandId = (props) => {
  return (<Select width={150} api={apiUrl.Brands} {...props} />);
};
export const ItemId = (props) => {
  return (<Select width={150} api={apiUrl.Items} {...props} />);
};
export const UserId = (props) => {
  return (<Select width="100%" api={apiUrl.UserIdSelect} placeholder="请选择负责人" {...props} />);
};
export const Note = (props) => {
  return (<Input.TextArea style={{width: '100%'}} placeholder="请输入出库备注..." {...props} />);
};

export const Unit = (props) => {
  return (<Select border={false} api={unitListSelect} disabled showArrow={false} width={60} {...props} />);
};

export const Number = (props) => {

  const {storehouseId, skuId, brandId, ...other} = props;

  const [number, setNumber] = useState();

  if (props.value === 0) {
    props.onChange(null);
  }

  const {run} = useRequest(stockList, {
    manual: true,
    onSuccess: (res) => {
      if (res && res.length > 0 && res[0].inventory) {
        setNumber(res[0].inventory);
      } else {
        props.onChange(null);
        setNumber(0);
        // message.error('仓库没有此物料!');
      }
    }
  });

  useEffect(() => {
    if (storehouseId && skuId && brandId) {
      run({
        data: {
          storehouseId,
          skuId,
          brandId
        }
      });
    }
  }, [storehouseId, skuId, brandId]);

  return (<InputNumber
    min={0}
    max={number || 0}
    placeholder={number !== undefined ? `库存${number}` : ''}
    style={{width: '100%'}} {...other} />);
};


export const SkuId = (props) => {
  const {skuIds, ...other} = props;
  useEffect(() => {
    if (props.value) {
      props.onChange(null);
    }
  }, [skuIds]);
  return (<SelectSku {...other} params={{skuIds}} dropdownMatchSelectWidth={400} />);
};

export const Codings = (props) => {

  const {codingId, ...other} = props;

  return (<Coding codingId={codingId && codingId.length > 0 && codingId[0].codingRulesId} {...other} />);
};


export const Customer = (props) => {
  const {customerid, onChange} = props;
  return (<>
    <SelectCustomer {...props} onChange={(value) => {
      onChange(value);
      customerid(value);
    }} />
  </>);
};

export const Contacts = (props) => {
  const {customerid, contactsid, onChange, state} = props;

  if (state) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      props.onChange(null);
    }, [customerid || null]);
  }

  const data = customerid ? customerid.map((value, index) => {
    return {
      label: value.contactsName,
      value: value.contactsId,
    };
  }) : null;


  return (<>
    <AntSelect style={{width: 200}} options={data}  {...props} onChange={(value) => {
      onChange(value);
      contactsid ? contactsid(value) : null;
    }} showSearch filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} />
  </>);
};
export const Phone = (props) => {
  const {contactsid, state} = props;
  if (state) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      props.onChange(null);
    }, [contactsid || null]);
  }
  const data = contactsid ? contactsid.map((value) => {
    return {
      label: value.phoneNumber,
      value: value.phoneId,
    };
  }) : null;
  return (<>
    <AntSelect style={{width: 200}} options={data} showSearch
               filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} {...props} />
  </>);
};
export const Adress = (props) => {
  const {customerid, state} = props;
  if (state) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      props.onChange(null);
    }, [customerid || null]);
  }
  const data = customerid ? customerid.map((value) => {
    return {
      label: value.location,
      value: value.adressId,
    };
  }) : null;
  return (<>
    <AntSelect style={{width: 200}} options={data} {...props} showSearch
               filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0} />
  </>);
};


