import React, {useEffect, useState} from 'react';
import {useRequest} from '@/util/Request';
import {Input, Popover} from 'antd';

const CustomerSelect = (props) => {


  const {value, onChange,style ,method, onSuccess, ...other} = props;

  const [val, setVal] = useState(value);

  const [vis,setVis] = useState();

  const {data, run} = useRequest({url: '/customer/list', method: 'POST'}, {
    debounceInterval: 300,
    manual: true,
  });

  useEffect(()=>{
    setVal(value);
  },[value]);


  const handleChange = async value => {
    if (value) {
      setVal(value);
      onChange(value);
      await run({
        data: {
          customerName: value
        }
      });
    } else {
      setVal(value);
      await run({
        data: {
          customerName: ' '
        }
      });
    }

  };


  const content = data ? data.map((value, index) => {
    return (
      <div key={index}>
        <a onClick={() => {
          onSuccess(value);
          setVis(false);
        }}>{value.customerName}</a>
      </div>
    );
  }) : null;


  return ((
    <>
      <Popover
        placement="bottomLeft"
        visible={vis && content && !method ? content.length : false}
        content={content}
        trigger="focus">
        <Input
          style={style}
          onChange={(value) => {
            handleChange(value.target.value);
            setVis(true);
          }}
          value={val}
        />
      </Popover>
    </>));
};

export default CustomerSelect;
