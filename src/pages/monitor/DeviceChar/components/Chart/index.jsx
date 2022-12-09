import React, {useEffect} from 'react';
import moment from 'moment';
import {Card, Spin} from 'antd';
import {useRequest} from '@/util/Request';
import {isArray} from '@/util/Tools';
import StepLineChart from '@/pages/monitor/components/Chart/StepLineChart';
import BrokenLine from '@/pages/monitor/components/Chart/BrokenLine';

const Chart = (
  {
    api,
    startTime,
    endTime,
    device,
    type,
    chartData = {},
  }
) => {

  const {loading: chartLoading, data: chart, run: getChart} = useRequest(api, {manual: true});

  const toDay = moment(startTime).get('date') === moment(endTime).get('date');

  useEffect(() => {
    if (startTime && endTime) {
      const diffHours = moment(endTime).diff(moment(startTime), 'hours');
      let frame = 1;
      if (diffHours > 24) {
        frame = 24;
      } else if (diffHours > 96) {
        frame = 96;
      } else if (diffHours > 168) {
        frame = 168;
      }
      getChart({
        data: {
          startTime,
          endTime,
          deviceId: device.deviceId,
          title: type,
          frame
        }
      });
    }
  }, [startTime, endTime]);

  const sort = (array = [], lines) => {
    const linesArray = lines.map(lintItem => {
      return array.filter(item => item.title === lintItem.lineTitle);
    });
    const newArray = [];
    linesArray.forEach(lintItems => {
      lintItems.forEach((item) => {
        newArray.push(item);
      });
    });
    return newArray.map(item => {
      const time = (item.time || '').split(' ');
      return {
        title: item.title || '',
        value: item.value || 0,
        time: toDay ? time[1] : time[0],
      };
    });
  };


  return <Card
    bodyStyle={{padding: 0}}
    bordered={false}
  >
    {chartLoading ? <div style={{textAlign: 'center', padding: 24}}><Spin />
    </div> : chart && isArray(chartData.messages).map((item, index) => {
      const lines = item.lines || [];
      const lineSort = isArray(item.sort);
      switch (item.lineType) {
        case 'straightLine':
          return <div key={index}>
            {item.title}
            <StepLineChart
              data={isArray(chart[item.key]).map(item => {
                const sortItem = lineSort.find(sItem => `${sItem.value}` === `${item.value}`);
                const time = (item.time || '').split(' ');
                return {
                  title: item.title || '',
                  value: sortItem?.title || 1,
                  time: toDay ? time[1] : time[0],
                };
              })}
              id={item.key}
              sort={lineSort.length > 0 && lineSort.map(item => item.title)}
            />
          </div>;
        default:
          return <div key={index}>
            {item.title}
            <BrokenLine
              data={sort(chart[item.key] || [], lines)}
              colors={lines.map(lineItem => lineItem.color)}
              id={item.key}
              unit={item.unit}
              scale={item.scale}
            />
          </div>;
      }
    })}
  </Card>;
};

export default Chart;
