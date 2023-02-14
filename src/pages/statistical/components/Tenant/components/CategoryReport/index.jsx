import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';
import Box from '@/pages/statistical/components/Tenant/components/Box';
import styles from './index.module.less';

const CategoryReport = ({categoryResults = []}) => {

  useEffect(() => {
    let total = 0;
    let percent = 0;
    categoryResults.forEach(item => total += item.deviceNum);
    const data = categoryResults.map((item, index) => {
      if (index === categoryResults.length - 1) {
        return {item: item.name, percent: percent ? (100 - percent) : (Math.round((item.deviceNum / total) * 100) || 0)};
      }
      percent += Math.round((item.deviceNum / total) * 100) || 0;
      return {item: item.name, percent: Math.round((item.deviceNum / total) * 100) || 0};
    });
    const chart = new G2.Chart({
      padding: {top: 20, right: 100, bottom: 20, left: 50},
      container: 'CategoryReport',
      forceFit: true,
      height: document.documentElement.clientHeight * 0.25 - 50,
      animate: false
    });
    chart.source(data, {
      percent: {
        formatter: val => {
          return `${val}%`;
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
      .color('item', ['#e8385c', '#7b00ff', '#00d7e9', '#007aff','#568f32'])
      .label('percent', {
        textStyle: {
          fill: '#fff'
        },
      })
      .tooltip('item*percent', (item, percent) => {
        return {
          name: item,
          value: `${percent}%`
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff'
      }).select(false);
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
