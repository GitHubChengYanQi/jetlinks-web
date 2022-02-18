import React, {useState} from 'react';
import {Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import DataTable from '@/pages/Crm/data/components/DataTable';
import store from '@/store';


const DataList = () => {

  const [dataState] = store.useModel('dataSource');

  const dataClassification = (dataState && dataState.dataClass) ? dataState.dataClass.map((values) => {
    return {
      title: values.label,
      key: values.value,
    };
  }) : [];


  const [Class, setClass] = useState();

  const Left = () => {
    return (
      <>
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
