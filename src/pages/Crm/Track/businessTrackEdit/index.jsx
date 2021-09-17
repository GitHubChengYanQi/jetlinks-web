/**
 * 跟进内容编辑页
 *
 * @author cheng
 * @Date 2021-09-17 10:35:56
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {businessTrackDetail, businessTrackAdd, businessTrackEdit} from '../businessTrackUrl';
import * as SysField from '../businessTrackField';

const {FormItem} = Form;

const ApiConfig = {
  view: businessTrackDetail,
  add: businessTrackAdd,
  save: businessTrackEdit
};

const BusinessTrackEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="trackId"
    >
      <FormItem label="跟踪内容" name="message" component={SysField.Message} required/>
      <FormItem label="创建者" name="createUser" component={SysField.CreateUser} required/>
      <FormItem label="修改者" name="updateUser" component={SysField.UpdateUser} required/>
      <FormItem label="创建时间" name="createTime" component={SysField.CreateTime} required/>
      <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime} required/>
      <FormItem label="消息提醒内容" name="tixing" component={SysField.Tixing} required/>
      <FormItem label="跟踪类型" name="type" component={SysField.Type} required/>
      <FormItem label="状态" name="display" component={SysField.Display} required/>
      <FormItem label="提醒时间" name="time" component={SysField.Time} required/>
      <FormItem label="提醒内容" name="note" component={SysField.Note} required/>
      <FormItem label="图片" name="image" component={SysField.Image} required/>
      <FormItem label="经度" name="longitude" component={SysField.Longitude} required/>
      <FormItem label="纬度" name="latitude" component={SysField.Latitude} required/>
      <FormItem label="负责人" name="userId" component={SysField.UserId} required/>
      <FormItem label="部门id" name="deptId" component={SysField.DeptId} required/>
      <FormItem label="分类" name="classify" component={SysField.Classify} required/>
      <FormItem label="分类id" name="classifyId" component={SysField.ClassifyId} required/>
      <FormItem label="跟进总表id" name="trackMessageId" component={SysField.TrackMessageId} required/>
    </Form>
  );
};

export default BusinessTrackEdit;
