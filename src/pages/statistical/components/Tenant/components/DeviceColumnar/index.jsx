import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';
import Box from '@/pages/statistical/components/Tenant/components/Box';

const DeviceColumnar = ({records = []}) => {


  useEffect(() => {
    const data = records.map(item => ({
      ...item,
      type: item.type === 'online' ? '设备在线数量' : '设备离线数量'
    }));

    const chart = new G2.Chart({
      padding: {top: 40, right: 24, bottom: 40, left: 40},
      container: 'DeviceColumnar',
      forceFit: true,
      height: document.documentElement.clientHeight * 0.25
    });
    chart.source(data);
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.axis('num');
    chart.axis('day', {
      label: {
        textStyle: {
          fill: '#fff'
        }
      }
    });
    chart.axis('num', {
      label: {
        textStyle: {
          fill: '#fff'
        }
      }
    });
    chart.line().position('day*num').color('type');
    chart.point().position('day*num').color('type')
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1
      });
    chart.legend('type', {
      position: 'top',
      textStyle: {
        fill: '#fff'
      }
    });
    chart.render();
  }, []);

  return <Box>
    <div id="DeviceColumnar" />
  </Box>;
};

export default DeviceColumnar;
