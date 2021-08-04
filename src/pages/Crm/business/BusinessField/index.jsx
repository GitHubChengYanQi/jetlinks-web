/**
 * 商机表字段配置页
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {useRef} from 'react';
import {Input, InputNumber, TimePicker, DatePicker, Select as AntdSelect, Checkbox, Radio, Button} from 'antd';
import Select from '@/components/Select';
import {DatePicker2} from '@alifd/next';
import Drawer from '@/components/Drawer';
import Index from '@/pages/Crm/business/BusinessEdit/index';
import Stocks from '@/pages/Crm/track/TrackEdit/components/Stocks';
import * as apiUrl from '../BusinessUrl';

const w = 200;
// 商机Id
export const BusinessId = (props) =>{
  return (<Input style={{width:w}} {...props}/>);
};

// 产品名称
export const itemId = (props) =>{
  return (<Input style={{width:w}} {...props}/>);
};

// 商机名称
export const BusinessNameListSelect = (props) =>{
  return (<Input style={{width:w}} {...props}/>);
};
// 负责人
export const PersonListSelect = (props) =>{

  return (<Input style={{width:w}} {...props}/>);
};
// 客户名称
export const CustomerNameListSelect = (props) =>{
  return (<Select api={apiUrl.CustomerNameListSelect} style={{width:w}} {...props}/>);
};


// 产品名称
export const NameListSelect = (props) =>{
  return (<Select api={apiUrl.NameListSelect} style={{width:w}} {...props}/>);
};
// 机会来源
export const OrgNameListSelect = (props) =>{
  return (<Select api={apiUrl.OrgNameListSelect} style={{width:w}} {...props}/>);
};




// 立项日期
export const TimeListSelect2 = (props) =>{
  return (<DatePicker2 style={{width:w}} showTime {...props}/>);
};
// 商机金额
export const OpportunityAmountListSelect3 = (props) =>{
  return (<Input style={{width:w}} {...props}/>);
};
// 销售流程
export const SalesIdListSelect = (props) =>{
  return (<Select api={apiUrl.SalesIdListSelect} style={{width:w}} {...props}/>);

};
// 产品合计
export const TotalProductsListSelect4 = (props) =>{
  return (<Input style={{width:w}} {...props}/>);
};
// 整单折扣
export const OrderDiscountListSelect5 = (props) =>{
  return (<Input style={{width:w}} {...props}/>);
};
// 主线索
export const MainCableListSelect6 = (props) =>{
  return (<Input style={{width:w}}  {...props}/>);
};


// export const CustomerList = (props) =>{
//   const {onChange} = props;
//   const ref = useRef(null);
//   const tableRef = useRef(null);
//   return (<>
//     <Input  style={{width:w}} {...props}/>
//     <Button className='placeName' onClick={()=>{
//       ref.current.open(false);}}>
//       搜索客户
//     </Button>
//     <Drawer width={800} title="选择" component={Stocks}  onSuccess={() => {
//       tableRef.current.refresh();
//       ref.current.close();
//     }} ref={ref} ckeck={(id)=>{onChange(id);ref.current.close();}}/>
//   </>);
// };
export const CustomerList = (props) =>{
  const {onChange} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  return (<>
    <Input style={{width:w}}  {...props}/>
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
  return (<Select api={apiUrl.CreateUserListSelect7} api={apiUrl.CreateUserListSelect7}  style={{width:w}} {...props}/>);
};

// 修改者
export const UpdateUserListSelect8 = (props) =>{
  return (<Select api={apiUrl.UpdateUserListSelect8} style={{width:w}} {...props}/>);
};

// 创建时间
export const CreateTimeListSelect9 = (props) =>{
  return (<DatePicker2  style={{width:w}}  showTime   {...props}/>);
};

// 修改时间
export const UpdateTimeListSelect10 = (props) =>{
  return (<DatePicker2 style={{width:w}} showTime {...props}/>);
};


// 负责人主属部门id
export const DeptIdListSelect11 = (props) =>{
  return (<Select api={apiUrl.DeptIdListSelect11} style={{width:w}} {...props}/>);
};





// 商机状态
export const StateListSelect12 = (props) =>{
  return (<AntdSelect style={{width:w}}  options={[{value:'预测评估',label:'预测评估'},{value:'初期沟通',label:'初期沟通'},{value:'需求分析',label:'需求分析'}]} {...props}/>);
};
// 商机阶段
export const StageListSelect13 = (props) =>{
  return (<AntdSelect style={{width:w}}  options={[{value:'预测评估',label:'预测评估'},{value:'初期沟通',label:'初期沟通'},{value:'需求分析',label:'需求分析'}]} {...props}/>);
};

//  结单日期
export const StatementTimeListSelect14 = (props) =>{
  return (<DatePicker2 style={{width:w}} showTime {...props}/>);
};

//  赢率
export const SalesProcessIdListSelect15 = (props) =>{
  return (<Select  style={{width:w}} api={apiUrl.SalesProcessIdListSelect15} {...props}/>);
};

// 阶段变更时间
export const ChangeTimeListSelect17 = (props) =>{
  return (<Input style={{width:w}} api={apiUrl.ChangeTimeListSelect17} {...props}/>);
};

// 输单原因
export const ReasonListSelect18 = (props) =>{
  return (<Input style={{width:w}} api={apiUrl.ReasonListSelect18} {...props}/>);
};


