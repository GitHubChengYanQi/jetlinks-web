import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';
import styles from './index.module.less';

const DeviceReport = () => {

  useEffect(() => {
    const data = [
      {item: '库存数量', count: 50, percent: 0.5, color: 'red'},
      {item: '出库数量', count: 50, percent: 0.5},
    ];
    const chart = new G2.Chart({
      container: 'deviceInOutReport',
      padding: 0,
      height: 200,
      forceFit: true,
    });
    chart.source(data, {
      percent: {
        formatter: val => {
          val = (val * 100) + '%';
          return val;
        }
      }
    });
    chart.legend(false);
    chart.coord('theta', {
      radius: 0.75
    });
    chart.tooltip({
      showTitle: false,
      itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });
    chart.intervalStack()
      .position('percent')
      .color('item',['#68bbc4','#5087ec'])
      .label('percent', {
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


  useEffect(() => {
    const data = [
      {item: '在线数量', count: 40, percent: 0.4},
      {item: '离线数量', count: 21, percent: 0.21},
    ];
    const chart = new G2.Chart({
      container: 'deviceReport',
      padding: 0,
      forceFit: true,
      height: 376,
    });
    chart.source(data, {
      percent: {
        formatter: val => {
          val = (val * 100) + '%';
          return val;
        }
      }
    });
    chart.coord('theta', {
      radius: 0.75,
      innerRadius: 0.6
    });
    chart.tooltip({
      showTitle: false,
      itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });

    chart.intervalStack()
      .position('percent')
      .color('item',['#f9c78b','#f39423'])
      .label('percent', {
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
    chart.legend(false);
    chart.render();
  }, []);

  return <>
    <div className={styles.box}>
      <div className={styles.title}>
        设备总览
      </div>
      <div id="deviceReport" className={styles.deviceReport}></div>
      <div id="deviceInOutReport" className={styles.deviceInOutReport}></div>
    </div>
  </>;
};

export default DeviceReport;
