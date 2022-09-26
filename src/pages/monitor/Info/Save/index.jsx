import React, {useState} from 'react';
import {Card, Input, message, Modal} from 'antd';
import styles from './index.module.less';
import Config from '@/pages/monitor/components/Config';
import Contacts from '@/pages/alarm/Contacts';
import {useRequest} from '@/util/Request';
import {alarmAdd} from '@/pages/alarm/url';


const Save = (
  {
    device = {},
    close = () => {
    },
    visible,
    modelColumns = [],
  }
) => {

  const [data, setData] = useState({});

  const {loading, run} = useRequest(alarmAdd, {
    manual: true,
    onSuccess: () => {
      message.success('保存成功！');
      close();
    },
    onError: () => message.error('保存失败！')
  });

  return (
    <Modal
      zIndex={1001}
      open={visible}
      centered
      width="50vw"
      okText="确定"
      cancelText="取消"
      okButtonProps={{loading}}
      onOk={() => {
        run({
          data: {
            deviceId: device.deviceId,
            modelId: device.modelId,
            ...data,
          }
        });
      }}
      onCancel={() => close()}
    >
      <Card className={styles.card} title={<div className={styles.title}>基本信息</div>} bordered={false}>
        <div className={styles.name}>
          <span>规则名称:</span>
          <Input placeholder="请输入规则名称" onChange={({target: {value}}) => {
            setData({...data, name: value});
          }} />
        </div>
      </Card>
      <Card className={styles.card} title={<div className={styles.title}>报警配置</div>} bordered={false}>
        <Config fileds={modelColumns} onChange={(value = []) => {
          setData({...data, rules: value});
        }} />
      </Card>
      <Card className={styles.card} title={<div className={styles.title}>报警人员</div>} bordered={false}>
        <Contacts noAction onChange={(value) => {
          setData({...data, userIds: value});
        }} />
      </Card>
    </Modal>
  );
};

export default Save;
