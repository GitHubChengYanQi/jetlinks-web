import React, {useRef} from 'react';
import {Input, Table as AntTable} from 'antd';
import {createFormActions} from '@formily/antd';
import Table from '@/components/Table';
import Form from '@/components/Form';

const {Column} = AntTable;
const {FormItem} = Form;

const api = {url: '/asynTaskDetail/errorlist', method: 'POST'};

const formActionsPublic = createFormActions();

const PositionImport = ({taskId}) => {

  const tableRef = useRef();

  const searchForm = () => {
    return (
      <>
        <FormItem hidden name="taskId" value={taskId} component={Input} />
      </>
    );
  };

  return <div style={{maxWidth: 800}}>
    <Table
      noSort
      formActions={formActionsPublic}
      contentHeight
      headStyle={{display: 'none'}}
      api={api}
      rowKey="detailId"
      searchForm={searchForm}
      ref={tableRef}
      noRowSelection
    >
      <Column title="库位" dataIndex="positionBind" align="center" render={(value) => {
        return <div style={{minWidth: 50}}>{value && value.position}</div>;
      }} />
      <Column title="问题原因" dataIndex="positionBind" render={(value) => {
        return <div style={{minWidth: 70}}>{value && value.error}</div>;
      }} />
    </Table>
  </div>;
};

export default PositionImport;
