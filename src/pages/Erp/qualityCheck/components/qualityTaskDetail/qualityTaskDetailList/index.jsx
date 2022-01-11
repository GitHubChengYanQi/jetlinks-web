/**
 * 质检任务详情列表页
 *
 * @author
 * @Date 2021-11-16 09:54:41
 */

import React, {useEffect} from 'react';
import {Badge, Descriptions, Table as AntTable} from 'antd';
import ProCard from '@ant-design/pro-card';
import ProSkeleton from '@ant-design/pro-skeleton';
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {useRequest} from '@/util/Request';
import SkuResult from '@/pages/Erp/sku/components/SkuResult';

const {Column} = AntTable;

const QualityTaskDetailList = ({value}) => {

  const {loading, data, run} = useRequest(
    {
      url: '/qualityTask/getTask',
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (value) {
      run({
        params: {
          id: value,
        },
      });
    }
  }, []);

  if (loading) {
    return <ProSkeleton type="descriptions" />;
  }

  if (!data) {
    return null;
  }

  return (
    <div style={{padding: 24}}>
      <ProCard className="h2Card" title="基本信息" headerBordered>
        <Descriptions column={1} bordered labelStyle={{width: 120}}>
          <Descriptions.Item label="编码">{data.coding}</Descriptions.Item>
          <Descriptions.Item label="类型">{data.type}</Descriptions.Item>
          <Descriptions.Item label="创建人">{data.user && data.user.name}</Descriptions.Item>
          <Descriptions.Item label="备注">{data.remark || '无'}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
        </Descriptions>
      </ProCard>

      <ProCard className="h2Card" title="子任务信息" headerBordered>
        {data.childTasks &&
        <AntTable
          pagination={false}
          dataSource={data.childTasks}
          rowKey="qualityTaskId"
        >
          <Column title="分派人" dataIndex="user" render={(value, record) => {
            return <>
              {record.user && record.user.name}
            </>;
          }} />
          <Column title="分派时间" dataIndex="createTime" width={120} />
          <Column title="质检人" width={100} align="center" render={(value, record) => {
            return <>
              {record.users && record.users.map((items) => {
                return items.name;
              }).toString()}
            </>;
          }} />
          <Column title="地点" dataIndex="qualityPlanId" render={(value, record) => {
            return <>
              {record.address && JSON.parse(record.address).address}
            </>;
          }} />
          <Column title="联系人" dataIndex="person" width={100} align="center" />
          <Column title="电话" dataIndex="phone" width={100} align="center" />
          <Column title="备注" dataIndex="note" width={200} />
          <Column title="状态" dataIndex="state" width={100} align="center" render={(value) => {
            switch (value) {
              case -1:
                return <Badge text="已拒绝" color="red" />;
              case 1:
                return <Badge text="进行中" color="yellow" />;
              case 2:
                return <Badge text="已完成" color="blue" />;
              case 3:
                return <Badge text="已入库" color="green" />;
              default:
                break;
            }
          }} />
        </AntTable>}
      </ProCard>

      <ProCard className="h2Card" title="拒检任务信息" headerBordered>
        {data.childTasks &&
        <AntTable
          pagination={false}
          dataSource={data.refuse}
          rowKey="refuseId"
        >
          <Column title="拒检人" width={100} align="center" render={(value, record) => {
            return <>
              {record.user && record.user.name}
            </>;
          }} />
          <Column title="拒检物料" render={(value, record) => {
            return <SkuResult skuResult={record.skuResult} />;
          }} />
          <Column title="供应商(品牌)" width={120} align="center" render={(value, record) => {
            return <>
              {record.brandResult && record.brandResult.brandName}
            </>;
          }} />
          <Column title="数量" width={100} align="center" render={(value, record) => {
            return <>
              {record.number}
            </>;
          }} />
          <Column title="拒检时间" dataIndex="createTime" width={200} />
          <Column title="备注" dataIndex="note" width={200} />
        </AntTable>}
      </ProCard>
    </div>
  );
};

export default QualityTaskDetailList;
