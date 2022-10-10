import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';

const Broken = ({data}) => {


  useEffect(() => {
    const chart = new G2.Chart({
      container: 'Broken',
      forceFit: true,
      height: 200,
      padding: [20, 80, 95, 50],
    });
    chart.source(data);
    chart.scale('value', {
      min: 0
    });
    chart.scale('time', {
      range: [0, 1]
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.line().position('time*value');
    chart.point().position('time*value').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    chart.render();
  }, []);

  return <div id="Broken"/>;
};

export default Broken;
