import React, {useEffect, useRef, useState} from 'react';
import {Button, message, Space} from 'antd';
import Modal from '@/components/Modal';
import Equipment from '@/pages/equipment/Equipment';
import {useRequest} from '@/util/Request';

const batchBind = {url: '/device/batchBindAlarm', method: 'POST'};

const SelectDevice = ({
  visible,
  close = () => {
  },
}) => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState([]);

  const {loading, run} = useRequest(batchBind, {
    manual: true,
    onSuccess: () => {
      message.success('应用成功！');
      close();
    }
  });

  useEffect(() => {
    if (visible) {
      setSaveVisible([]);
      ref.current.open(false);
    } else {
      ref.current.close();
    }
  }, [visible]);

  return <>
    <Modal
      onClose={close}
      width={1200}
      headTitle="选择设备"
      ref={ref}
      footer={<Space>
        <Button onClick={close}>取消</Button>
        <Button loading={loading} type="primary" disabled={saveVisible.length === 0} onClick={() => {
          run({
            data: {
              alarmRuleId: visible?.alarmId,
              deviceIds: saveVisible.map(item => item.deviceId)
            }
          });
        }}>确定</Button>
      </Space>}
    >
      <Equipment modelId={visible?.modelId} select onChange={(devices) => {
        setSaveVisible(devices);
      }} />
    </Modal>
  </>;
};

export default SelectDevice;
