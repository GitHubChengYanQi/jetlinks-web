/**
 * 工序关联绑定工具与设备表列表页
 *
 * @author Captain_Jazz
 * @Date 2022-02-10 15:06:02
 */

import React from 'react';
import {Table as AntTable} from 'antd';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {useRequest} from '@/util/Request';
import {shipSetpDetail} from '@/pages/ReSearch/shipSetp/shipSetpUrl';
import Empty from '@/components/Empty';

const {Column} = AntTable;

const ShipSetpBindList = ({value}) => {

  const {loading, data} = useRequest(shipSetpDetail, {
    defaultParams: {
      data: {
        shipSetpId: value
      }
    }
  });

  if (!data) {
    return <Empty />;
  }

  return (
    <div style={{padding:16}}>
      <AntTable
        loading={loading}
        rowKey="shipSetpBindId"
        dataSource={data.binds || []}
      >
        <Column title="工具" dataIndex="toolResult" render={(value) => {
          return <>{value && value.name}</>;
        }} />
        <Column title="常用" dataIndex="isCommon" render={(value) => {
          switch (value) {
            case 0:
              return <CloseOutlined />;
            case 1:
              return <CheckOutlined />;
            default:
              break;
          }
        }} />
      </AntTable>
    </div>
  );
};

export default ShipSetpBindList;
