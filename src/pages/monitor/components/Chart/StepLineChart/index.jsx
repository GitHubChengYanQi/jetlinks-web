import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';

const StepLineChart = ({data, id, sort}) => {

  useEffect(() => {
    const chart = new G2.Chart({
      container: id || 'StepLineChart',
      forceFit: true,
      height: 100,
      padding: [10, 80, 10, 80],
    });

    chart.source(data, {
      month: {
        range: [0, 1]
      },
      value: sort ? {
        type: 'cat', // 声明 type 字段为分类类型
        values: sort,// 重新显示的值
      } : undefined
    });
    chart.line().position('time*value').shape('hv').color('title', '#018a51');
    chart.axis('y', {
      line: {
        autoRotate: true
      }
    });
    chart.legend(false);
    chart.render();
  }, []);

  return <div id={id || 'StepLineChart'}/>;
};

export default StepLineChart;
