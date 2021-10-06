/**
 * 产品表编辑页
 *
 * @author
 * @Date 2021-07-14 14:04:26
 */

import React, {useRef, useState} from 'react';
import {Button, Col, Divider, Input, message, Row, Select, Steps} from 'antd';
import Form from '@/components/Form';
import {itemsDetail, itemsAdd, itemsEdit} from '../ItemsUrl';
import * as SysField from '../ItemsField';
import ProCard from '@ant-design/pro-card';



const {FormItem} = Form;

const ApiConfig = {
  view: itemsDetail,
  add: itemsAdd,
  save: itemsEdit
};

const ItemsEdit = ({...props}) => {

  const formRef = useRef();


  return (
    <>
      <div style={{padding:16}}>
        <Form
          {...props}
          ref={formRef}
          api={ApiConfig}
          fieldKey="itemId"
        >
          <Row gutter={24}>
            <Col span={12}>
              <ProCard title='基础信息' className='h2Card' headerBordered>
                <FormItem label="产品名字" name="name" component={SysField.Name} required />
                <FormItem label="生产日期" name="productionTime" component={SysField.ProductionTime} required />
                <FormItem label="材质名称" name="materialId" component={SysField.MaterialId} required />
                <FormItem label="品牌" name="brandResults" component={SysField.BrandId} required />
                <FormItem label="质保期" name="shelfLife" component={SysField.ShelfLife} required/>
              </ProCard>
            </Col>
            <Col span={12}>
              <ProCard title='详细信息' className='h2Card' headerBordered>
                <FormItem label="易损" name="vulnerability" component={SysField.Vulnerability} />
                <FormItem label="产品库存" name="inventory" component={SysField.Inventory} />
                <FormItem label="重要程度" name="important" component={SysField.Important} />
                <FormItem label="产品重量" name="weight" component={SysField.Weight} />
                <FormItem label="成本" name="cost" component={SysField.Cost} />
              </ProCard>
            </Col>
          </Row>


        </Form>
      </div>
    </>
  );

};

export default ItemsEdit;
