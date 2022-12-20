import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';
import Box from '@/pages/statistical/components/Tenant/components/Box';
import styles from './index.module.less';

const CategoryReport = () => {

  useEffect(() => {
    const data = [
      {item: '类别1', count: 40, percent: 0.4},
      {item: '类别2', count: 21, percent: 0.21},
      {item: '类别3', count: 21, percent: 0.21},
      {item: '类别4', count: 21, percent: 0.21},
    ];
    const chart = new G2.Chart({
      padding: {top: 50, right: 70, bottom: 50, left: 50},
      container: 'CategoryReport',
      forceFit: true,
      height: 300,
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
    chart.legend('item', {
      position: 'right-center',
      marker: 'hyphen',
      textStyle: {
        fill: '#fff'
      }
    });
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
    <div className={styles.title}>
      设备类别
    </div>
    <div id="CategoryReport"/>
  </Box>;
};

export default CategoryReport;
