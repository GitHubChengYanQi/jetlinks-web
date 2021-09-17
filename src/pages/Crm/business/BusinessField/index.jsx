/**
 * 项目表字段配置页
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {useRef} from 'react';
import {Input, InputNumber, Select as AntdSelect, Button} from 'antd';
import Select from '@/components/Select';
import Drawer from '@/components/Drawer';
import Index from '@/pages/Crm/business/BusinessEdit/index';
import DatePicker from '@/components/DatePicker';
import * as apiUrl from '../BusinessUrl';
import SelectCustomer from '@/pages/Crm/customer/components/SelectCustomer';

// 项目Id
export const BusinessId = (props) => {
  return (<Input  {...props} />);
};

export const Search = (props) => {
  return (<Input  {...props} />);
};

// 产品名称
export const itemId = (props) => {
  return (<Select api={apiUrl.ProductNameListSelect} {...props} />);
};

// 项目名称
export const BusinessNameListSelect = (props) => {
  return (<Input  {...props} />);
};
// 负责人
export const PersonListSelect = (props) => {
  const {userid, value} = props;
  if (userid === '' && value !== null) {
    //
  }else if (userid !== undefined) {
    props.onChange(userid);
  }
  return (<Select api={apiUrl.UserIdSelect}  {...props} />);
};
// 客户名称
export const CustomerNameListSelect = (props) => {


  return (<SelectCustomer  {...props}  onChange={(value) => {
    props.onChange(value.customerId);
  }} />);
};
export const CustomerNameSelect = (props) => {
  return (<Select disabled api={apiUrl.CustomerNameListSelect} {...props} />);
};
export const CustomerListSelect = (props) => {
  return (<Select api={apiUrl.CustomerNameListSelect} {...props} />);
};


// 产品名称
export const NameListSelect = (props) => {
  return (<Select api={apiUrl.NameListSelect}  {...props} />);
};
// 机会来源
export const OrgNameListSelect = (props) => {
  return (<Select api={apiUrl.OrgNameListSelect}  {...props} />);
};


// 立项日期
export const TimeListSelect2 = (props) => {
  return (<DatePicker {...props} />);
};
// 项目金额
export const OpportunityAmountListSelect3 = (props) => {
  return (<InputNumber  {...props} />);
};
// 销售流程
export const SalesIdListSelect = (props) => {
  const {value} = props;
  if (value !== undefined) {

    props.onChange(value);
  }
  return (<Select disabled api={apiUrl.SalesIdListSelect}  {...props} />);

};
// 产品合计
export const TotalProductsListSelect4 = (props) => {
  return (<InputNumber  {...props} />);
};
// 整单折扣
export const OrderDiscountListSelect5 = (props) => {
  return (<Input  {...props} />);
};
// 主线索
export const MainCableListSelect6 = (props) => {
  return (<Input   {...props} />);
};

export const CustomerList = (props) => {
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  return (<>
    <Input   {...props} />
    <Button className="customerName" onClick={() => {
      ref.current.open(false);
    }}>
      搜索客户
    </Button>
    <Drawer width={1500} title="选择" component={Index} onSuccess={() => {
      tableRef.current.refresh();
      ref.current.close();
    }} ref={ref} check={(id) => {
      onChange(id);
      ref.current.close();
    }} />
  </>);
};


// 项目状态
export const StateListSelect12 = (props) => {
  return (<AntdSelect
    options={[{value: 0, label: '预测评估'}, {value: 1, label: '初期沟通'}, {value: 2, label: '需求分析'}]} {...props} />);
};
// 项目阶段
export const StageListSelect13 = (props) => {
  return (<AntdSelect options={[{value: '预测评估', label: '预测评估'}, {value: '初期沟通', label: '初期沟通'}, {
    value: '需求分析',
    label: '需求分析'
  }]} {...props} />);
};

//  结单日期
export const StatementTimeListSelect14 = (props) => {
  return (<DatePicker  {...props} />);
};

// 阶段变更时间
export const ChangeTimeListSelect17 = (props) => {
  return (<DatePicker api={apiUrl.ChangeTimeListSelect17}  {...props} />);
};

