import React from 'react';
import ProSkeleton from '@ant-design/pro-skeleton';
import {Space, Row, Col, Skeleton as AntSkeleton} from "antd";

import style from './index.module.less';

const node = [];
for (let i = 0; i < 4; i++) {
  const w = 20 + Math.floor(Math.random() * 60);
  node.push(
    <Row key={i} gutter={8} style={{paddingTop: 8, paddingBottom: 8}}>
      <Col span={6} style={{textAlign: 'right'}}><AntSkeleton.Button size="small"/></Col>
      <Col span={18}>
        <AntSkeleton.Input style={{width: `${w}%`}} active size="small"/>
      </Col>
    </Row>
  );
}

export const SkeletonForm = () => {


  return (
    <div className={style.Skeleton}>
      {node.map((item, index) => {
        return item;
      })}
      <Row gutter={8} style={{paddingTop: 8, paddingBottom: 8}}>
        <Col span={6} style={{textAlign: 'right'}}><AntSkeleton.Button size="small"/></Col>
        <Col span={18}>
          <AntSkeleton.Image active size="small"/>
        </Col>
      </Row>
      <Row gutter={8} style={{paddingTop: 8, paddingBottom: 8}}>
        <Col span={6} style={{textAlign: 'right'}}><AntSkeleton.Button size="small"/></Col>
        <Col span={18}>
          <AntSkeleton.Input style={{width: '80%', height: 70}} active size="small"/>
        </Col>
      </Row>
      <Row gutter={8} style={{paddingTop: 8, paddingBottom: 8}}>
        <Col span={6} style={{textAlign: 'right'}}/>
        <Col>
          <Space>
            <AntSkeleton.Button active/>
            <AntSkeleton.Button active/>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

const Skeleton = ({type = 'list'}) => {
  return (
    <div
      style={{
        background: '#fafafa',
        padding: 24,
      }}
    >
      <ProSkeleton type={type}/>
    </div>
  );
};

export default {
  Skeleton,
  SkeletonForm
};
