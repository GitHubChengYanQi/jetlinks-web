import React, {useEffect} from 'react';
import DataSet from '@antv/data-set';
import * as G2 from '@antv/g2';

const Demo = ({id}) => {


  useEffect(()=>{
    var data = [ {
      type: '在线',
      percent: 0.30
    }, {
      type: '离线',
      percent: 0.19
    }];
    var sum = 500;
    var ds = new DataSet();
    var dv = ds.createView().source(data);
    dv.transform({
      type: 'map',
      callback: function callback(row) {
        row.value = parseInt(sum * row.percent);
        return row;
      }
    });
    var chart = new G2.Chart({
      container: id,
      forceFit: true,
      height: 200,
      padding: 'auto'
    });
    chart.source(dv);
    chart.tooltip(false);
    chart.legend({
      position: 'right-center',
      offsetX: -100
    });
    chart.coord('theta', {
      radius: 0.75,
      innerRadius: 0.6
    });
    chart.intervalStack().position('percent').color('type', ['#0a7aca', '#919393',]).opacity(1).label('percent', {
      offset: -4,
      textStyle: {
        fill: 'white',
        fontSize: 12,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)'
      },
      rotate: 0,
      autoRotate: false,
      formatter: function formatter(text, item) {
        return String(parseInt(item.point.percent * 100)) + '%';
      }
    });
    chart.guide().html({
      position: ['50%', '50%'],
      html: '<h1>500</p>'
    });
    chart.render();
  },[])

  return <>
  <div id={id}></div>
  </>;
};

export default Demo;
