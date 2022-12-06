import React, {useEffect, useRef, useState} from 'react';
import {Button, Drawer, Empty, message, Select, Space, Spin} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {useRequest} from '@/util/Request';
import {alarmListSelect} from '@/pages/alarm/url';
import Warning from '@/components/Warning';
import {deviceBindAlarm} from '@/pages/equipment/Equipment/url';
import AlarmDetail from '@/pages/alarm/Rule/AlarmDetail';
import {isArray} from '@/util/Tools';
import RuleSave from '@/pages/alarm/Rule/Save';
import {monitorDetail} from '@/pages/monitor/url';
import Modal from '@/components/Modal';

const Save = (
  {
    detail,
    close = () => {
    },
    device = {},
    success = () => {
    },
    visible,
  }
) => {

  const ref = useRef(null);

  const [data, setData] = useState([]);

  const [saveVisible, setSaveVisible] = useState();

  const dataChange = (newData = {}, key) => {
    const newDataSource = data.map((item, index) => {
      if (index === key) {
        return {...item, ...newData};
      }
      return item;
    });
    setData(newDataSource);
  };

  const [open, setOpen] = useState();

  const [rules, setRules] = useState([]);

  const {loading: ruleListLoading, run: getRuleList, refresh} = useRequest(alarmListSelect, {
    manual: true,
    onSuccess: (res) => {
      setRules(res);
    },
  });

  const {loading: deviceDetailLoading, data: deviceDetail, run: deviceRun} = useRequest(monitorDetail, {
    manual: true,
    onSuccess: (res) => {
      setData(isArray(res.alarmResults).map(item => ({alarmId: item.alarmId})));
      if (res.modelId) {
        getRuleList({data: {modelId: res.modelId}});
      }
    }
  });

  const {loading, run} = useRequest(deviceBindAlarm, {
    manual: true,
    onSuccess: () => {
      message.success('保存成功！');
      success();
    },
  });
  useEffect(() => {
    if (visible) {
      if (detail) {
        setData(isArray(device.alarmResults).map(item => ({alarmId: item.alarmId})));
        if (device.modelId) {
          getRuleList({data: {modelId: device.modelId}});
        }
      } else {
        deviceRun({data: {deviceId: device.deviceId, modelId: device.modelId}});
      }
      ref.current?.open(false);
    } else {
      ref.current?.close();
    }

  }, [visible, device.modelId]);


  const options = rules.map(item => {
    const disabled = data.some(dataItem => dataItem.alarmId === item.value);
    return {...item, disabled};
  });

  return (
    <Modal
      afterClose={() => setData([])}
      headTitle="设置报警规则"
      zIndex={1001}
      ref={ref}
      onClose={close}
      footer={<Space>
        <Button type="primary" loading={loading} onClick={() => {
          run({
            data: {
              deviceId: detail ? device.deviceId : deviceDetail.deviceId,
              alarmIds: data.map(item => item.alarmId)
            }
          });
        }}>保存</Button>
        <Button onClick={close}>取消</Button>
      </Space>}
    >
      <Spin spinning={ruleListLoading || deviceDetailLoading}>
        <div style={{textAlign: 'center', padding: 24}}>
          {data.length === 0 && <Empty description={
            <>当前设备暂无规则,<Button type="link" onClick={() => {
              setData([{}]);
            }}>增加规则</Button></>
          } />}
          <Space direction="vertical" style={{width: '100%'}}>
            {
              data.map((item, index) => {
                const exit = options.some(optionItem => optionItem.value === item.alarmId);
                return <Space key={index}>
                  <Select
                    value={exit ? item.alarmId : null}
                    options={[{label: <a>新增规则</a>, value: 'add'}, ...options]}
                    placeholder="请选择规则"
                    style={{width: 300, marginRight: 16}}
                    onChange={(value) => {
                      if (value === 'add') {
                        setSaveVisible({modelId: device?.modelId || deviceDetail?.modelId});
                      } else {
                        dataChange({alarmId: value}, index);
                      }
                    }}
                  />
                  <Button disabled={!item.alarmId} type="link" style={{padding: 0}} onClick={() => {
                    setOpen(item.alarmId);
                  }}>查看</Button>
                  <Warning onOk={() => {
                    const newData = data.filter((dataItem, dataIndex) => dataIndex !== index);
                    setData(newData);
                  }}>
                    <Button type="link" danger style={{padding: 0}}><DeleteOutlined /></Button>
                  </Warning>
                </Space>;
              })
            }

            {data.length > 0 && <Button type="primary" ghost onClick={() => {
              setData([...data, {}]);
            }}><PlusOutlined />增加规则</Button>}
          </Space>
        </div>
      </Spin>

      <Drawer
        width='auto'
        zIndex={1002}
        title="查看报警规则"
        destroyOnClose
        open={open}
        onClose={() => setOpen()}
      >
        <AlarmDetail alarmId={open} />
      </Drawer>

      <RuleSave
        modelDisabled
        zIndex={1001}
        detail={saveVisible || {}}
        visible={saveVisible}
        close={() => setSaveVisible()}
        success={() => {
          setSaveVisible();
          refresh();
        }}
      />
    </Modal>
  );
};

export default Save;
