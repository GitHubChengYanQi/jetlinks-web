/**
 * 入库表编辑页
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

import React, {useRef, useState} from 'react';
import Form from '@/components/Form';
import {instockDetail, instockAdd, instockEdit, instockOrderAdd} from '../InstockUrl';
import * as SysField from '../InstockField';
import {FormEffectHooks, FormPath, InternalFieldList as FieldList} from '@formily/antd';
import {Button, Card} from 'antd';
import styled from 'styled-components';
import ProCard from '@ant-design/pro-card';
import {itemId} from '../InstockField';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {request, useRequest} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import SpuList from '@/pages/Erp/instock/components/SpuList';

const {FormItem} = Form;

const ApiConfig = {
  view: instockDetail,
  add: instockOrderAdd,
  save: instockEdit
};

const {onFieldValueChange$} = FormEffectHooks;

const InstockEdit = ({...props}) => {

  const formRef = useRef();


  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="instockId"
        effects={({setFieldState}) => {
          onFieldValueChange$('instockRequest.*.spuId').subscribe(async (value) => {
            if (value.value) {
              const data = await request({
                ...spuDetail,
                data: {
                  spuId: value.value
                }
              });

              setFieldState(
                FormPath.transform(value.name, /\d/, $1 => {
                  return `instockRequest.${$1}.skuId`;
                }),
                state => {
                  if (value.active) {
                    state.props.select = value;
                  }
                  state.props.sku = data.sku;
                }
              );
            }

          });
        }}
      >

        <ProCard title="入库信息" className="h2Card" headerBordered>
          <FormItem label="仓库名称" name="storeHouseId" component={SysField.StoreHouseSelect} required />
          <FormItem label="负责人" name="userId" component={SysField.UserId} required />
          <FormItem label="登记时间" name="time" component={SysField.RegisterTime} required />
        </ProCard>
        <ProCard title="产品信息" className="h2Card" headerBordered>
          <FieldList
            name="instockRequest"
            initialValue={[
              {},
            ]}
          >
            {({state, mutators}) => {
              const onAdd = () => mutators.push();
              return (
                <div>
                  {state.value.map((item, index) => {
                    const onRemove = index => mutators.remove(index);
                    return (
                      <Card
                        headStyle={{border: 'none', borderBottom: 'solid 1px #eee'}}
                        title={`产品${index + 1}`}
                        key={index}>
                        <div>
                          <SpuList
                            style={{width: '28%', display: 'inline-block'}}
                            spuName={`instockRequest.${index}.spuId`}
                            skusName={`instockRequest.${index}.skuId`}
                            spuLabel="产品"
                            skuLabel="规格" />
                          <div style={{width: '28%', display: 'inline-block'}}>
                            <FormItem
                              labelCol={7}
                              label="品牌"
                              name={`instockRequest.${index}.brandId`}
                              component={SysField.BrandId}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <div style={{width: '28%', display: 'inline-block'}}>
                            <FormItem
                              labelCol={7}
                              label="数量"
                              name={`instockRequest.${index}.number`}
                              component={SysField.Number}
                              required
                            />
                          </div>
                          <div style={{width: '28%', display: 'inline-block'}}>
                            <FormItem
                              labelCol={7}
                              label="原价"
                              name={`instockRequest.${index}.costPrice`}
                              component={SysField.CostPrice}
                              required
                            />
                          </div>
                          <div style={{width: '28%', display: 'inline-block'}}>
                            <FormItem
                              labelCol={7}
                              label="售价"
                              name={`instockRequest.${index}.sellingPrice`}
                              component={SysField.SellingPrice}
                              required
                            />
                          </div>
                          <Button
                            type="link"
                            style={{display: state.value.length === 1 ? 'none' : 'inline-block', float: 'right'}}
                            icon={<DeleteOutlined />}
                            onClick={() => {
                              onRemove(index);
                            }}
                            danger
                          />
                        </div>
                      </Card>
                    );
                  })}
                  <Button
                    type="dashed"
                    style={{marginTop: 8}}
                    icon={<PlusOutlined />}
                    onClick={onAdd}>增加产品</Button>
                </div>
              );
            }}
          </FieldList>
        </ProCard>
      </Form>
    </div>
  );
};

export default InstockEdit;
