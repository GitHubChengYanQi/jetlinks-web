/**
 * 列表页
 *
 * @author
 * @Date 2021-09-07 09:50:09
 */

import React, {useEffect, useRef, useState} from 'react';
import Table from '@/components/Table';
import {Button, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {competitorDelete, competitorList} from '../../competitorUrl';
import CompetitorEdit from '../../competitorEdit';
import * as SysField from '../../competitorField';
import {MegaLayout} from '@formily/antd-components';
import {FormButtonGroup, Reset, Submit} from '@formily/antd';
import {SearchOutlined} from '@ant-design/icons';
import Icon from '@/components/Icon';
import Modal from '@/components/Modal';
import Breadcrumb from '@/components/Breadcrumb';
import CustomerLevel from '@/pages/Crm/customer/components/CustomerLevel';

const {Column} = AntTable;
const {FormItem} = Form;

const CompetitorTable = (props) => {

  const {competitionLevel} = props;


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

  useEffect(() => {
    if (competitionLevel && competitionLevel.length > 0) {
      tableRef.current.formActions.setFieldValue('competitionLevel', competitionLevel[0]);
      tableRef.current.submit();
    }
  }, [competitionLevel]);


  const [search, setSearch] = useState(false);

  const searchForm = () => {

    const formItem = () => {
      return (
        <>
          <FormItem mega-props={{span: 1}} placeholder="联系电话" name="phone" component={SysField.Phone} />
          <FormItem mega-props={{span: 1}} placeholder="员工规模" name="staffSize" component={SysField.StaffSize} />
          <FormItem mega-props={{span: 1}} placeholder="公司所有制" name="ownership" component={SysField.Ownership} />
          <FormItem mega-props={{span: 1}} placeholder="地区" name="region" component={SysField.Region} />
          <FormItem
            mega-props={{span: 1}}
            placeholder="竞争级别"
            name="competitionLevel"
            component={SysField.CompetitionLevel} />
          <FormItem mega-props={{span: 1}} placeholder="年销售" name="annualSales" component={SysField.AnnualSales} />
          <FormItem mega-props={{span: 1}} placeholder="年销售" name="annualSales" component={SysField.AnnualSales} />
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
            <MegaLayout inline>
              <FormItem hidden name="competitionLevel" component={SysField.CompetitionLevel} />
            </MegaLayout>
          </FormButtonGroup>
        </MegaLayout>

      </>
    );
  };

  const Level = (index) => {
    switch (index){
      case 0:
        return '低';
      case 1:
        return '中';
      case 2:
        return '高';
      default:
        break;
    }
  };

  return (
    <>
      <Table

        api={competitorList}
        rowKey="competitorId"
        searchForm={searchForm}
        SearchButton={Search()}
        layout={search}
        actions={actions()}
        ref={tableRef}
      >
        <Column width={150} fiexd title="竞争对手企业名称" dataIndex="name" />
        <Column width={100} title="联系电话" dataIndex="phone" />
        <Column width={100} title="邮箱" dataIndex="email" />
        <Column width={100} title="地区" dataIndex="region" render={(value, record) => {
          return (
            <div>
              {
                record.regionResult ? `${record.regionResult.countries
                }-${record.regionResult.province
                }-${record.regionResult.city
                }-${record.regionResult.area}` : null
              }
            </div>
          );
        }} />
        <Column width={100} title="竞争级别" dataIndex="competitionLevel" render={(record,index)=>{
          return (
            <CustomerLevel level={record.competitionLevel} >{record.level}</CustomerLevel>
          );
        }} />
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
        }} width={200} fiexd />
      </Table>
      <Modal width={1000} title="编辑" component={CompetitorEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};

export default CompetitorTable;
