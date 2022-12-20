import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import styles from './index.module.less';

const InOutDeviceReport = () => {


  useEffect(() => {
    // 此处数据使用了按行组织的模式，所以需要使用 DataSet 的 fold 方法对数据进行加工
    const data = [
      {
        name: '出库设备',
        '智能箱1': 18.9,
        '智能箱2': 28.8,
        '智能箱3': 39.3,
        '智能箱4': 81.4,
        '智能箱5': 47,
        '智能箱6': 20.3,
        '智能箱7': 24,
        '智能箱8': 35.6
      },
      {
        name: '入库设备',
        '智能箱1': 19.9,
        '智能箱2': 28.8,
        '智能箱3': 39.3,
        '智能箱4': 81.4,
        '智能箱5': 47,
        '智能箱6': 20.3,
        '智能箱7': 24,
        '智能箱8': 35.6
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['智能箱1', '智能箱2', '智能箱3', '智能箱4', '智能箱5', '智能箱6', '智能箱7', '智能箱8'], // 展开字段集
      key: '月份', // key字段
      value: '月均降雨量' // value字段
    });

    const chart = new G2.Chart({
      padding: {top: 60, right: 30, bottom: 20, left: 60},
      container: 'InOutDeviceReport',
      forceFit: true,
      height: 300
    });
    chart.source(dv);
    chart.legend('name', {
      position: 'top'
    });
    chart.intervalStack()
      .position('月份*月均降雨量')
      .color('name');
    chart.render();
  }, []);

  return <>
    <div className={styles.box}>
      <div className={styles.title}>
        出入库设备
      </div>
      <div id="InOutDeviceReport"></div>
    </div>
  </>;
};

export default InOutDeviceReport;
