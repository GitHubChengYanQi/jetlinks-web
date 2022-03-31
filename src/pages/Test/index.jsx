import React, {useRef} from 'react';
import {Button, Space} from 'antd';
import Modal from '@/components/Modal';
import MaterialAnalysis from '@/pages/Test/MaterialAnalysis';

const App = () => {

  const ref = useRef();

  return (
    <div style={{textAlign: 'center', padding: 24}}>

      <Button onClick={() => {
        ref.current.open(true);
      }}>物料分析</Button>

      <Modal
        width={1100}
        headTitle='物料分析'
        ref={ref}
        component={MaterialAnalysis}
        footer={<Space>
          <Button onClick={() => {
            ref.current.close();
          }}>关闭</Button>
        </Space>}
      />

    </div>
  );
};

export default App;
