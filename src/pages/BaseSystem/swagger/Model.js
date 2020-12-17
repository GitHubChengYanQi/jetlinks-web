import React from 'react';
import {getDefinitionModel, splitPath} from '@/pages/BaseSystem/swagger/tools';
import {Table} from 'antd';

const loopData = (modelObj, apiData) => {
  const {properties: model} = modelObj;
  if (!model) return [];
  const data = Object.keys(model).map((key) => {
    const item = {
      name: key,
      type: model[key].type,
      description: model[key].description,
    };
    const [path, models] = getDefinitionModel(model[key], apiData);
    if (path) {
      // item.children = loopData(models, apiData);
      item.$ref = path;
    } else {
      item.$ref = '';
    }

    return item;
  });
  return data;
};

const Model = ({modelObj, data: apiData}) => {

  if (!modelObj.properties) {
    return null;
  }
  const dataSource = loopData(modelObj, apiData);

  return (
    <Table
      rowKey="name"
      dataSource={dataSource}
      pagination={false}
      columns={[
        {
          dataIndex: 'name',
          title: '名称',
          width: 180,
          render: (text, values) => {
            return (
              <span>
                {values.name}{values.type === 'array' && '[]'}
              </span>
            );
          }
        },
        {
          dataIndex: 'type',
          title: '类型',
          width: 180,
          render: (text, values) => {
            return (
              <span>
                {values.$ref || values.type}
              </span>
            );
          }
        },
        {
          dataIndex: 'description',
          title: '描述'
        }
      ]}
    />
  );
  // return (
  //   <ReactJson
  //     name={false}
  //     enableClipboard={false}
  //     displayDataTypes={false}
  //     displayObjectSize={false}
  //     src={modelObj.properties}/>
  // );

};

export default Model;
