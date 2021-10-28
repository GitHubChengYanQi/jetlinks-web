/**
 * 质检方案详情编辑页
 *
 * @author Captain_Jazz
 * @Date 2021-10-28 10:29:56
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {qualityPlanDetailDetail, qualityPlanDetailAdd, qualityPlanDetailEdit} from '../qualityPlanDetailUrl';
import * as SysField from '../qualityPlanDetailField';

const {FormItem} = Form;

const ApiConfig = {
  view: qualityPlanDetailDetail,
  add: qualityPlanDetailAdd,
  save: qualityPlanDetailEdit
};

const QualityPlanDetailEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="planDetailId"
    >
      <FormItem label="关联质检方案表主键id" name="planId" component={SysField.PlanId} required/>
      <FormItem label="质检项id" name="qualityCheckId" component={SysField.QualityCheckId} required/>
      <FormItem label="运算符" name="operator" component={SysField.Operator} required/>
      <FormItem label="标准值" name="standardValue" component={SysField.StandardValue} required/>
      <FormItem label="抽检类型" name="testingType" component={SysField.TestingType} required/>
      <FormItem label="质检数量" name="qualityAmount" component={SysField.QualityAmount} required/>
      <FormItem label="质检比例" name="qualityProportion" component={SysField.QualityProportion} required/>
      <FormItem label="创建时间" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime} required/>
      <FormItem label="创建者" name="createUser" component={SysField.CreateUser} required/>
      <FormItem label="修改者" name="updateUser" component={SysField.UpdateUser} required/>
      <FormItem label="状态" name="display" component={SysField.Display} required/>
      <FormItem label="部门编号" name="deptId" component={SysField.DeptId} required/>
    </Form>
  );
};

export default QualityPlanDetailEdit;
