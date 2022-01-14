/**
 * 合同模板字段配置页
 *
 * @author
 * @Date 2021-07-21 08:22:02
 */

import React from 'react';
import {Input, Select as AntdSelect} from 'antd';
import Editor from '@/components/Editor';
import Select from '@/components/Select';
import {contractClassListSelect} from '@/pages/Crm/contract/components/contractClass/contractClassUrl';

export const Name = (props) => {
  return (<Input   {...props} />);
};
export const Content = (props) => {
  return (<Editor type='contacts' placeholder='输入合同模板..'  {...props} />);
};

export const Module = (props) => {
  return (<AntdSelect options={[{label:'采购',value:'procurement'}]}  {...props} />);
};

export const ContractClassId = (props) => {
  return (<Select api={contractClassListSelect} {...props} />);
};
