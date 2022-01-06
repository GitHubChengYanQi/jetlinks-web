/**
 * 仓库库位表列表页
 *
 * @author song
 * @Date 2021-10-29 09:22:25
 */

import React, {useRef, useState} from 'react';
import { SearchOutlined} from '@ant-design/icons';
import {Button, Card, Divider, Input, Space, Table as AntTable} from 'antd';
import DelButton from '@/components/DelButton';
import Drawer from '@/components/Drawer';
import AddButton from '@/components/AddButton';
import EditButton from '@/components/EditButton';
import {
  storehousePositionsDelete,
} from '../storehousePositionsUrl';
import StorehousePositionsEdit from '../storehousePositionsEdit';
import Breadcrumb from '@/components/Breadcrumb';
import Code from '@/pages/Erp/spu/components/Code';
import {useRequest} from '@/util/Request';

const {Column} = AntTable;

const StorehousePositionsList = (props) => {
  const {value} = props;
  const ref = useRef(null);
  const tableRef = useRef(null);
  const [name,setName] = useState();
  const actions = () => {
    return (
      <>
        <AddButton onClick={() => {
          ref.current.open(false);
        }} />
      </>
    );
  };

  const {loading, data, run, refresh} = useRequest({
    url: `/storehousePositions/treeView?ids=${value}`,
    method: 'GET',
  },);

  return (
    <>
      <Card title={<Breadcrumb title="仓库库位" />} extra={actions()}>
        <Space>
          <Input placeholder="库位名称" onChange={(value)=>{
            setName(value.target.value);
          }} />
          <Button type="primary" onClick={() => {
            run({
              params: {
                name,
              }
            });
          }}><SearchOutlined />查询</Button>
        </Space>
        <Divider />
        <AntTable
          dataSource={data || []}
          loading={loading}
          rowKey="value"
          pagination={false}
        >
          <Column title="库位名称" width={200} dataIndex="label" render={(value, record) => {
            if (record.children && record.children.length === 0) {
              record.children = null;
            }
            return (
              <>
                <Code style={{width: 24, height: 24}} source="storehousePositions" id={record.value} />
                {value}
              </>
            );
          }} />
          <Column title="操作" align="right" render={(value, record) => {
            if (record.value !== '0') {
              return (
                <>
                  <EditButton onClick={() => {
                    ref.current.open(record.value);
                  }} />
                  <DelButton api={storehousePositionsDelete} value={record.value} onSuccess={() => {
                    tableRef.current.refresh();
                  }} />
                </>
              );
            }
          }} width={100} />
        </AntTable>
      </Card>
      <Drawer width={800} title="编辑" component={StorehousePositionsEdit} onSuccess={() => {
        refresh();
        ref.current.close();
      }} ref={ref} storehouse={value} />
    </>
  );
};

export default StorehousePositionsList;
