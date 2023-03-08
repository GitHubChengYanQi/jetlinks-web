import React, {useEffect, useRef, useState} from 'react';
import {getSearchParams, useHistory} from 'ice';
import {Button, message, Modal, Space, Table} from 'antd';
import moment from 'moment';
import {PrimaryButton} from '@/components/Button';
import Render from '@/components/Render';
import Save, {getSecond} from '@/pages/alarm/AlarmProject/Save';
import AlarmTime from '@/pages/alarm/AlarmProject/components/AlarmTime';
import Drawer from '@/components/Drawer';
import ContactList from '@/pages/alarm/AlarmProject/components/ContactList';
import style from '@/components/Table/index.module.less';
import {useRequest} from '@/util/Request';
import Note from '@/components/Note';
import {
  alarmItemFindAll,
  alarmItemStartBatch,
  alarmItemStopBatch,
  alarmItemUpdateBatch
} from '@/pages/alarm/AlarmProject/url';
import {isArray} from '@/util/Tools';

const AlarmProject = (
  {
    deviceId,
    modelId,
    custom,
    global,
    categoryName,
    modelName
  }
) => {

  const drawerRef = useRef();

  const history = useHistory();

  const currentModelId = modelId;

  const [rows, setRows] = useState([]);

  const [groupIds, setGroupIds] = useState([]);
  const [row, setRow] = useState([]);

  const [openTime, set0penTime] = useState(false);

  const [saveVisible, setSaveVisible] = useState();

  const [dataSource, setDatSource] = useState([]);

  const [time, setTime] = useState();

  const {loading: getRulesLoaing, run: getRules, refresh: refreshRules} = useRequest(alarmItemFindAll, {
    manual: true,
    onSuccess: (res) => {
      setDatSource(res);
    },
  });

  const {loading: updateBatchLoading, run: updateBatchRun} = useRequest(alarmItemUpdateBatch, {
    manual: true,
    onSuccess: () => {
      set0penTime(false);
      message.success('设置成功！');
      setRows([]);
      refreshRules();
    }
  });

  const {loading: stopBatchLoading, run: stopBatchRun} = useRequest(alarmItemStopBatch, {
    manual: true,
    onSuccess: () => {
      set0penTime(false);
      setRows([]);
      message.success('停用成功！');
      refreshRules();
    }
  });

  const {loading: startBatchLoading, run: startBatchRun} = useRequest(alarmItemStartBatch, {
    manual: true,
    onSuccess: () => {
      set0penTime(false);
      setRows([]);
      message.success('启用成功！');
      refreshRules();
    }
  });

  useEffect(() => {
    if (currentModelId) {
      getRules({data: {modelId: currentModelId, deviceId: custom ? deviceId : null}});
    }
  }, [global]);

  const columns = [
    {
      title: '序号',
      width: 50,
      dataIndex: 'name',
      align: 'center',
      render: (text, record, index) => <Render>{index + 1}</Render>
    },
    {title: '报警名称', dataIndex: 'title', render: (text) => <Render text={text}/>},
    {
      title: '监测类别',
      dataIndex: 'category',
      onCell: (record, index) => {
        let num = 0;
        let stop = false;
        dataSource.forEach((dataItem, dataIndex) => {
          if (dataIndex >= index && !stop) {
            if (dataItem.category === record.category) {
              num += 1;
            } else {
              stop = true;
            }
          }

        });
        return {
          // eslint-disable-next-line no-nested-ternary
          rowSpan: index === 0 ? num : (record.category === dataSource[index - 1].category ? 0 : num),
        };
      },
      render: (text) => <Render text={text}/>
    },
    {
      title: '报警通知预案',
      dataIndex: 'alarmItemResult',
      render: (alarmItemResult, record) =>
        <Note
          value={alarmItemResult?.reservePlan || record.reservePlan}
          maxWidth={200}
        />
    },
    {
      title: '报警时间间隔',
      dataIndex: 'alarmItemResult',
      align: 'center',
      render: (alarmItemResult, record) => {
        if (!alarmItemResult?.viewTime && !record.viewTime) {
          return '-';
        }
        const times = (alarmItemResult?.viewTime || record.viewTime || '').split(',');
        const day = times[0] || 0;
        const hour = times[1] || 0;
        const min = times[2] || 0;
        return <Render width={110}>{`${day} 天 ${hour} 小时 ${min} 分钟`}</Render>;
      }
    },
    {
      title: '报警联系人组',
      dataIndex: 'alarmItemResult',
      align: 'center',
      render: (alarmItemResult, record) => {
        if (isArray(alarmItemResult.bindResults).length === 0) {
          return '-';
        }
        return <Button type="link" onClick={() => {
          setRow(record);
          setGroupIds([...new Set(isArray(alarmItemResult.bindResults).map(item => item.group?.groupId))]);
          drawerRef.current.open(true);
        }}>{[...new Set(isArray(alarmItemResult.bindResults).map(item => item.group?.name))].join('、')}</Button>;
      }
    },
    {
      title: '报警状态', dataIndex: 'alarmItemResult', align: 'center', render: (alarmItemResult) => {
        const open = alarmItemResult?.status === 1;
        return <Render>
          <span className={open ? 'green' : 'red'}>{open ? '启用' : '停用'}</span>
        </Render>;
      }
    }
  ];

  if (!global) {
    columns.push({
      title: '操作', dataIndex: 'deviceNum', align: 'center', render: (value, record) => (
        <Space>
          <PrimaryButton onClick={() => {
            const alarmItemResult = record.alarmItemResult || {};
            setSaveVisible({
              ...record,
              status: alarmItemResult.status
            });
          }}>
            编辑
          </PrimaryButton>
        </Space>
      )
    },);
  }

  const getIds = () => {
    const itemIds = [];
    const itemKeys = [];
    rows.forEach(item => {
      if (item.alarmItemResult?.itemId) {
        itemIds.push(item.alarmItemResult?.itemId);
      } else {
        itemKeys.push(item.key);
      }
    });
    return {
      modelId: currentModelId,
      itemIds,
      itemKeys
    };
  };


  const getRows = () => {
    const updateParams = [];
    const addParams = [];
    rows.forEach(item => {
      const data = {
        reservePlan: item.alarmItemResult?.reservePlan || item.reservePlan,
        viewTime: item.alarmItemResult?.viewTime || item.viewTime || '',
        timeSpan: item.alarmItemResult?.timeSpan || item.timeSpan
      };
      if (item.alarmItemResult?.itemId) {
        updateParams.push({
          itemId: item.alarmItemResult?.itemId,
          ...data
        });
      } else {
        addParams.push({
          itemKey: item.key,
          ...data
        });
      }
    });
    return {
      modelId: currentModelId,
      updateParams,
      addParams
    };
  };

  return <>
    <div hidden={custom || global}>
      <h3>设备类型：{categoryName}</h3>
      <h3>设备型号：{modelName}</h3>
    </div>

    <div hidden={global} style={{textAlign: 'right', padding: '0 24px 12px'}}>
      <Space>
        <Button
          disabled={rows.length === 0}
          type="primary"
          onClick={() => {
            setTime(null);
            set0penTime(true);
          }}
        >
          批量设置报警时间间隔
        </Button>
        <Button
          loading={startBatchLoading}
          disabled={rows.length === 0}
          type="primary"
          onClick={() => {
            startBatchRun({data: {...getRows(), deviceId}});
          }}
        >
          批量启用
        </Button>
        <Button
          loading={stopBatchLoading}
          disabled={rows.length === 0}
          type="primary"
          onClick={() => {
            stopBatchRun({data: {...getIds(), deviceId}});
          }}
        >
          批量停用
        </Button>
      </Space>
    </div>
    <Table
      loading={getRulesLoaing}
      bordered
      onHeaderRow={() => {
        return {
          className: style.headerRow
        };
      }}
      rowSelection={global ? undefined : {
        selectedRowKeys: rows.map(item => item.key),
        onChange: (row, selectedRows) => {
          setRows(selectedRows);
        }
      }}
      pagination={false}
      dataSource={dataSource}
      tableKey="model"
      columns={columns}
      rowKey="key"
    />

    <Save
      deviceId={deviceId}
      modelId={currentModelId}
      data={saveVisible}
      visible={saveVisible}
      success={(success) => {
        setSaveVisible();
        refreshRules();
      }} close={() => setSaveVisible()}/>

    <Modal
      title="设置报警时间间隔"
      open={openTime}
      width={500}
      okButtonProps={{loading: updateBatchLoading}}
      onOk={() => {
        if (!time) {
          message.warning('请选择时间间隔!');
          return;
        }
        updateBatchRun({
          data: {
            deviceId,
            ...getIds(),
            viewTime: time,
            timeSpan: getSecond(time)
          }
        });
      }}
      onCancel={() => set0penTime(false)}
    >
      <div style={{textAlign: 'center'}}>
        <AlarmTime value={time} width={400} onChange={(value) => {
          setTime(value);
        }}/>
      </div>
    </Modal>

    <Drawer
      width="auto"
      headTitle={`报警名称:${row.title}`}
      ref={drawerRef}
    >
      <ContactList groupIds={groupIds} show={custom || global}/>
    </Drawer>
  </>;
};

export default AlarmProject;
