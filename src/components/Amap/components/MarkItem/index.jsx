import React, {useState} from 'react';
import {Button, Col, Modal, Popover, Row, Space} from 'antd';
import classNames from 'classnames';
import {CloseOutlined} from '@ant-design/icons';
import moment from 'moment';
import error from '@/asseset/imgs/error.svg';
import online from '@/asseset/imgs/online.svg';
import offline from '@/asseset/imgs/offline.svg';
import styles from '@/components/Amap/index.module.less';

const MarkItem = ({device, id, onMarkerClick, onHistory}) => {

  const [open, setOpen] = useState(false);

  const deviceOnline = device.status === 'online';

  const runTime = () => {
    if (!deviceOnline) {
      return '-';
    }
    const oldsecond = moment(new Date()).diff(device.logTime, 'second');
    const day = Math.floor(oldsecond / 86400) || 0;
    const hours = Math.floor((oldsecond % 86400) / 3600) || 0;
    const minutes = Math.floor(((oldsecond % 86400) % 3600) / 60) || 0;
    const newsecond = Math.floor(((oldsecond % 86400) % 3600) % 60) || 0;
    return <> {day}天{hours}时{minutes}分{newsecond}秒</>;
  };

  let mark = '';
  let title = '';
  let className = '';
  if (device.ruleConditionJson) {
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
  return <div id={id}>
    <div onClick={() => setOpen(true)}>
      <img width="30px" height="37px" src={mark} alt="" />
    </div>

    <Modal
      mask={false}
      maskClosable={false}
      centered
      className={classNames(styles.modal,className)}
      width={700}
      title={title}
      onCancel={() => setOpen(false)}
      open={open}
      footer={null}
    >
      <Row style={{width:'100%'}}>
        <Col span={12}>
          <Space direction="vertical" size={8} style={{width: '100%'}}>
            <div className={styles.leftRow}>
              <div>设备状态</div>
              ：
              <span style={{color: deviceOnline ? '#00a660' : '#b2b1b1'}}>{deviceOnline ? '在线' : '离线'}</span>
            </div>
            <div className={styles.leftRow}>
              <div>设备类别</div>
              ：{device.categoryName}</div>
            <div className={styles.leftRow}>
              <div>终端备注</div>
              ：{device.remarks}</div>
            <div className={styles.leftRow}>
              <div>设备型号</div>
              ：{device.modelName}</div>
            <div className={styles.leftRow}>
              <div>IP地址</div>
              ：{device.ip}</div>
            <div className={styles.leftRow}>
              <div>MAC地址</div>
              ：{device.mac}</div>
            <div className={styles.leftRow}>
              <div>位置信息</div>
              ：{device.area}</div>
            <div className={styles.leftRow}>
              <div>GPS定位</div>
              ：{device.longitude || '-'}，{device.latitude || '-'}</div>
            <div className={styles.leftRow}>
              <div>设备分组</div>
              ：{device.classifyName}
            </div>
          </Space>
        </Col>
        <Col span={12} className={styles.rightCol}>
          <Space direction="vertical" size={8} style={{width: '100%'}}>
            <div className={styles.rightRow}>
              <div>运行时间：</div>
              <span style={{color: '#00a660'}}>{runTime() || '-'}</span>
            </div>
            <div className={styles.rightRow}>
              <div>上次上线时间：</div>
              <span style={{color: '#00a660'}}>{deviceOnline ? (device.logTime || '-') : '-'}</span>
            </div>
            <div className={styles.rightRow}>
              <div>上次离线时间：</div>
              <span style={{color: '#00a660'}}>{!deviceOnline ? (device.logTime || '-') : '-'}</span>
            </div>
            <div className={styles.rightRow}>
              <div>升级时间：</div>
              <span style={{color: '#00a660'}}>-</span>
            </div>
          </Space>
        </Col>
      </Row>
      <div style={{marginTop: 16}}>
        <Button type="link" onClick={() => onMarkerClick(device)}>设备详情</Button>
        <Button style={{float: 'right'}} type="link" onClick={() => {
          onHistory(`/alarm/record?deviceId=${device.deviceId}`);
        }}>报警记录</Button>
      </div>
    </Modal>
  </div>;
};

export default MarkItem;
