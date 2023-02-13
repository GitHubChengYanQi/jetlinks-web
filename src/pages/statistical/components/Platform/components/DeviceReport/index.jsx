import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';
import styles from './index.module.less';

const DeviceReport = ({deviceData}) => {

  useEffect(() => {
    const data = [
      {item: '库存数量', percent: deviceData.deviceInNum},
      {item: '出库数量', percent: deviceData.deviceOutNum},
    ];
    const chart = new G2.Chart({
      container: 'deviceInOutReport',
      padding: 0,
      height: 200,
      forceFit: true,
    });
    chart.source(data);
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
      .color('item', ['#68bbc4', '#5087ec'])
      .label('percent', {
        formatter: (val, item) => {
          return item.point.item + ': ' + val;
        }
      })
      .style({
        lineWidth: 1,
        stroke: '#fff'
      }).select(false);
    chart.render();
  }, []);


  useEffect(() => {

    const data = [
      {item: '在线数量', percent: deviceData.onlineNum},
      {item: '离线数量', percent: deviceData.offlineNum,},
    ];
    const chart = new G2.Chart({
      container: 'deviceReport',
      padding: 0,
      forceFit: true,
      height: 276,
    });
    chart.source(data);
    chart.coord('theta', {
      radius: 1,
      innerRadius: 0.6
    });
    chart.tooltip({
      showTitle: false,
      itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });

    chart.intervalStack()
      .position('percent')
      .color('item', ['#f39423', '#f9c78b'])
      .label('percent', {
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
      });
    chart.legend(false);
    chart.render();
  }, []);

  return <>
    <div className={styles.box} onClick={()=>{
      console.log('设备总览');
    }}>
      <div className={styles.title}>
        设备总览
      </div>
      <div id="deviceReport" className={styles.deviceReport} />
      <div id="deviceInOutReport" className={styles.deviceInOutReport} />
    </div>
  </>;
};

export default DeviceReport;
