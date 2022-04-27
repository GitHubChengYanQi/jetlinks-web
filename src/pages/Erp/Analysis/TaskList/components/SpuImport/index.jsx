import React, {useImperativeHandle, useRef, useState} from 'react';
import {Alert, Button, Dropdown, Input, Menu, Space, Spin, Table as AntTable} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import Table from '@/components/Table';
import Form from '@/components/Form';
import {useRequest} from '@/util/Request';
import Empty from '@/components/Empty';
import Modal from '@/components/Modal';
import AddSkuModal from '@/pages/Erp/sku/SkuTable/AddSkuModal';
import TaskProgress from '@/pages/Erp/Analysis/TaskList/components/TaskProgress';

const {Column} = AntTable;
const {FormItem} = Form;

const api = {url: '/asynTaskDetail/errorlist', method: 'POST'};
const removeApi = {url: '/asynTaskDetail/removeBatch', method: 'POST'};

const SpuImport = ({...props}, ref) => {

  const tableRef = useRef();

  const modalRef = useRef();

  const addSkuRef = useRef();

  const addRef = useRef();

  const [taskId, setTaskId] = useState();

  const [errKeys, setErrKeys] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);

  const {loading, data, run, cancel} = useRequest({
    url: '/asynTask/detail',
    method: 'POST'
  }, {
    manual: true,
    pollingInterval: 5000,
    onSuccess: (res) => {
      if (res.allCount === res.count) {
        cancel();
      }
    }
  });

  const load = data && (data.allCount === data.count);

  const {loading: removeLoading, run: removeRun} = useRequest(removeApi, {
    manual: true,
    onSuccess: () => {
      setSelectedRows([]);
      setErrKeys([]);
      tableRef.current.refresh();
    }
  });

  const disabled = selectedRows.filter((item) => {
    return ['noSpu', 'noClass'].includes(item.type);
  }).length > 0;

  const codingDisabled = selectedRows.filter((item) => {
    return ['codingRepeat'].includes(item.type);
  }).length > 0;


  const addDisabled =  selectedRows.length !== 1 || !disabled;
  const meargeDisabled = selectedRows.length !== 1 || disabled;
  const nextDisabled = selectedRows.length === 0 || disabled || codingDisabled;

  const open = (taskId) => {
    setSelectedRows([]);
    run({data: {taskId}});
    setTaskId(taskId);
    modalRef.current.open(false);
  };

  useImperativeHandle(ref, () => ({
    open,
  }));

  const searchForm = () => {
    return (
      <>
        <FormItem hidden name="taskId" value={taskId} component={Input} />
      </>
    );
  };

  const content = () => {
    if (!data) {
      return <Empty />;
    }
    if (!load) {
      return <TaskProgress data={data} title="导入中" />;
    } else {
      return <div style={{maxWidth: 1700}}>
        <Table
          noSort
          contentHeight
          headStyle={{display: 'none'}}
          api={api}
          rowKey="detailId"
          searchForm={searchForm}
          loading={removeLoading}
          ref={tableRef}
          value
          selectedRowKeys={selectedRows.map(item => item.detailId)}
          noRowSelection={false}
        >
          <Column title="错误行" dataIndex="spuExcel" align="center" render={(value) => {
            return <div style={{minWidth: 50}}>{value && value.line}</div>;
          }} />
          <Column title="产品编码" dataIndex="spuExcel" render={(value) => {
            return <div style={{minWidth: 70}}>{value && value.spuCoding}</div>;
          }} />
          <Column title="物料分类" dataIndex="spuExcel" render={(value) => {
            return <div style={{minWidth: 70}}>{value && value.spuClass}</div>;
          }} />
          <Column title="产品名称" dataIndex="spuExcel" render={(value) => {
            return <div style={{minWidth: 70}}>{value && value.spuName}</div>;
          }} />
          <Column title="规格" dataIndex="spuExcel" render={(value) => {
            return <div style={{minWidth: 70}}>{value && value.specifications}</div>;
          }} />
          <Column title="单位" dataIndex="spuExcel" render={(value) => {
            return <div style={{minWidth: 70}}>{value && value.unit}</div>;
          }} />
          <Column title="问题原因" dataIndex="spuExcel" render={(value) => {
            return <div style={{minWidth: 70}}>{value && value.error}</div>;
          }} />
        </Table>
      </div>;
    }
  };

  return <>
    <Modal
      ref={modalRef}
      headTitle={
        load ? <Space>
          <div>
            导入成功 <Button type="link" style={{padding: 0}}>{data && data.successNum}</Button> 条
          </div>
          /
          <div>
            导入失败 <Button type="link" style={{padding: 0}} danger>{data && data.errorNum}</Button> 条
          </div>
        </Space> : '物料导入'
      }
      width="auto"
    >
      {
        loading
          ?
          <Spin spinning>
            <Alert
              style={{padding: 24, margin: 24, width: 500}}
              message="正在导入，请稍后..."
            />
          </Spin>
          :
          content()
      }

    </Modal>

    <AddSkuModal
      addRef={addRef}
      tableRef={tableRef}
      ref={addSkuRef}
      edit
      copy={false}
      onSuccess={() => {
        removeRun({data: {ids: errKeys}});
      }}
    />
  </>;
};

export default React.forwardRef(SpuImport);
