/**
 * 列表页
 *
 * @author
 * @Date 2021-09-07 09:50:09
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {competitorDelete, competitorList} from '../competitorUrl';
import CompetitorEdit from '../competitorEdit';
import * as SysField from '../competitorField';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Reset, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import Modal from '@/components/Modal';

const {Column} = AntTable;
const {FormItem} = Form;

const CompetitorList = () => {
  const ref = useRef(null);
  const tableRef = useRef(null);
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };


  const [search, setSearch] = useState(false);

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="联系电话" name="phone" component={SysField.Phone} />
          <FormItem mega-props={{span: 1}} placeholder="网址 " name="url" component={SysField.Url} />
          <FormItem  mega-props={{span: 1}}placeholder="创立日期" name="creationDate" component={SysField.CreationDate} />
          <FormItem  mega-props={{span: 1}}placeholder="邮箱" name="email" component={SysField.Email} />
          <FormItem  mega-props={{span: 1}} placeholder="员工规模" name="staffSize" component={SysField.StaffSize} />
          <FormItem mega-props={{span: 1}} placeholder="公司所有制" name="ownership" component={SysField.Ownership} />
          <FormItem mega-props={{span: 1}} placeholder="地区" name="region" component={SysField.Region} />
          <FormItem mega-props={{span: 1}} placeholder="竞争级别" name="competitionLevel" component={SysField.CompetitionLevel} />
          <FormItem mega-props={{span: 1}} placeholder="年销售" name="annualSales" component={SysField.AnnualSales} />
          <FormItem mega-props={{span: 1}} placeholder="公司简介" name="companyProfile" component={SysField.CompanyProfile} />
          <FormItem mega-props={{span: 1}} placeholder="对手优势" name="rivalAdvantage" component={SysField.RivalAdvantage} />
          <FormItem  mega-props={{span: 1}} placeholder="对手劣势" name="opponentsWeaknesses" component={SysField.OpponentsWeaknesses} />
          <FormItem mega-props={{span: 1}} placeholder="采取对策" name="takeCountermeasures" component={SysField.TakeCountermeasures} />
        </>
      );
    };


    return (
      <div style={{maxWidth: 800}}>
        <MegaLayout
          responsive={{s: 1, m: 2, lg: 2}}
          labelAlign="left"
          layoutProps={{wrapperWidth: 200}}
          grid={search}
          columns={4}
          full
          autoRow>
          <FormItem mega-props={{span: 1}} placeholder="竞争对手企业名称" name="name" component={SysField.Name} />
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
            <Button title={search ? '收起高级搜索' : '展开高级搜索'} onClick={() => {
              if (search) {
                setSearch(false);
              } else {
                setSearch(true);
              }
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
        title={<h2>列表</h2>}
        api={competitorList}
        rowKey="competitorId"
        searchForm={searchForm}
        SearchButton={Search()}
        layout={search}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="竞争对手企业名称" dataIndex="name" />
        <Column title="联系电话" dataIndex="phone" />
        <Column title="网址 " dataIndex="url" />
        <Column title="创立日期" dataIndex="creationDate" />
        <Column title="邮箱" dataIndex="email" />
        <Column title="员工规模" dataIndex="staffSize" />
        <Column title="公司所有制" dataIndex="ownership" />
        <Column title="地区" dataIndex="region" />
        <Column title="竞争级别" dataIndex="competitionLevel" />
        <Column title="年销售" dataIndex="annualSales" />
        <Column title="公司简介" dataIndex="companyProfile" />
        <Column title="对手优势" dataIndex="rivalAdvantage" />
        <Column title="对手劣势" dataIndex="opponentsWeaknesses" />
        <Column title="采取对策" dataIndex="takeCountermeasures" />
        <Column />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.competitorId);
              }} />
              <DelButton api={competitorDelete} value={record.competitorId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Modal width={1000} title="编辑" component={CompetitorEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default CompetitorList;
