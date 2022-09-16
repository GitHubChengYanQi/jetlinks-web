import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';

const StepLineChart = () => {


  useEffect(() => {
    const data = [{
      month: '1',
      value: '通'
    }, {
      month: '2',
      value: '断'
    }, {
      month: '3',
      value: '通'
    }, {
      month: '4',
      value: '通'
    }, {
      month: '5',
      value: '通'
    }, {
      month: '6',
      value: '断'
    }, {
      month: '7',
      value: '断'
    }, {
      month: '8',
      value: '断'
    }, {
      month: '9',
      value: '断'
    }, {
      month: '10',
      value: '断'
    }, {
      month: '11',
      value: '通'
    }, {
      month: '12',
      value: '断'
    }];
    const chart = new G2.Chart({
      container: 'StepLineChart',
      forceFit: true,
      height: 200
    });
    chart.source(data, {
      month: {
        range: [0, 1]
      }
    });
    chart.line().position('month*value').shape('hv');
    chart.render();
  }, []);

  return <div id="StepLineChart"/>;
};

export default StepLineChart;
