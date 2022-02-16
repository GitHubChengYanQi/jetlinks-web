/**
 * 工艺路线列表编辑页
 *
 * @author Captain_Jazz
 * @Date 2022-02-15 14:12:28
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {processRouteDetail, processRouteAdd, processRouteEdit} from '../processRouteUrl';
import * as SysField from '../processRouteField';

const {FormItem} = Form;

const ApiConfig = {
  view: processRouteDetail,
  add: processRouteAdd,
  save: processRouteEdit
};

const ProcessRouteEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey=""
    >
      <FormItem label="工艺路线id" name="processRouteId" component={SysField.ProcessRouteId} required/>
      <FormItem label="工艺路线编号" name="processRouteCoding" component={SysField.ProcessRouteCoding} required/>
      <FormItem label="工艺路线名称" name="processRoteName" component={SysField.ProcessRoteName} required/>
      <FormItem label="关联工艺物料清单" name="partsId" component={SysField.PartsId} required/>
      <FormItem label="版本号" name="version" component={SysField.Version} required/>
      <FormItem label="状态" name="status" component={SysField.Status} required/>
      <FormItem label="创建时间" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime} required/>
      <FormItem label="状态" name="display" component={SysField.Display} required/>
      <FormItem label="部门编号" name="deptId" component={SysField.DeptId} required/>
    </Form>
  );
};

export default ProcessRouteEdit;
