import React, {useImperativeHandle, useRef, useState} from 'react';
import {Alert, Button, Input, Progress, Space, Spin, Table as AntTable} from 'antd';
import Table from '@/components/Table';
import Form from '@/components/Form';
import {useRequest} from '@/util/Request';
import Empty from '@/components/Empty';
import Modal from '@/components/Modal';
import AddSkuModal from '@/pages/Erp/sku/SkuTable/AddSkuModal';

const {Column} = AntTable;
const {FormItem} = Form;

const api = {url: '/asynTaskDetail/list', method: 'POST'};

const SkuImport = ({...props}, ref) => {

  const tableRef = useRef();

  const modalRef = useRef();

  const addSkuRef = useRef();

  const addRef = useRef();

  const [taskId, setTaskId] = useState();

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
    if (data.allCount !== data.count) {
      return <div style={{width: 500, textAlign: 'center', padding: 24}}>
        <Progress
          width={120}
          type="circle"
          format={percent => {
            return <div style={{fontSize: 16}}>
              {`分析中 ${percent}%`}
            </div>;
          }}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={(Math.floor((data.count / data.allCount) * 100))}
        />
      </div>;
    } else {
      return <div style={{maxWidth: 1700}}>
        <Table
          contentHeight
          headStyle={{display: 'none'}}
          api={api}
          rowKey="detailId"
          searchForm={searchForm}
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
          }}
        >
          <Column title="错误行" dataIndex="skuExcelItem" render={(value) => {
            return <div style={{minWidth: 70}}>{value && value.line}</div>;
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
        <Space>
          <div>
            导入成功 <Button type="link" style={{padding: 0}}>{data && data.successNum}</Button> 条
          </div>
          /
          <div>
            导入失败 <Button type="link" style={{padding: 0}} danger>{data && data.errorNum}</Button> 条
          </div>
        </Space>
      }
      width="auto"
      footer={[
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
            const spuResult = skuResult.spuResult || {};
            const describe = row.describe || '';

            addRef.current.open({
              errKey: row.key,
              defaultValue: {
                spuClass: skuResult.spuClass,
                spu: {id: skuResult.spuId, name: spuResult.name},
                skuName: skuResult.skuName,
                unitId: spuResult.unitId,
                standard: row.standard,
                batch: row.isNotBatch === '是' ? 1 : 0,
                specifications: skuResult.specifications,
                sku: describe.split(',').map((item) => {
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
          disabled={selectedRows.length !== 1 || disabled || !codingDisabled}
          type="primary"
          ghost
          onClick={() => {
            const row = selectedRows[0];
            const skuData = row.simpleResult || {};

            const describe = [];
            row.describe.split(',').map((item) => {
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

            addRef.current.open({
              errKey: row.key,
              ...skuData,
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
          // loading={nextLoading}
          disabled={selectedRows.length === 0 || disabled || codingDisabled}
          type="primary"
          ghost
          onClick={() => {
            addSkuRef.current.batchAdd({
              data: {
                skuParams: selectedRows.map((item) => {
                  const skuResult = item.simpleResult || {};
                  const spuResult = skuResult.spuResult || {};
                  const describe = item.describe || '';

                  return {
                    standard: item.standard,
                    spuClass: skuResult.spuClass,
                    spu: {id: skuResult.spuId, name: spuResult.name},
                    skuName: skuResult.skuName,
                    unitId: spuResult.unitId,
                    batch: item.isNotBatch === '是' ? 1 : 0,
                    specifications: item.specifications,
                    sku: describe.split(',').map((item) => {
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

    <AddSkuModal addRef={addRef} tableRef={tableRef} ref={addSkuRef} edit copy={false} />
  </>;
};

export default React.forwardRef(SkuImport);
