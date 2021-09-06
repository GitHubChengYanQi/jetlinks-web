/**
 * 竞争对手管理列表页
 *
 * @author
 * @Date 2021-09-06 13:44:14
 */

import React, {useRef} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {competitorDelete, competitorList} from '../competitorUrl';
import CompetitorEdit from '../competitorEdit';
import * as SysField from '../competitorField';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const CompetitorList = (props) => {

  const {data} = props;

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

  const searchForm = () => {
    return (
      <>
        <FormItem label="竞争对手企业名称" name="name" component={SysField.Name} />
        <FormItem hidden name="businessId" value={data && data.businessId} component={SysField.BusinessId} />
      </>
    );
  };

  return (
    <>
      <Table
        title={!props.data && <Breadcrumb title="竞争对手管理" />}
        api={competitorList}
        rowKey="competitorId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="竞争对手企业名称" dataIndex="name" />
        <Column title="竞争对手企业性质" dataIndex="nature" />
        <Column title="商机名称" dataIndex="businessId"
          // render={(text, record, index) => {
          //   return (
          //     <>
          //       {/*{text || null}*/}
          //     </>
          //   );
          // }}
        />
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
      <Drawer width={800} title="编辑" component={CompetitorEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} businessId={data && data.businessId } />
    </>
  );
};

export default CompetitorList;
