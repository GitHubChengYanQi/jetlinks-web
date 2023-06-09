import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';
import Box from '@/pages/statistical/components/Tenant/components/Box';
import styles from './index.module.less';

const AlarmReport = ({alarmData = {}}) => {

  useEffect(() => {
    const data = [
      {item: '未处理', percent: alarmData.errorNum},
      {item: '已处理', percent: alarmData.handleNum},
    ];
    const chart = new G2.Chart({
      padding: {top: 50, right: 50, bottom: 50, left: 50},
      container: 'AlarmReport',
      forceFit: true,
      height: document.documentElement.clientHeight * 0.25,
      animate: false
    });
    chart.source(data);
    chart.coord('theta');
    chart.tooltip({
      showTitle: false,
      itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });

    chart.legend(false);
    chart.intervalStack()
      .position('percent')
      .color('item')
      .label('percent', {
        textStyle: {
          fill: '#fff'
        },
        formatter: (val, item) => {
          return item.point.item + ': ' + val;
        }
      })
      .tooltip('item*percent', (item, percent) => {
        return {
          name: item,
          value: percent
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff'
      }).select(false);
    chart.render();
  }, []);

  return <Box>
    <div className={styles.alarmReport}>
      <div className={styles.alarmNumber}>
        <div>
          <div style={{color: '#129ad9'}} className={styles.label}>
            报警总数
          </div>
          <div className={styles.value}>{alarmData.allNum}</div>
        </div>
        <div>
          <div style={{color: '#04a3a6'}} className={styles.label}>
            已处理
          </div>
          <div className={styles.value}>{alarmData.handleNum}</div>
        </div>
        <div>
          <div style={{color: '#f15d66'}} className={styles.label}>
            未处理
          </div>
          <div className={styles.value}>{alarmData.errorNum}</div>
        </div>
      </div>
      <div className={styles.report} id="AlarmReport" />
    </div>
  </Box>;
};

export default AlarmReport;
