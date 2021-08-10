/**
 * 行业表列表页
 *
 * @author
 * @Date 2021-08-02 08:25:03
 */

import React, {useRef, useState} from 'react';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import Form from '@/components/Form';
import {crmIndustryDelete, crmIndustryList} from '../crmIndustryUrl';
import CrmIndustryEdit from '../crmIndustryEdit';
import * as SysField from '../crmIndustryField';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = AntTable;
const {FormItem} = Form;

const CrmIndustryList = () => {
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
        <FormItem label="行业名称" name="industryName" component={SysField.IndustryName}/>
        <FormItem label="上级" name="parentId" component={SysField.ParentId}/>
      </>
    );
  };

  const [ids, setIds] = useState([]);

  const footer = () => {
    /**
     * 批量删除例子，根据实际情况修改接口地址
     */
    return (<DelButton api={{
      // ...customerBatchDelete
    }} onSuccess={() => {
      tableRef.current.refresh();
    }} value={ids}>批量删除</DelButton>);
  };

  return (
    <>
      <Table
        footer={footer}
        onChange={(keys) => {
          setIds(keys);
        }}
        title={<Breadcrumb title="行业管理" />}
        api={crmIndustryList}
        rowKey="industryId"
        searchForm={searchForm}
        actions={actions()}
        ref={tableRef}
      >
        <Column title="行业名称" dataIndex="industryName" />
        <Column title="上级" dataIndex="parentName" />
        <Column title="操作" align="right" render={(value, record) => {
          return (
            <>
              <EditButton onClick={() => {
                ref.current.open(record.industryId);
              }} />
              <DelButton api={crmIndustryDelete} value={record.industryId} onSuccess={() => {
                tableRef.current.refresh();
              }} />
            </>
          );
        }} width={300} />
      </Table>
      <Drawer width={800} title="行业" component={CrmIndustryEdit} onSuccess={() => {
        tableRef.current.refresh();
        ref.current.close();
      }} ref={ref} />
    </>
  );
};
export default CrmIndustryList;
