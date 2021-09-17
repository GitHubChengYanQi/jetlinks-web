/**
 * 跟进内容列表页
 *
 * @author cheng
 * @Date 2021-09-17 10:35:56
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {businessTrackDelete, businessTrackList} from '../businessTrackUrl';
import BusinessTrackEdit from '../businessTrackEdit';
import * as SysField from '../businessTrackField';

const {Column} = AntTable;
const {FormItem} = Form;

const BusinessTrackList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
      </>
    );
  };

 const searchForm = () => {
   return (
     <>
       <FormItem label="跟踪内容" name="message" component={SysField.Message}/>
       <FormItem label="创建者" name="createUser" component={SysField.CreateUser}/>
       <FormItem label="修改者" name="updateUser" component={SysField.UpdateUser}/>
       <FormItem label="创建时间" name="createTime" component={SysField.CreateTime}/>
       <FormItem label="修改时间" name="updateTime" component={SysField.UpdateTime}/>
       <FormItem label="消息提醒内容" name="tixing" component={SysField.Tixing}/>
       <FormItem label="跟踪类型" name="type" component={SysField.Type}/>
       <FormItem label="状态" name="display" component={SysField.Display}/>
       <FormItem label="提醒时间" name="time" component={SysField.Time}/>
       <FormItem label="提醒内容" name="note" component={SysField.Note}/>
       <FormItem label="图片" name="image" component={SysField.Image}/>
       <FormItem label="经度" name="longitude" component={SysField.Longitude}/>
       <FormItem label="纬度" name="latitude" component={SysField.Latitude}/>
       <FormItem label="负责人" name="userId" component={SysField.UserId}/>
       <FormItem label="部门id" name="deptId" component={SysField.DeptId}/>
       <FormItem label="分类" name="classify" component={SysField.Classify}/>
       <FormItem label="分类id" name="classifyId" component={SysField.ClassifyId}/>
       <FormItem label="跟进总表id" name="trackMessageId" component={SysField.TrackMessageId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={businessTrackList}
        rowKey="trackId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="跟踪内容" dataIndex="message"/>
        <Column title="创建者" dataIndex="createUser"/>
        <Column title="修改者" dataIndex="updateUser"/>
        <Column title="创建时间" dataIndex="createTime"/>
        <Column title="修改时间" dataIndex="updateTime"/>
        <Column title="消息提醒内容" dataIndex="tixing"/>
        <Column title="跟踪类型" dataIndex="type"/>
        <Column title="状态" dataIndex="display"/>
        <Column title="提醒时间" dataIndex="time"/>
        <Column title="提醒内容" dataIndex="note"/>
        <Column title="图片" dataIndex="image"/>
        <Column title="经度" dataIndex="longitude"/>
        <Column title="纬度" dataIndex="latitude"/>
        <Column title="负责人" dataIndex="userId"/>
        <Column title="部门id" dataIndex="deptId"/>
        <Column title="分类" dataIndex="classify"/>
        <Column title="分类id" dataIndex="classifyId"/>
        <Column title="跟进总表id" dataIndex="trackMessageId"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.trackId);
              }}/>
              <DelButton api={businessTrackDelete} value={record.trackId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={BusinessTrackEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};

export default BusinessTrackList;
