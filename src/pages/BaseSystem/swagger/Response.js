import React, {Fragment} from 'react';
import {Card, Tag} from 'antd';
import Model from './Model';
import {getDefinitionModel} from './tools';

const Response = (props) => {

  const {data: apiData, responses} = props;
  return (
    <Fragment>
      {
        Object.keys(responses).map(key => {
          const response = responses[key];
          const [path, model] = getDefinitionModel(response.schema, apiData);
          return (
            <Card
              key={key}
              title={
                <div>
                  <Tag color={parseInt(key, 0) === 200 ? 'green' : ''}>{key}</Tag>
                  <span style={{marginLeft: 24}}>{model.title}</span>
                  <span style={{marginLeft: 24}}>{model.description}</span>
                </div>
              }
              style={{marginBottom: 24}}
            >
              {
                response.schema && <Model modelObj={model} data={apiData}/>
              }
              {
                !response.schema && <span>没有更多描述...</span>
              }
            </Card>
          );
        })
      }
    </Fragment>
  );
};

export default Response;
