import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import styles from './index.module.less';

const InOutDeviceReport = ({categoryResults = []}) => {


  useEffect(() => {
    // 此处数据使用了按行组织的模式，所以需要使用 DataSet 的 fold 方法对数据进行加工
    const inData = {name: '入库设备'};
    const outData = {name: '出库设备'};
    categoryResults.forEach(item => {
      outData[item.name] = item.deviceOutNum;
      inData[item.name] = item.deviceInNum;
    });
    const data = [
      inData,
      outData,
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: Object.keys(outData).filter(item => item !== 'name'), // 展开字段集
      key: 'title', // key字段
      value: 'number' // value字段
    });

    const chart = new G2.Chart({
      padding: {top: 60, right: 30, bottom: 20, left: 60},
      container: 'InOutDeviceReport',
      forceFit: true,
      height: document.documentElement.clientHeight * 0.3
    });
    chart.source(dv);
    chart.legend('name', {
      position: 'top'
    });
    chart.intervalStack()
      .position('title*number')
      .color('name')
      .label('number', val => {
        if (val <= 0) {
          return false;
        }
        return {
          position: 'middle',
          offset: 0,
          textStyle: {
            fill: '#fff',
            fontSize: 12,
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)'
          },
          formatter: text => {
            return text;
          }
        };
      });
    chart.render();
  }, []);

  return <>
    <div className={styles.box}  onClick={()=>{
      console.log('出入库设备');
    }}>
      <div className={styles.title}>
        出入库设备
      </div>
      <div id="InOutDeviceReport"></div>
    </div>
  </>;
};

export default InOutDeviceReport;
