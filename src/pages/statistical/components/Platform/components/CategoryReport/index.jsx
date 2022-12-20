import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';
import styles from './index.module.less';

const CategoryReport = () => {


  useEffect(() => {
    // 注意由于分类轴的顺序是从下往上的，所以数组的数值顺序要从小到大
    const data = [
      {country: '智能箱1', population: 18203},
      {country: '智能箱2', population: 23489},
      {country: '智能箱3', population: 29034},
      {country: '智能箱4', population: 104970},
      {country: '智能箱5', population: 131744}
    ];
    const chart = new G2.Chart({
      padding: {top: 20, right: 30, bottom: 20, left: 60},
      container: 'CategoryReport',
      forceFit: true,
      height: 270,
    });
    chart.source(data);
    chart.axis('country', {
      label: {
        offset: 12
      }
    });
    chart.coord().transpose();
    chart.interval().position('country*population');
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
