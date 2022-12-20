import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';
import Box from '@/pages/statistical/components/Tenant/components/Box';
import styles from './index.module.less';

const AlarmReport = () => {

  useEffect(() => {
    const data = [
      {item: '未处理', count: 40, percent: 0.4},
      {item: '已处理', count: 21, percent: 0.21},
    ];
    const chart = new G2.Chart({
      padding: {top: 50, right: 50, bottom: 50, left: 50},
      container: 'AlarmReport',
      forceFit: true,
      height: 251,
      animate: false
    });
    chart.source(data, {
      percent: {
        formatter: val => {
          val = (val * 100) + '%';
          return val;
        }
      }
    });
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
        percent = percent * 100 + '%';
        return {
          name: item,
          value: percent
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });
    chart.render();
  }, []);

  return <Box>
    <div className={styles.alarmReport}>
      <div className={styles.alarmNumber}>
        <div>
          <div className={styles.label}>
            报警总数
          </div>
          <div className={styles.value}>1234</div>
        </div>
        <div>
          <div className={styles.label}>
            已处理
          </div>
          <div className={styles.value}>1234</div>
        </div>
        <div>
          <div className={styles.label}>
            未处理
          </div>
          <div className={styles.value}>1234</div>
        </div>
      </div>
      <div className={styles.report} id="AlarmReport"/>
    </div>
  </Box>;
};

export default AlarmReport;
