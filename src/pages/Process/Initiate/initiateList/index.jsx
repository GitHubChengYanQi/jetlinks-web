import React, {useRef} from 'react';
import {FormItem} from '@formily/antd';
import {Button, Input} from 'antd';
import {useHistory} from 'ice';
import Table from '@/components/Table';
import store from '@/store';

const {Column} = Table;


const InitiateList = () => {

  const tableRef = useRef(null);

  const history = useHistory(null);

  const [userInfo] = store.useModel('user');

  const searchForm = () => {
    return (
      <>
        <FormItem label="名称" name="taskName" component={Input} />
        <FormItem hidden name="createUser" value={userInfo.id} component={Input} />
      </>
    );
  };

  return <>
    <Table
      searchForm={searchForm}
      ref={tableRef}
      rowKey="processTaskId"
      api={{
        url: '/activitiProcessTask/list',
        method: 'POST',
      }}
    >
      <Column title="名称" dataIndex="taskName" />
      <Column title="发起人" dataIndex="user" render={(value) => {
        return <>{value && value.name}</>;
      }} />
      <Column title="创建时间" dataIndex="createTime" />
      <Column title="类型" dataIndex="type" render={(value) => {
        switch (value) {
          case 'quality_task':
            return '质检任务';
          case 'purchase':
          case 'purchaseAsk':
            return '采购申请';
          case 'purchasePlan':
            return '采购计划';
          case 'procurementOrder':
            return '采购单';
          default:
            break;
        }
      }} />
      <Column title="操作" dataIndex="processTaskId" render={(value) => {
        return <>
          <Button type='link' onClick={()=>{
            history.push(`/process/action/${value}`);
          }}>查看</Button>
        </>;
      }} />
    </Table>
  </>;
};

export default InitiateList;
