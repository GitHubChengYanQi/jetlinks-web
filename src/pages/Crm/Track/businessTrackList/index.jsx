/**
 * 跟进内容列表页
 *
 * @author cheng
 * @Date 2021-09-17 10:35:56
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Button, Image, Table as AntTable} from 'antd';
import AddButton from '@/components/AddButton';
import Form from '@/components/Form';
import {businessTrackDelete, businessTrackList} from '../businessTrackUrl';
import * as SysField from '../businessTrackField';
import Modal from '@/components/Modal';
import CrmBusinessTrackEdit from '@/pages/Crm/business/crmBusinessTrack/crmBusinessTrackEdit';
import {EditOutlined, SearchOutlined} from '@ant-design/icons';
import {useBoolean} from 'ahooks';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Submit} from '@formily/antd';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import Conent from '@/pages/Crm/track/components/Conent';

const {Column} = AntTable;
const {FormItem} = Form;

const BusinessTrackList = () => {
  const ref = useRef(null);

  const refTrack = useRef(null);
  const submitRef = useRef(null);
  const refContent = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton name="添加跟进" onClick={() => {
          refTrack.current.open(false);
        }} />
      </>
    );
  };

  const [search, {toggle}] = useBoolean(false);

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="消息提醒内容" name="tixing" component={SysField.Tixing} />
          <FormItem mega-props={{span: 1}} placeholder="跟踪类型" name="type" component={SysField.Type} />
          <FormItem mega-props={{span: 1}} placeholder="提醒内容" name="note" component={SysField.Note} />
        </>
      );
    };


    return (
      <div style={{maxWidth: 800}}>
        <MegaLayout
          responsive={{s: 1, m: 2, lg: 2}} labelAlign="left" layoutProps={{wrapperWidth: 200}} grid={search}
          columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} placeholder="跟踪内容" name="message" component={SysField.Message} />
          {search ? formItem() : null}
        </MegaLayout>

      </div>
    );
  };


  const Search = () => {
    return (
      <>
        <MegaLayout>
          <FormButtonGroup>
            <Submit><SearchOutlined />查询</Submit>
            <Button type="link" title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              toggle();
            }}>
              <Icon type={search ? 'icon-shouqi' : 'icon-gaojisousuo'} />{search ? '收起' : '高级'}</Button>
          </FormButtonGroup>
        </MegaLayout>
      </>
    );
  };


  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={businessTrackList}
        rowKey="trackId"
        layout={search}
        SearchButton={Search()}
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="客户" render={(value, record) => {
          return (
            <>
              <a onClick={() => {
                refContent.current.open(record);
              }}>
                跟进内容
              </a>
            </>
          );
        }} />
        <Column title="跟踪类型" dataIndex="type" />
        <Column title="提醒时间" dataIndex="time" />
        <Column title="图片" dataIndex="image" render={(value) => {
          return (
            <>
              {value && <Image width={100} src={value} />}
            </>
          );
        }} />
        <Column title="负责人" dataIndex="userId" />
        <Column title="分类" dataIndex="classify" />
        <Column title="名称" dataIndex="classifyId" />
        {/* <Column title="操作" align="right" render={(value, record) => { */}
        {/*  return ( */}
        {/*    <> */}
        {/*      <EditButton onClick={() => { */}
        {/*        ref.current.open(record.trackId); */}
        {/*      }} /> */}
        {/*      <DelButton api={businessTrackDelete} value={record.trackId} onSuccess={() => { */}
        {/*        tableRef.current.refresh(); */}
        {/*      }} /> */}
        {/*    </> */}
        {/*  ); */}
        {/* }} width={300} /> */}
      </Table>
      { /* <Drawer width={800} title="编辑" component={BusinessTrackEdit} onSuccess={() => { */}
      { /*  tableRef.current.refresh(); */}
      { /*  ref.current.close(); */}
      { /* }} ref={ref} /> */}

      <Modal width={1400} title="跟进" ref={refTrack} component={CrmBusinessTrackEdit} onSuccess={() => {
        refTrack.current.close();
        tableRef.current.submit();
      }} track={null}
      compoentRef={submitRef}
      footer={
        <>
          <Button type="primary" onClick={() => {
            submitRef.current.formRef.current.submit();
          }}>
             保存
          </Button>
          <Button onClick={() => {
            ref.current.close();
          }}>
             取消
          </Button>
        </>}


      />

      <Modal component={Conent} ref={refContent} onSuccess={() => {
        tableRef.current.submit();
        refContent.current.close();
      }} />
    </>
  );
};

export default BusinessTrackList;
