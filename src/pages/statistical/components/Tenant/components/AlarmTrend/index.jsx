import React, {useEffect, useState} from 'react';
import * as G2 from '@antv/g2';
import {Button, Space, Spin} from 'antd';
import moment from 'moment';
import Box from '@/pages/statistical/components/Tenant/components/Box';
import styles from './index.module.less';
import {useRequest} from '@/util/Request';

export const chartList = {
  url: '/statistics/chartList',
  method: 'POST',
  data: {
    span: 'day',
    startTime: moment().format('YYYY/MM/DD 00:00:00'),
    endTime: moment().format('YYYY/MM/DD 23:59:59'),
  }
};

const AlarmTrend = () => {

  const [type, setType] = useState('day');

  const {loading, data: chartData = [], run} = useRequest(chartList);

  useEffect(() => {
    if (loading || !document.getElementById('AlarmTrend')) {
      return;
    }
    const chart = new G2.Chart({
      padding: {top: 20, right: 50, bottom: 50, left: 50},
      container: 'AlarmTrend',
      forceFit: true,
      height: 200
    });
    chart.source(chartData);

    chart.axis('time', {
      label: {
        textStyle: {
          fill: '#fff'
        }
      }
    });
    chart.axis('value', {
      label: {
        textStyle: {
          fill: '#fff'
        }
      }
    });
    chart.tooltip({
      itemTpl: `<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>报警数: {value}</li>`, // tooltip 每项记录的默认模板
    });
    chart.line().position('time*value');
    chart.render();
  }, [loading]);

  const submit = ({span, startTime, endTime}) => {
    run({
      data: {
        span,
        startTime,
        endTime,
      }
    });
    setType(span);
  };

  return loading ? <div style={{padding: 24, textAlign: 'center'}}><Spin size="large" /></div> : <Box>
    <div className={styles.header}>
      <div className={styles.title}>设备报警走势图</div>
      <div className={styles.screen}>
        <Space>
          <Button type={type === 'day' ? 'link' : 'text'} onClick={() => {
            const startTime = moment().format('YYYY/MM/DD 00:00:00');
            const endTime = moment().format('YYYY/MM/DD 23:59:59');
            submit({span: 'day', startTime, endTime});
          }}>今日</Button>
          <Button type={type === 'week' ? 'link' : 'text'} onClick={() => {
            const startTime = moment(new Date()).isoWeekday(1).format('YYYY/MM/DD HH:mm:ss');
            const endTime = moment(new Date()).isoWeekday(7).format('YYYY/MM/DD HH:mm:ss');
            submit({span: 'week', startTime, endTime});
          }}>本周</Button>
          <Button type={type === 'month' ? 'link' : 'text'} onClick={() => {
            const startTime = moment(moment().month(moment().month()).startOf('month').valueOf()).format('YYYY/MM/DD HH:mm:ss');
            const endTime = moment(moment().month(moment().month()).endOf('month').valueOf()).format('YYYY/MM/DD HH:mm:ss');
            submit({span: 'month', startTime, endTime});
          }}>本月</Button>
        </Space>
      </div>
    </div>
    <div id="AlarmTrend" />
  </Box>;
};

export default AlarmTrend;
