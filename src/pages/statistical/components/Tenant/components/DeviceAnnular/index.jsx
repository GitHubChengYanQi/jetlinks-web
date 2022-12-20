import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';
import Box from '@/pages/statistical/components/Tenant/components/Box';

const DeviceAnnular = () => {


  useEffect(() => {
    const data = [
      {item: '离线数量', count: 40, percent: 0.4},
      {item: '在线数量', count: 21, percent: 0.21},
    ];
    const chart = new G2.Chart({
      padding: {top: 24, right: 24, bottom: 40, left: 24},
      container: 'DeviceAnnular',
      forceFit: true,
      height: 300,
      animate: false
    });
    chart.source(data, {
      percent: {
        formatter: val => {
          val = (val * 100) + '%';
          return val;
        }
      }
    });
    chart.coord('theta', {
      radius: 0.75,
      innerRadius: 0.6
    });
    chart.tooltip({
      showTitle: false,
      itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });

    chart.guide().html({
      position: ['50%', '50%'],
      html: '<div style="color:#fff;font-size: 14px;text-align: center;width: 10em;"><span style="color:#fff;font-size:20px">200</span> <br>设备总数</div>',
      alignX: 'middle',
      alignY: 'middle'
    });
    chart.legend('item', {
      marker: 'square',
      textStyle: {
        fill: '#fff'
      }
    });
    chart.intervalStack()
      .position('percent')
      .color('item')
      .label('percent', {
        textStyle: {
          fill: '#fff'
        },
        formatter: (val, item) => {
          return item.point.item + ': ' + val;
        }
      })
      .tooltip('item*percent', (item, percent) => {
        percent = percent * 100 + '%';
        return {
          name: item,
          value: percent
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });
    chart.render();
  }, []);

  return <>
    <Box>
      <div id="DeviceAnnular"></div>
    </Box>
  </>;
};

export default DeviceAnnular;
