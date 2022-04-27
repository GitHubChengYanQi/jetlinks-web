import React from 'react';
import {Progress} from 'antd';
import Empty from '@/components/Empty';

const TaskProgress = ({data,title}) => {

  if (!data) {
    return <Empty />;
  }

  return <>
    <div style={{width: 500, textAlign: 'center', padding: 24}}>
      <Progress
        width={120}
        type="circle"
        format={percent => {
          return <div style={{fontSize: 16}}>
            {`${title} ${percent}%`}
          </div>;
        }}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
        percent={(Math.floor((data.count / data.allCount) * 100))}
      />
    </div>
  </>;
};

export default TaskProgress;
