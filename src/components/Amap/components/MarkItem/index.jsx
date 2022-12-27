import React, {useState} from 'react';
import {Button, Col, Modal, Row, Space, Spin} from 'antd';
import classNames from 'classnames';
import error from '@/asseset/imgs/error.svg';
import online from '@/asseset/imgs/online.svg';
import offline from '@/asseset/imgs/offline.svg';
import styles from '@/components/Amap/index.module.less';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';

export const MapDeviceDetail = {
  url: '/device/MapDeviceDetail',
  method: 'POST'
};

const MarkItem = ({device, id, onMarkerClick}) => {

  const [open, setOpen] = useState(false);

  const deviceOnline = device.status === 'online';

  let mark = '';
  let title = '';
  let className = '';
  if (device.alarm) {
    mark = error;
    title = '设备报警';
    className = styles.error;
  } else if (deviceOnline) {
    mark = online;
    title = '设备正常';
    className = styles.online;
  } else {
    mark = offline;
    title = '设备离线';
    className = styles.offline;
  }

  const {loading, data = {}, run} = useRequest(MapDeviceDetail, {manual: true});

  return <div id={id}>
    <div onClick={() => {
      run({data: {deviceId: device.deviceId}});
      setOpen(true);
    }}>
      <img width="30px" height="37px" src={mark} alt="" />
    </div>

    <Modal
      mask={false}
      maskClosable={false}
      centered
      className={classNames(styles.modal, className)}
      width={700}
      title={title}
      onCancel={() => setOpen(false)}
      open={open}
      footer={null}
    >
      <Row style={{width: '100%'}}>
        <Col span={12}>
          <Space direction="vertical" size={8} style={{width: '100%'}}>
            <div className={styles.leftRow}>
              <div>设备状态</div>
              ：
              <span style={{color: deviceOnline ? '#00a660' : '#b2b1b1'}}>{deviceOnline ? '在线' : '离线'}</span>
            </div>
            <div className={styles.leftRow}>
              <div>终端备注</div>
              ：{device.remarks}</div>
            <div className={styles.leftRow}>
              <div>设备型号</div>
              ：{device.modelName}</div>
            <div className={styles.leftRow}>
              <div>IP地址</div>
              ：
              <span>
                {device.ip ? `(外)${device.ip}` : ''} {data?.data?.devip ? <><br />(内){data?.data?.devip}</> : ''}
              </span>
            </div>
            <div className={styles.leftRow}>
              <div>MAC地址</div>
              ：{device.mac}</div>
            <div className={styles.leftRow}>
              <div>位置信息</div>
              ：{device.area}</div>
            <div className={styles.leftRow}>
              <div>GPS定位</div>
              ：{device.longitude || '-'}，{device.latitude || '-'}</div>
          </Space>
        </Col>
        <Col span={12} className={styles.rightCol}>
          <Space direction="vertical" size={8} style={{width: '100%'}}>
            {
              loading ? <div style={{textAlign: 'center'}}>
                <Spin size="large" />
              </div> : isArray(data.layout).map((item, index) => {
                let value = '';
                if (!data.data) {

                } else if (Array.isArray(data.data) && !!item.field) {
                  const arrayIndex = item.field.split('_')[0];
                  const field = item.field.split('_')[1];
                  value = data.data[arrayIndex]?.[field];
                } else {
                  value = data.data[item.field];
                }

                return <div key={index} className={styles.rightRow}>
                  <div>{item.title}</div>
                  ：{typeof value === 'number' ? `${value}` : (value || '-')}</div>;
              })
            }
          </Space>
        </Col>
      </Row>
      <div style={{marginTop: 16, textAlign: 'center'}}>
        <Button type="link" onClick={() => onMarkerClick(device)}>设备详情</Button>
      </div>
    </Modal>
  </div>;
};

export default MarkItem;
