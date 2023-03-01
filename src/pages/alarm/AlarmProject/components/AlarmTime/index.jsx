import React, {useState} from 'react';
import {Button, Input, Popover} from 'antd';
import {ClockCircleOutlined} from '@ant-design/icons';
import styles from './index.module.less';

const AlarmTime = ({value, onChange}) => {

  const times = (value || '').split(',');
  const day = times[0] || 0;
  const hour = times[1] || 0;
  const min = times[2] || 0;

  const [open, setOpen] = useState(false);

  const content = () => {
    return <div>
      <div className={styles.times}>
        <div className={styles.box}>
          {
            new Array(30).fill('').map((item, index) => {
              return <div className={day === `${index}` ? styles.check : ''} key={index} onClick={() => {
                onChange(`${index},${hour},${min}`);
              }}>
                {index}天
              </div>;
            })
          }
        </div>
        <div className={styles.box}>
          {
            new Array(25).fill('').map((item, index) => {
              return <div className={hour === `${index}` ? styles.check : ''} key={index} onClick={() => {
                onChange(`${day},${index},${min}`);
              }}>
                {index}小时
              </div>;
            })
          }
        </div>
        <div className={styles.box}>
          {
            new Array(60).fill('').map((item, index) => {
              return <div className={min === `${index}` ? styles.check : ''} key={index} onClick={() => {
                onChange(`${day},${hour},${index}`);
              }}>
                {index}分钟
              </div>;
            })
          }
        </div>
      </div>
      <div style={{textAlign: 'right',paddingTop:8}}>
        <Button type="primary" size='small' onClick={() => {
          setOpen(false);
        }}>确定</Button>
      </div>
    </div>;
  };

  return <div>
    <Popover
      open={open}
      content={content()}
      trigger="click"
      placement="bottom"
      onOpenChange={(value) => setOpen(value)}
    >
      <Input
        value={`${day} 天 ${hour} 小时 ${min} 分钟`}
        suffix={<ClockCircleOutlined/>}
      />
    </Popover>
  </div>;
};

export default AlarmTime;
