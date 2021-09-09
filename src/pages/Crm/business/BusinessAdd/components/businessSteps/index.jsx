
import React from 'react';
import {Step} from '@alifd/next';
import Steps from 'antd/es/progress/Steps';
import {Popover} from 'antd';

const Index = ({...props}) => {

  // console.log(11111111111, props);
  // const data = props.value.process;
  const data = [];
  let current = 0;

  return (
    <Steps
      type="navigation"
      current={current}
    >
      {data.length > 0 ? data.map((values, index) => {

        current = index;
        return (
          <Step
            key={index}
            title={values.name}
            description={values.note}
          />
        );

      }) : null}
    </Steps>
  );
};
export default Index;
