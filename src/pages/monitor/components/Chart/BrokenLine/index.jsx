import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';

const BrokenLine = ({data = [], colors = ['#0c7dec'], id, scale, unit}) => {

  useEffect(() => {

    const chart = new G2.Chart({
      container: id || 'BrokenLine',
      forceFit: true,
      height: 100,
      padding: [10, 80, 10, 80],
    });

    chart.source(data, {
      value: scale ? {
        type: 'linear',
        min: scale.minValue,
        max: scale.maxValue,
        tickInterval: scale.tickInterval
      } : undefined
    });

    chart.line().position('time*value').color('title', colors);

    chart.tooltip({
      itemTpl: `<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>{name}: {value}${unit || ''}</li>`, // tooltip 每项记录的默认模板
    });
    chart.legend(false);

    chart.axis('value', {
      label: {
        formatter: val => {
          return val + (unit || ''); // 格式化坐标轴显示文本
        }
      },
    });

    chart.render();
  }, []);

  return <div id={id || 'BrokenLine'} />;
};

export default BrokenLine;
