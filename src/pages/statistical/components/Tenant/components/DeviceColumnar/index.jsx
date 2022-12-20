import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';
import Box from '@/pages/statistical/components/Tenant/components/Box';

const DeviceColumnar = () => {


  useEffect(() => {
    const data = [
      {month: 'Jan', city: 'Tokyo', temperature: 7},
      {month: 'Jan', city: 'London', temperature: 3.9},
      {month: 'Feb', city: 'Tokyo', temperature: 6.9},
      {month: 'Feb', city: 'London', temperature: 4.2},
      {month: 'Mar', city: 'Tokyo', temperature: 9.5},
      {month: 'Mar', city: 'London', temperature: 5.7},
      {month: 'Apr', city: 'Tokyo', temperature: 14.5},
      {month: 'Apr', city: 'London', temperature: 8.5},
      {month: 'May', city: 'Tokyo', temperature: 18.4},
      {month: 'May', city: 'London', temperature: 11.9},
      {month: 'Jun', city: 'Tokyo', temperature: 21.5},
      {month: 'Jun', city: 'London', temperature: 15.2},
      {month: 'Jul', city: 'Tokyo', temperature: 25.2},
      {month: 'Jul', city: 'London', temperature: 17},
      {month: 'Aug', city: 'Tokyo', temperature: 26.5},
      {month: 'Aug', city: 'London', temperature: 16.6},
      {month: 'Sep', city: 'Tokyo', temperature: 23.3},
      {month: 'Sep', city: 'London', temperature: 14.2},
      {month: 'Oct', city: 'Tokyo', temperature: 18.3},
      {month: 'Oct', city: 'London', temperature: 10.3},
      {month: 'Nov', city: 'Tokyo', temperature: 13.9},
      {month: 'Nov', city: 'London', temperature: 6.6},
      {month: 'Dec', city: 'Tokyo', temperature: 9.6},
      {month: 'Dec', city: 'London', temperature: 4.8}
    ];

    const chart = new G2.Chart({
      padding: {top: 40, right: 24, bottom: 40, left: 40},
      container: 'DeviceColumnar',
      forceFit: true,
      height: 300
    });
    chart.source(data, {
      month: {
        range: [0, 1]
      }
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.axis('temperature', {
      label: {
        formatter: val => {
          return val + '°C';
        }
      }
    });
    chart.axis('month', {
      label: {
        textStyle: {
          fill:'#fff'
        }
      }
    });
    chart.axis('temperature', {
      label: {
        textStyle: {
          fill:'#fff'
        }
      }
    });
    chart.line().position('month*temperature').color('city');
    chart.point().position('month*temperature').color('city')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1
      });
    chart.legend('city', {
      position: 'top',
      textStyle: {
        fill: '#fff'
      }
    });
    chart.render();
  }, []);

  return <Box>
    <div id="DeviceColumnar"/>
  </Box>;
};

export default DeviceColumnar;
