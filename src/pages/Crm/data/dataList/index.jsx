import React, {useState} from 'react';
import CustomerTable from '@/pages/Crm/customer/components/CustomerTable';
import {Divider, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import {useRequest} from '@/util/Request';
import Select from '@/components/Select';
import {CustomerLevelIdSelect} from '@/pages/Crm/customer/CustomerUrl';
import DataTable from '@/pages/Crm/data/components/DataTable';
import {dataClassificationSelect} from '@/pages/Crm/data/dataUrl';


const DataList = () => {

  const {data,run} = useRequest({url: '/dataClassification/list', method: 'POST', rowKey: 'dataClassificationId'});

  const dataClassification = data ? data.map((values) => {
    return {
      title: values.title,
      key: values.dataClassificationId,
    };
  }) : [];


  const [Class, setClass] = useState();

  const [value,setValue] = useState();



  const Left = () => {
    return (
      <>
        <div>
          <Select api={dataClassificationSelect} placeholder='搜索分类' value={value} bordered={false} notFoundContent={null} defaultActiveFirstOption={false} onChange={async (value)=>{
            await run(
              {
                data:{
                  dataClassificationId : value
                }
              }
            );
            setValue(value);
          }} />
        </div>
        <Tree
          showLine
          onSelect={(value) => {
            setClass(value);
          }}
          defaultExpandedKeys={['']}
          treeData={[
            {
              title: '所有分类',
              key: '',
              children: dataClassification
            },
          ]}
        />
      </>);
  };
  return (
    <ListLayout>
      <DataTable left={Left()} Class={Class} />
    </ListLayout>
  );
};
export default DataList;
