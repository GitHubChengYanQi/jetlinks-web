/**
 * 工序表字段配置页
 *
 * @author Captain_Jazz
 * @Date 2022-02-10 15:06:02
 */

import React, {useRef} from 'react';
import {Input, Select as AntdSelect, Checkbox, Space, Button} from 'antd';
import Select from '@/components/Select';
import {toolListSelect} from '@/pages/Erp/qualityCheck/qualityCheckUrl';
import {sopListSelect} from '@/pages/ReSearch/sop/sopUrl';
import SetSelectOrCascader from '@/components/SetSelectOrCascader';
import ShipSetpClassList from '@/pages/ReSearch/shipSetp/shipSetpClass/shipSetpClassList';
import {shipSetpClasslistSelect} from '@/pages/ReSearch/shipSetp/shipSetpClass/shipSetpClassUrl';
import Drawer from '@/components/Drawer';
import SopDetailList from '@/pages/ReSearch/sop/sopDetail/sopDetailList';

export const ShipSetpName = (props) => {
  return (<Input {...props} />);
};
export const Remark = (props) => {
  return (<Input.TextArea rows={2} {...props} />);
};
export const Accessories = (props) => {
  return (<Input {...props} />);
};
export const CreateUser = (props) => {
  return (<Input {...props} />);
};
export const UpdateUser = (props) => {
  return (<Input {...props} />);
};
export const CreateTime = (props) => {
  return (<Input {...props} />);
};
export const UpdateTime = (props) => {
  return (<Input {...props} />);
};
export const Display = (props) => {
  return (<Input {...props} />);
};
export const DeptId = (props) => {
  return (<Input {...props} />);
};

export const IsCommon = (props) => {
  const {value, onChange} = props;
  return (<Checkbox checked={value} onChange={(value) => {
    onChange(value.target.checked ? 1 : 0);
  }} />);
};

export const FormId = (props) => {
  return (<Select api={toolListSelect} width={200} {...props} />);
};

export const SopId = (props) => {
  const ref = useRef();
  return (
    <Space>
      <Select api={sopListSelect} width={200} {...props} />
      {props.value && <Button type="link" onClick={() => {
        ref.current.open(false);
      }}>查看SOP</Button>}
      <Drawer ref={ref} onSuccess={()=>{ref.current.close();}} title='SOP作业指导' component={SopDetailList} id={props.value} />
    </Space>
  );
};

export const Type = (props) => {
  return (<AntdSelect
    style={{width: 150}}
    options={[{label: '工具', value: 'tool'}]}
    {...props}
  />);
};

export const ShipSetpClassId = (props) => {
  return (<SetSelectOrCascader api={shipSetpClasslistSelect} width={200} title="设置工序分类" component={ShipSetpClassList} {...props} />);
};
