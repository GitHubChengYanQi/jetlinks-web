import React, {useEffect} from 'react';
import * as G2 from '@antv/g2';

const BrokenLine = ({data = [], colors = ['#0c7dec'], id}) => {

  useEffect(() => {

    const chart = new G2.Chart({
      container: id || 'BrokenLine',
      forceFit: true,
      height: 200,
      padding: [20, 80, 95, 80],
    });

    chart.source(data);

    chart.line().position('time*value').color('title', colors);

    chart.axis('y', {
      line: {
        autoRotate: true
      }
    });

    chart.render();
  }, []);

  return <div id={id || 'BrokenLine'}/>;
};

export default BrokenLine;
