import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';

const BrokenLine = ({data = [], colors = ['#0c7dec'], id, max, min}) => {

  useEffect(() => {

    const chart = new G2.Chart({
      container: id || 'BrokenLine',
      forceFit: true,
      height: 200,
      padding: [20, 80, 95, 80],
    });

    chart.source(data.map(item => ({...item, time: `${item.time}:00`})));

    chart.line().position('time*value').color('title', colors);
    chart.guide().regionFilter({
      bottom: true,
      start: ['min', 20],
      end: ['max', 0],
      // color: '#ff4d4f'
    });
    chart.guide().line({
      start: ['min', max],
      end: ['max', max],
      lineStyle: {
        stroke: '#595959',
        lineWidth: 1,
        lineDash: [3, 3]
      },
      text: {
        position: 'end',
        style: {
          fill: '#8c8c8c',
          fontSize: 12,
          fontWeight: 'normal'
        },
        content: `上行阀值${max}`,
        offsetY: 6,
      }
    });

    chart.guide().line({
      start: ['min', min],
      end: ['max', min],
      lineStyle: {
        stroke: '#595959',
        lineWidth: 1,
        lineDash: [3, 3]
      },
      text: {
        position: 'end',
        style: {
          fill: '#8c8c8c',
          fontSize: 12,
          fontWeight: 'normal'
        },
        content: `下行阀值${min}`,
        offsetY: 6,
      }
    });

    chart.render();
  }, []);

  return <div id={id || 'BrokenLine'}/>;
};

export default BrokenLine;
