import React, {useImperativeHandle, useRef, useState} from 'react';
import {Alert, Button, Input, notification, Space, Spin, Table as AntTable} from 'antd';
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

const SkuImport = ({...props}, ref) => {

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
      return <TaskProgress data={data} title='导入中' />;
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
          rowSelection={{
            onSelect: (record, selected) => {
              const array = selectedRows.filter(item => record.detailId !== item.detailId);
              if (selected) {
                setSelectedRows([...array, {...record.skuExcelItem, detailId: record.detailId,}]);
              } else {
                setSelectedRows(array);
              }
            },
            onSelectAll: (selected, rows, changeRows) => {
              const array = selectedRows.filter(item => !(changeRows.map(item => item.detailId).includes(item.detailId)));
              if (selected) {
                setSelectedRows([...array, ...changeRows.map(item => {
                  return {...item.skuExcelItem, detailId: item.detailId};
                })]);
              } else {
                setSelectedRows(array);
              }
            }
          }}
        >
          <Column title="错误行" dataIndex="skuExcelItem" align="center" render={(value) => {
            return <div style={{minWidth: 50}}>{value && value.line}</div>;
          }} />
          <Column title="物料编码" dataIndex="skuExcelItem" render={(value) => {
            return <div style={{minWidth: 70}}>{value && value.standard}</div>;
          }} />
          <Column title="物料分类" dataIndex="skuExcelItem" render={(value) => {
            return <div style={{minWidth: 70}}>{value && value.spuClass}</div>;
          }} />
          <Column title="产品" dataIndex="skuExcelItem" render={(value) => {
            return <div style={{minWidth: 70}}>{value && value.classItem}</div>;
          }} />
          <Column title="型号" dataIndex="skuExcelItem" render={(value) => {
            return <div style={{minWidth: 70}}>{value && value.skuName}</div>;
          }} />
          <Column title="规格" dataIndex="skuExcelItem" render={(value) => {
            return <div style={{minWidth: 70}}>{value && value.specifications}</div>;
          }} />
          <Column title="单位" dataIndex="skuExcelItem" render={(value) => {
            return <div style={{minWidth: 70}}>{value && value.unit}</div>;
          }} />
          <Column title="批量" dataIndex="skuExcelItem" render={(value) => {
            return <div style={{minWidth: 70}}>{value && value.isNotBatch}</div>;
          }} />
          <Column title="参数配置" dataIndex="skuExcelItem" render={(value) => {
            return <div style={{minWidth: 70}}>{value && value.describe}</div>;
          }} />
          <Column title="问题原因" dataIndex="skuExcelItem" render={(value) => {
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
        load? <Space>
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
      footer={load && [
        <Button
          key="0"
          type="primary"
          ghost
          disabled={
            selectedRows.length !== 1
          }
          onClick={() => {
            const row = selectedRows[0];
            const skuResult = row.simpleResult || {};
            const describe = row.describe;
            setErrKeys([row.detailId]);
            addRef.current.open({
              defaultValue: {
                spuClass: row.classId,
                spu: {id: skuResult.spuId, name: row.classItem},
                skuName: row.skuName,
                unitId: row.unitId,
                standard: row.standard,
                batch: row.isNotBatch === '是' ? 1 : 0,
                specifications: row.specifications,
                sku: describe && describe.split(',').map((item) => {
                  return {
                    label: item.split(':')[0],
                    value: item.split(':')[1],
                  };
                }),
              }
            });
          }}>
          处理
        </Button>,
        <Button
          key="2"
          disabled={selectedRows.length !== 1 || disabled}
          type="primary"
          ghost
          onClick={() => {
            const row = selectedRows[0];
            const skuData = row.simpleResult || {};

            const describe = [];
            row.describe && row.describe.split(',').map((item) => {
              return describe.push({
                label: item.split(':')[0],
                value: item.split(':')[1],
              });
            });

            skuData.list.map((item) => {
              return describe.push({
                label: item.itemAttributeResult && item.itemAttributeResult.attribute,
                value: item.attributeValues,
              });
            });
            setErrKeys([row.detailId]);
            addRef.current.open({
              errKey: row.detailId,
              ...skuData,
              specifications:row.specifications || skuData.specifications,
              newCoding: row.standard,
              merge: true,
              skuJsons: [],
              defaultValue: {
                sku: describe
              }
            });
          }}>
          合并
        </Button>,
        <Button
          key="1"
          disabled={selectedRows.length === 0 || disabled || codingDisabled}
          type="primary"
          ghost
          onClick={() => {
            setErrKeys(selectedRows.map(item => item.detailId));
            addSkuRef.current.batchRun({
              data: {
                skuParams: selectedRows.map((item) => {
                  const skuResult = item.simpleResult || {};
                  const spuResult = skuResult.spuResult || {};
                  const describe = item.describe;

                  return {
                    standard: item.standard,
                    spuClass: skuResult.spuClass,
                    spu: {id: skuResult.spuId, name: spuResult.name},
                    skuName: skuResult.skuName,
                    unitId: spuResult.unitId,
                    batch: item.isNotBatch === '是' ? 1 : 0,
                    specifications: item.specifications,
                    sku: describe && describe.split(',').map((item) => {
                      return {
                        label: item.split(':')[0],
                        value: item.split(':')[1],
                      };
                    }),
                  };
                })
              }
            });
          }}>
          直接导入
        </Button>,
      ]}
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

export default React.forwardRef(SkuImport);
