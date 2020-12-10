import React, {useState} from 'react';
import {Row, Col, Menu, Tag, Divider, Table} from 'antd';
import {useRequest} from "@/util/Request";
import {swaggerUrl} from "@/pages/BaseSystem/swagger/swaggerUrl";
import Parameters from "@/pages/BaseSystem/swagger/Parameters";
import Response from "@/pages/BaseSystem/swagger/Response";

import styles from './index.module.scss';

const {SubMenu, Item} = Menu;

const ColorMapper = {
  get: 'blue',
  post: 'green',
  put: 'orange',
  delete: 'red'
};

const Swagger = () => {

  const [method, setMethod] = useState(null);
  const [path, setPath] = useState(null);
  const [name, setName] = useState(null);
  const {data} = useRequest(swaggerUrl);

  console.log(data);

  if (!data) {
    return null;
  }
  const {tags, paths} = data;
  return (
    <Row gutter={16}>
      <Col span={4}>
        <Menu mode="inline">
          {
            tags.map((tag, index) => {
              return (
                <SubMenu key={`tag-${index}`} title={tag.name}>
                  {
                    Object.keys(paths).map(pathKey => {
                      return Object.keys(paths[pathKey]).map(methodKey => {
                        const method = paths[pathKey][methodKey];
                        return method.tags.findIndex(t => t === tag.name) && <Menu.Item onClick={() => {
                          // (methodKey, method, pathKey)
                          console.log(method);
                          setMethod(method);
                          setPath(pathKey);
                          setName(methodKey);

                        }} key={`${methodKey}-${pathKey}`}>{method.summary}</Menu.Item>;
                      });
                    })
                  }
                </SubMenu>
              );
            })
          }
        </Menu>
      </Col>
      <Col span={20}>
        {method &&
        <>
          <div className={styles.header}>
            <Tag color={ColorMapper[name]}>{name.toUpperCase()}</Tag>
            <span>{path}</span>
            <span>{method.summary}</span>
          </div>
          <Divider orientation="left">接口描述</Divider>
          <Table
            pagination={false}
            showHeader={false}
            bordered
            rowKey="name"
            columns={[{
              dataIndex: 'name',
              key: 'name',
              width: 120,
            }, {
              dataIndex: 'description',
              key: 'description',
            }]}
            dataSource={[{
              name: '路径',
              description: path,
            }, {
              name: '简介',
              description: method.summary,
            }, {
              name: '描述',
              description: method.description,
            }]}
          />

          <Divider orientation="left">参数列表</Divider>
          <Parameters parameters={method.parameters} data={data}/>
          <Divider orientation="left">响应列表</Divider>
          <Response responses={method.responses} data={data}/>
        </>
        }
      </Col>
    </Row>
  );
};

export default Swagger;
