/**
 * 工序关联绑定工具与设备表编辑页
 *
 * @author Captain_Jazz
 * @Date 2022-02-10 15:06:02
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {shipSetpBindDetail, shipSetpBindAdd, shipSetpBindEdit} from '../shipSetpBindUrl';
import * as SysField from '../shipSetpBindField';

const {FormItem} = Form;

const ApiConfig = {
  view: shipSetpBindDetail,
  add: shipSetpBindAdd,
  save: shipSetpBindEdit
};

const ShipSetpBindEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="shipSetpBindId"
    >
      <FormItem label="分类" name="type" component={SysField.Type} required/>
      <FormItem label="所属id" name="fromId" component={SysField.FromId} required/>
      <FormItem label="是否常用" name="isCommon" component={SysField.IsCommon} required/>
      <FormItem label="创建者" name="createUser" component={SysField.CreateUser} required/>
      <FormItem label="修改者" name="updateUser" component={SysField.UpdateUser} required/>
      <FormItem label="创建时间" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime} required/>
      <FormItem label="状态" name="display" component={SysField.Display} required/>
      <FormItem label="部门id" name="deptId" component={SysField.DeptId} required/>
    </Form>
  );
};

export default ShipSetpBindEdit;
