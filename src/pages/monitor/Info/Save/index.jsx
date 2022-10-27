import React, {useEffect, useState} from 'react';
import {Button, Drawer, Empty, message, Modal, Select, Space, Spin} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {useRequest} from '@/util/Request';
import {alarmListSelect} from '@/pages/alarm/url';
import Warning from '@/components/Warning';
import {deviceEdit} from '@/pages/equipment/Equipment/url';
import AlarmDetail from '@/pages/alarm/Rule/AlarmDetail';
import {isArray} from '@/util/Tools';
import RuleSave from '@/pages/alarm/Rule/Save';

const Save = (
  {
    device = {},
    close = () => {
    },
    success = () => {
    },
    visible,
  }
) => {

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

  const {loading, run} = useRequest(deviceEdit, {
    manual: true,
    onSuccess: () => {
      message.success('保存成功！');
      success();
    },
  });

  const {loading: ruleListLoading, run: getRuleList,refresh} = useRequest(alarmListSelect, {
    manual: true,
    onSuccess: (res) => {
      setRules(res);
    },
  });

  useEffect(() => {
    setData(isArray(device.alarmResults).map(item => ({alarmId: item.alarmId})));
    if (device.modelId) {
      getRuleList({data: {modelId: device.modelId}});
    }
  }, [device.modelId]);


  const options = rules.map(item => {
    const disabled = data.some(dataItem => dataItem.alarmId === item.value);
    return {...item, disabled};
  });

  return (
    <Modal
      afterClose={() => setData([])}
      title="设置报警规则"
      zIndex={1001}
      open={visible}
      centered
      okText="保存"
      cancelText="取消"
      okButtonProps={{loading}}
      onOk={() => {
        run({
          data: {
            deviceId: device.deviceId,
            alarmIds: data.map(item => item.alarmId)
          }
        });
      }}
      onCancel={() => close()}
    >
      <Spin spinning={ruleListLoading}>
        <div style={{textAlign: 'center'}}>
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
                        setSaveVisible({modelId: device.modelId});
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
        width={1000}
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
        success={(success) => {
          setSaveVisible();
          refresh();
        }}
      />
    </Modal>
  );
};

export default Save;
