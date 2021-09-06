/**
 * 竞争对手报价列表页
 *
 * @author 
 * @Date 2021-09-06 16:08:01
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {competitorQuoteDelete, competitorQuoteList} from '../competitorQuoteUrl';
import CompetitorQuoteEdit from '../competitorQuoteEdit';
import * as SysField from '../competitorQuoteField';

const {Column} = AntTable;
const {FormItem} = Form;

const CompetitorQuoteList = () => {
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
       <FormItem label="竞争对手id" name="competitorId" component={SysField.CompetitorId}/>
     </>
    );
  };

  return (
    <>
      <Table
        title={<h2>列表</h2>}
        api={competitorQuoteList}
        rowKey="competitorsQuoteId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="竞争对手报价" dataIndex="competitorsQuote"/>
        <Column title="竞争对手id" dataIndex="competitorId"/>
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

export default CompetitorQuoteList;
