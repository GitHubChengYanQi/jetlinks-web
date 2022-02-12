import React from 'react';
import {Button, Card, Table} from 'antd';
import {useHistory} from 'ice';
import {useRequest} from '@/util/Request';
import Breadcrumb from '@/components/Breadcrumb';

const {Column} = Table;

const MyAudit = () => {

  const history = useHistory(null);

  const {loading, data} = useRequest({
    url: '/remarks/auditList',
    method: 'POST',
    data: {
      status: -1
    }
  });

  return <Card title={<Breadcrumb />}>
    <Table
      loading={loading}
      rowKey="logId"
      dataSource={data}
    >
      <Column title="名称" dataIndex="taskResult" render={(value) => {
        return <>{value && value.taskName}</>;
      }} />
      <Column title="发起人" dataIndex="user" render={(value) => {
        return <>{value && value.name}</>;
      }} />
      <Column title="创建时间" dataIndex="taskResult" render={(value) => {
        return <>{value && value.createTime}</>;
      }} />
      <Column title="类型" dataIndex="taskResult" render={(value) => {
        switch (value.type) {
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
      <Column title="操作" dataIndex="taskId" render={(value) => {
        return <>
          <Button type="link" onClick={() => {
            history.push(`/process/action/${value}`);
          }}>查看</Button>
        </>;
      }} />
    </Table>
  </Card>;
};

export default MyAudit;
