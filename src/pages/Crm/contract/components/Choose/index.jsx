import React, {useRef} from 'react';
import Drawer from '@/components/Drawer';
import {Input} from 'antd';

const {Search} = Input;

const Choose = (props) => {


  const {domNode,Table,record:rec} = props;

  const ref = useRef(null);

  if (domNode) {
    return (
      <>
        <Search style={{width: 200, margin: '0 10px'}} value={domNode.children[0].data} onSearch={() => {
          ref.current.open(false);
        }} enterButton />
        <Drawer width={1700} title="选择" component={Table} onSuccess={() => {
          ref.current.close();
        }} ref={ref} choose={(record) => {
          ref.current.close();
          rec(record);
        }}
        />
      </>
    );
  } else {
    return null;
  }


};

export default Choose;
