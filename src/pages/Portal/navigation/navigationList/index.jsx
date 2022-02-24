import React, {useState} from 'react';
import {Divider, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import {useRequest} from '@/util/Request';
import NavigationTable from '@/pages/Portal/navigation/components/NavigationTable';
import Select from '@/components/Select';
import {Difference} from '@/pages/Portal/navigation/navigationUrl';


const NavigationList = () => {

  const {loading, data,run} = useRequest({url: '/navigationDifference/list', method: 'POST', rowKey: 'classificationId'});

  const classification = data ? data.map((values) => {
    return {
      title: values.difference,
      key: values.classificationId,
    };
  }) : [];

  const [value,setValue] = useState();

  const [state, setState] = useState();

  const Left = () => {
    return (
      <>
        <div>
          <Select api={Difference} placeholder='请选择分类' value={value} bordered={false} notFoundContent={null} defaultActiveFirstOption={false} onChange={async (value)=>{
            await run(
              {
                data:{
                  classificationId : value
                }
              }
            );
            setValue(value);
          }} />
        </div>
        <Tree
          onSelect={(value) => {
            setState(value);
          }}
          showLine
          defaultExpandedKeys={['']}
          treeData={[
            {
              title: '所有分类',
              key: '',
              children: classification
            },
          ]}
        />
        <Divider />
      </>);
  };
  return (
    <ListLayout left={Left()}>
      <NavigationTable state={state}  />
    </ListLayout>
  );
};
export default NavigationList;
