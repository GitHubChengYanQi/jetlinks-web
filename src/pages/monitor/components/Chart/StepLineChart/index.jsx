import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';

const StepLineChart = ({data}) => {


  useEffect(() => {
    const chart = new G2.Chart({
      container: 'StepLineChart',
      forceFit: true,
      height: 200,
      padding: [20, 80, 95, 50],
    });
    chart.source(data, {
      month: {
        range: [0, 1]
      }
    });
    chart.line().position('time*value').shape('hv');
    chart.render();
  }, []);

  return <div id="StepLineChart"/>;
};

export default StepLineChart;
