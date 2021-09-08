/**
 * 竞争对手报价列表页
 *
 * @author
 * @Date 2021-09-06 16:08:01
 */

import React, {useEffect, useRef} from 'react';
import {Table as AntTable} from 'antd';
import Table from '@/components/Table';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {competitorQuoteDelete, competitorQuoteList} from '../competitorQuoteUrl';
import CompetitorQuoteEdit from '../competitorQuoteEdit';
import * as SysField from '../competitorQuoteField';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const competitorTable = (props) => {

  const ref = useRef(null);
  const tableRef = useRef(null);
  const {status} = props;

  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }}/>
      </>
    );
  };

  useEffect(() => {
    if (status) {
      tableRef.current.formActions.setFieldValue('campType', status ? status[0] : null );
      tableRef.current.submit();
    }
  }, [status]);

  const searchForm = () => {
    return (
      <>
        <FormItem hidden name="campType" component={SysField.CampType}/>
        <FormItem placeholder="竞争对手" name="competitorId" component={SysField.CompetitorId}/>
      </>
    );
  };

  return (
    <>
      <Table
        title={<Breadcrumb />}
        api={competitorQuoteList}
        rowKey="quoteId"
        isModal={false}
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}

      >
        <Column width={200} title="商机" dataIndex="businessId" render={(value, record) => {
          return (
            <div>
              {
                record.crmBusinessResult ? record.crmBusinessResult.businessName : null
              }
            </div>
          );
        }} />
        <Column width={200}  title="竞争对手" dataIndex="competitorId" render={(value, record) => {
          return (

            <div>
              {
                record.competitorResult ? record.competitorResult.name : '-'
              }
            </div>
          );
        }}/>
        <Column width={100} title="报价金额" dataIndex="competitorsQuote"/>
        <Column width={100} title="报价状态" dataIndex="quoteStatus" render={(value, record) => {
          return (
            <div>
              {
                record.quoteStatus === '' && "-" ||
                record.quoteStatus === 0 && "无需审批"  ||
                record.quoteStatus === 1 && "待询价" ||
                record.quoteStatus === 2 && "询价中"
              }
            </div>
          );
        }}/>
        <Column width={200} title="报价日期" dataIndex="createTime"/>
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.quoteId);
              }}/>
              <DelButton api={competitorQuoteDelete} value={record.quoteId} onSuccess={()=>{
                tableRef.current.refresh();
              }}/>
            </>
          );
        }} width={200}  />
      </Table>
      <Drawer width={600} title="编辑" component={CompetitorQuoteEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} status={status ? status[0] : null} />
    </>
  );
};

export default competitorTable;
