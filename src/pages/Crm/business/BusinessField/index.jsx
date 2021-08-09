/**
 * 商机表字段配置页
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {useRef} from 'react';
import {Input, InputNumber,Select as AntdSelect, Button} from 'antd';
import Select from '@/components/Select';
import {DatePicker2} from '@alifd/next';
import Drawer from '@/components/Drawer';
import Index from '@/pages/Crm/business/BusinessEdit/index';
import * as apiUrl from '../BusinessUrl';

const w = 200;
// 商机Id
export const BusinessId = (props) =>{
  return (<Input  {...props}/>);
};

export const Search = (props) => {
  return (<Input  {...props}/>);
};

// 产品名称
export const itemId = (props) =>{
  return (<Select api={apiUrl.ProductNameListSelect} Select {...props}/>);
};

// 商机名称
export const BusinessNameListSelect = (props) =>{
  return (<Input  {...props}/>);
};
// 负责人
export const PersonListSelect = (props) =>{

  return (<Select api={apiUrl.UserIdSelect}  {...props}/>);
};
// 客户名称
export const CustomerNameListSelect = (props) =>{
  return (<Select api={apiUrl.CustomerNameListSelect}  {...props}/>);
};


// 产品名称
export const NameListSelect = (props) =>{
  return (<Select api={apiUrl.NameListSelect}  {...props}/>);
};
// 机会来源
export const OrgNameListSelect = (props) =>{
  return (<Select api={apiUrl.OrgNameListSelect}  {...props}/>);
};




// 立项日期
export const TimeListSelect2 = (props) =>{
  return (<DatePicker2  showTime {...props}/>);
};
// 商机金额
export const OpportunityAmountListSelect3 = (props) =>{
  return (<InputNumber  {...props}/>);
};
// 销售流程
export const SalesIdListSelect = (props) =>{
  return (<Select api={apiUrl.SalesIdListSelect}  {...props}/>);

};
// 产品合计
export const TotalProductsListSelect4 = (props) =>{
  return (<InputNumber  {...props}/>);
};
// 整单折扣
export const OrderDiscountListSelect5 = (props) =>{
  return (<Input  {...props}/>);
};
// 主线索
export const MainCableListSelect6 = (props) =>{
  return (<Input   {...props}/>);
};

export const CustomerList = (props) =>{
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  return (<>
    <Input   {...props}/>
    <Button className='customerName' onClick={()=>{
      ref.current.open(false);}}>
      搜索客户
    </Button>
    <Drawer width={1500} title="选择" component={Index} onSuccess={() => {
      tableRef.current.refresh();
      ref.current.close();
    }} ref={ref} check={(id)=>{onChange(id);ref.current.close();}}/>
  </>);
};



// 创建者
export const CreateUserListSelect7 = (props) =>{
  return (<Select api={apiUrl.CreateUserListSelect7} api={apiUrl.CreateUserListSelect7}   {...props}/>);
};

// 修改者
export const UpdateUserListSelect8 = (props) =>{
  return (<Select api={apiUrl.UpdateUserListSelect8}  {...props}/>);
};

// 创建时间
export const CreateTimeListSelect9 = (props) =>{
  return (<DatePicker2    showTime   {...props}/>);
};

// 修改时间
export const UpdateTimeListSelect10 = (props) =>{
  return (<DatePicker2  showTime {...props}/>);
};


// 负责人主属部门id
export const DeptIdListSelect11 = (props) =>{
  return (<Select api={apiUrl.DeptIdListSelect11}  {...props}/>);
};





// 商机状态
export const StateListSelect12 = (props) =>{
  return (<AntdSelect   options={[{value:0,label:'预测评估'},{value:1,label:'初期沟通'},{value:2,label:'需求分析'}]} {...props}/>);
};
// 商机阶段
export const StageListSelect13 = (props) =>{
  return (<AntdSelect   options={[{value:'预测评估',label:'预测评估'},{value:'初期沟通',label:'初期沟通'},{value:'需求分析',label:'需求分析'}]} {...props}/>);
};

//  结单日期
export const StatementTimeListSelect14 = (props) =>{
  return (<DatePicker2  showTime {...props}/>);
};

//  赢率
export const SalesProcessIdListSelect15 = (props) =>{
  return (<Select   api={apiUrl.SalesProcessIdListSelect15} {...props}/>);
};

// 阶段变更时间
export const ChangeTimeListSelect17 = (props) =>{
  return (<DatePicker2  api={apiUrl.ChangeTimeListSelect17} showTime {...props}/>);
};

// 输单原因
export const ReasonListSelect18 = (props) =>{
  return (<Input  api={apiUrl.ReasonListSelect18} {...props}/>);
};


