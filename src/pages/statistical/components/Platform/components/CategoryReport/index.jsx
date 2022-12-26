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
      height: 270,
    });
    chart.source(data);
    chart.axis('name', {
      label: {
        offset: 12
      }
    });
    chart.coord().transpose();
    chart.interval().position('name*number');
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
