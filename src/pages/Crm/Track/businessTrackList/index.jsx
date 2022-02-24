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
import Conent from '@/pages/Crm/Track/components/Conent';
import {Customer} from '../businessTrackField';
import {userRemove} from '@/Config/ApiUrl/system/user';

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
          <FormItem mega-props={{span: 1}} placeholder="请输入消息提醒内容" name="tixing" component={SysField.Tixing} />
          <FormItem mega-props={{span: 1}} placeholder="请选择跟踪类型" name="type" component={SysField.Type} />
          <FormItem mega-props={{span: 1}} placeholder="请输入提醒内容" name="note" component={SysField.Note} />
        </>
      );
    };


    return (
      <div style={{maxWidth: 800}}>
        <MegaLayout
          responsive={{s: 1, m: 2, lg: 2}} labelAlign="left" layoutProps={{wrapperWidth: 200}} grid={search}
          columns={4} full autoRow>
          <FormItem mega-props={{span: 1}} style={{width:'100%'}} placeholder="请选择客户" name="customerId" component={SysField.Customer} />
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
        tableKey='track'
        layout={search}
        SearchButton={Search()}
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column key={1} title="客户" render={(value, record) => {
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
        <Column key={2} title="跟踪类型" dataIndex="type" />
        <Column key={3} title="提醒时间" dataIndex="time" />
        <Column key={4} title="图片" dataIndex="image" render={(value) => {
          return (
            <>
              {value && <Image width={100} src={value} />}
            </>
          );
        }} />
        <Column key={5} title="负责人" dataIndex="userId" render={(value, record) => {
          return(
            <>
              {record.userResult.name}
            </>
          );
        }

        } />
        <Column key={6} title="分类" dataIndex="classify" render={(value, record) => {
          return(
            <>
              {record.categoryName}
            </>
          );
        }} />
        <Column key={7} title="名称" dataIndex="classifyId" render={(value, record) => {
          return(
            <>
              {record.name}
            </>
          );
        }} />
      </Table>

      <Modal key={1} width={1400} title="跟进" ref={refTrack} component={CrmBusinessTrackEdit} onSuccess={() => {
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
