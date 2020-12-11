import React from 'react';
import {Spin} from 'antd';

const example = {
  textAlign: 'center',
  marginBottom: 20,
  padding: 50,
  margin: '50px 0'
};

const LoadingPage = () => {
  return (
    <div style={example}>
      <Spin size="large" />
    </div>
  );
};

export default LoadingPage;
