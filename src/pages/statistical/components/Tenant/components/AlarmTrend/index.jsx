import React, {useEffect, useState} from 'react';
import * as G2 from '@antv/g2';
import {Button, Space} from 'antd';
import Box from '@/pages/statistical/components/Tenant/components/Box';
import styles from './index.module.less';

const AlarmTrend = () => {

  const [type, setType] = useState('day');

  useEffect(() => {
    const data = [
      {year: '1991', value: 3},
      {year: '1992', value: 4},
      {year: '1993', value: 3.5},
      {year: '1994', value: 5},
      {year: '1995', value: 4.9},
      {year: '1996', value: 6},
      {year: '1997', value: 7},
      {year: '1998', value: 9},
      {year: '1999', value: 13}
    ];
    const chart = new G2.Chart({
      padding: {top: 20, right: 50, bottom: 50, left: 50},
      container: 'AlarmTrend',
      forceFit: true,
      height: 300
    });
    chart.source(data);
    chart.scale('value', {
      min: 0
    });
    chart.scale('year', {
      range: [0, 1]
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.axis('year', {
      label: {
        textStyle: {
          fill:'#fff'
        }
      }
    });
    chart.axis('value', {
      label: {
        textStyle: {
          fill:'#fff'
        }
      }
    });
    chart.line().position('year*value');
    chart.render();
  }, []);

  return <Box>
    <div className={styles.header}>
      <div className={styles.title}>设备报警走势图</div>
      <div className={styles.screen}>
        <Space>
          <Button type={type === 'day' ? 'link' : 'text'} onClick={() => setType('day')}>今日</Button>
          <Button type={type === 'week' ? 'link' : 'text'} onClick={() => setType('week')}>本周</Button>
          <Button type={type === 'month' ? 'link' : 'text'} onClick={() => setType('month')}>本月</Button>
        </Space>
      </div>
    </div>
    <div id="AlarmTrend"/>
  </Box>;
};

export default AlarmTrend;
