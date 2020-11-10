import React from 'react';
import {positionDel, positionList} from '@/Config/ApiUrl/system/position';
import Table from '@/components/Table';
import {Table as AntTable} from 'antd';

const ApiConfig = {
  listApi: positionList,
  delApi: positionDel,
};

const {Column} = AntTable;

const PositionList = () => {

  return (
    <Table
      api={positionList}
      rowKey="positionId"
    >
      <Column title="职位名称" dataIndex="name" width={120}/>
      <Column title="职位编码" dataIndex="code" width={120}/>
      <Column title="备注" dataIndex="remark" width={200}/>
      <Column title="创建时间" dataIndex="createTime" width={200}/>
      <Column title="更新时间" dataIndex="updateTime" width={200}/>
      <Column title="状态" dataIndex="status" width={200}/>
      <Column/>
      <Column title="操作" align="right" width={200}/>
    </Table>
  );
};

export default PositionList;
