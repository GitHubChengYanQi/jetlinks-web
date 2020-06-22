import React from 'react';
import {Table} from '@alifd/next';
import {positionDel, positionList} from '@/Config/ApiUrl/system/position';
import PositionEdit from '@/pages/setting/system/position/PositionEdit';
import List from '@/components/List';

const ApiConfig = {
  listApi: positionList,
  delApi: positionDel,
};

const PositionList = () => {

  return (
    <List
      Title={<h2>职位管理</h2>}
      ApiConfig={ApiConfig}
      Edit={PositionEdit}
      fieldKey="positionId"
    >
      <Table.Column title="职位名称" dataIndex="name" width={120}/>
      <Table.Column title="职位编码" dataIndex="code" width={120}/>
      <Table.Column title="备注" dataIndex="remark" width={200}/>
      <Table.Column title="创建时间" dataIndex="createTime" width={200}/>
      <Table.Column title="更新时间" dataIndex="updateTime" width={200}/>
      <Table.Column title="状态" dataIndex="status" width={200}/>
    </List>
  );
};

export default PositionList;
