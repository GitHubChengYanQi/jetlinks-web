import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';
import styles from './index.module.less';

const CategoryReport = ({categoryResults = []}) => {


  useEffect(() => {
    // 注意由于分类轴的顺序是从下往上的，所以数组的数值顺序要从小到大
    const data = categoryResults.map(item => ({
      name: item.name,
      number: item.deviceNum
    }));
    const chart = new G2.Chart({
      padding: {top: 20, right: 30, bottom: 20, left: 80},
      container: 'CategoryReport',
      forceFit: true,
      height: 300,
    });
    chart.source(data);
    chart.axis('name', {
      label: {
        offset: 12
      }
    });
    chart.coord().transpose();
    chart.interval().position('name*number') .label('number', val => {
      if (val <= 0) {
        return false;
      }
      return {
        position: 'top',
        offset: 10,
        textStyle: {
          fill: '#3aa1ff',
          fontSize: 12,
        },
        formatter: text => {
          return text;
        }
      };
    });
    chart.tooltip({
      itemTpl: `<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>设备数: {value}</li>`, // tooltip 每项记录的默认模板
    });
    chart.render();
  }, []);

  return <>
    <div className={styles.box}>
      <div className={styles.title}>
        设备类别
      </div>
      <div id="CategoryReport"></div>
    </div>
  </>;
};

export default CategoryReport;
