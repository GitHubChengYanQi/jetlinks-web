import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';

const StepLineChart = ({data, id}) => {


  useEffect(() => {
    const chart = new G2.Chart({
      container: id || 'StepLineChart',
      forceFit: true,
      height: 200,
      padding: [20, 80, 95, 80],
    });

    chart.source(data.map(item => ({...item, time: `${item.time}:00`})), {
      month: {
        range: [0, 1]
      }
    });
    chart.line().position('time*value').shape('hv');
    chart.render();
  }, []);

  return <div id={id || 'StepLineChart'}/>;
};

export default StepLineChart;
