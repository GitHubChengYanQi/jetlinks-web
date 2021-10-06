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
import {InternalFieldList as FieldList} from '@formily/antd';
import {Button} from 'antd';
import styled from 'styled-components';
import ProCard from '@ant-design/pro-card';
import {itemId} from '../InstockField';

const {FormItem} = Form;

const ApiConfig = {
  view: instockDetail,
  add: instockOrderAdd,
  save: instockEdit
};

const RowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    //margin-right: 16px;
    float: right;
  }

  .ant-form-item {
    display: inline-flex;
    //margin-right: 16px;
    width: 18%;
  }
`;


const InstockEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="instockId"
      >

        <ProCard title='入库信息' className="h2Card" headerBordered>
          <FormItem label="仓库名称" name="storeHouseId" component={SysField.StoreHouseSelect} required />
          <FormItem label="负责人" name="userId" component={SysField.UserId} required />
          <FormItem label="登记时间" name="time" component={SysField.RegisterTime} required />
        </ProCard>

        {/*<FormItem label="产品名称" name="itemId" component={SysField.ItemIdSelect} required />*/}
        {/*<FormItem label="入库数量" name="number" component={SysField.Number} required />*/}
        {/*<FormItem label="原价" name="costPrice" component={SysField.CostPrice} required />*/}
        {/*<FormItem label="售价" name="sellingPrice" component={SysField.SellingPrice} required />*/}
        {/*<FormItem label="品牌" name="brandId" component={SysField.BrandId} required />*/}

        <ProCard title='产品信息' className='h2Card' headerBordered>
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
                      <RowStyleLayout key={index}>
                        <FormItem
                          label="产品"
                          name={`instockRequest.${index}.itemId`}
                          component={SysField.itemId}
                          required
                        />
                        <FormItem
                          label="品牌"
                          name={`instockRequest.${index}.brandId`}
                          component={SysField.BrandId}
                          required
                        />
                        <FormItem
                          label="数量"
                          name={`instockRequest.${index}.number`}
                          component={SysField.Number}
                          required
                        />
                        <FormItem
                          label="原价"
                          name={`instockRequest.${index}.costPrice`}
                          component={SysField.CostPrice}
                          required
                        />
                        <FormItem
                          label="售价"
                          name={`instockRequest.${index}.sellingPrice`}
                          component={SysField.SellingPrice}
                          required
                        />
                        {state.value.length >1 && <Button onClick={()=>onRemove(index)}>删除</Button>}
                      </RowStyleLayout>
                    );
                  })}
                  <Button onClick={onAdd}>增加</Button>
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
