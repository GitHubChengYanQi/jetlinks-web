import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';

const Broken = () => {


  useEffect(() => {
    const data = [{
      time: '00:00',
      value: 3
    }, {
      time: '01:00',
      value: 4
    }, {
      time: '02:00',
      value: 3.5
    }, {
      time: '03:00',
      value: 5
    }, {
      time: '04:00',
      value: 4.9
    }, {
      time: '05:00',
      value: 6
    }, {
      time: '06:00',
      value: 7
    }, {
      time: '07:00',
      value: 9
    }, {
      time: '08:00',
      value: 13
    }];
    const chart = new G2.Chart({
      container: 'Broken',
      forceFit: true,
      height: 200
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
