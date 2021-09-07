import React, {useEffect, useRef, useState} from 'react';
import AddButton from '@/components/AddButton';
import * as SysField from '@/pages/Crm/competitorQuote/competitorQuoteField';
import Table from '@/components/Table';
import Breadcrumb from '@/components/Breadcrumb';
import {competitorQuoteDelete, competitorQuoteList} from '@/pages/Crm/competitorQuote/competitorQuoteUrl';
import EditButton from '@/components/EditButton';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import CompetitorQuoteEdit from '@/pages/Crm/competitorQuote/competitorQuoteEdit';
import {Table as AntTable} from 'antd';
import Form from '@/components/Form';
import {CampType} from '@/pages/Crm/competitorQuote/competitorQuoteField';

const {Column} = AntTable;
const {FormItem} = Form;

const competitorTable = (props) => {
  const {status} = props;

  const ref = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    if (status) {
      tableRef.current.formActions.setFieldValue('campType', status ? status[0] : null);
      tableRef.current.submit();
    }
  }, [status]);

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
        <FormItem label="报价状态" name="campType" component={SysField.CampType}/>
        <FormItem label="竞争对手id" name="competitorId" component={SysField.CompetitorId}/>
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={competitorQuoteList}
        rowKey="competitorsQuoteId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="关联客户" dataIndex="relatedCustomers"/>
        <Column title="竞争对手id" dataIndex="competitorId"/>
        <Column title="报价金额" dataIndex="competitorsQuote"/>
        <Column title="报价状态" dataIndex="quoteStatus"/>
        <Column title="报价分类" dataIndex="quoteType"/>
        <Column title="报价日期" dataIndex="quoteDate"/>
        <Column/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.competitorsQuoteId);
              }}/>
              <DelButton api={competitorQuoteDelete} value={record.competitorsQuoteId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={300}/>
      </Table>
      <Drawer width={800} title="编辑" component={CompetitorQuoteEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref}/>
    </>
  );
};
export default competitorTable;
