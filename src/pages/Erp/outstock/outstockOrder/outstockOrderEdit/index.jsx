/**
 * 出库单编辑页
 *
 * @author cheng
 * @Date 2021-08-16 10:51:46
 */

import React, {useRef, useState} from 'react';
import {Button, Input, Steps} from 'antd';
import Form from '@/components/Form';
import {outstockOrderDetail, outstockOrderAdd, outstockOrderEdit} from '../outstockOrderUrl';
import * as SysField from '../outstockOrderField';
import OutstockList from '@/pages/Erp/outstock/OutstockList';
import FormIndex from '@/components/Form/FormIndex';
import {
  outstockApplyAdd,
  outstockApplyDetail,
  outstockApplyEdit
} from '@/pages/Erp/outstockApply/outstockApplyUrl';
import {InternalFieldList as FieldList} from '@formily/antd';
import styled from 'styled-components';

const {FormItem} = Form;

const ApiConfig = {
  view: outstockOrderDetail,
  add: outstockOrderAdd,
  save: outstockOrderEdit
};

const OutstockOrderEdit = ({...props}) => {


  const formRef = useRef();

  const RowStyleLayout = styled(props => <div {...props} />)`
    .ant-btn {
      margin-right: 16px;
    }

    .ant-form-item {
      display: inline-flex;
      margin-right: 16px;
      width: 25%;
    }
  `;



  return (
    <>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="outstockOrderId"
      >

        <FieldList
          name="applyDetails"
          initialValue={[
            {itemId: ''},
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
                        label='产品'
                        name={`applyDetails.${index}.itemId`}
                        component={SysField.ItemId}
                        required
                      />
                      <FormItem
                        label='品牌'
                        name={`applyDetails.${index}.brandId`}
                        component={SysField.BrandId}
                        required
                      />
                      <FormItem
                        label='数量'
                        name={`applyDetails.${index}.number`}
                        component={SysField.Number}
                        required
                      />
                      {/* eslint-disable-next-line react/jsx-no-bind */}
                      <Button onClick={onRemove.bind(null, index)}>删除</Button>
                    </RowStyleLayout>
                  );
                })}
                <Button onClick={onAdd}>增加</Button>
              </div>
            );
          }}
        </FieldList>

      </Form>
    </>

  );
};

export default OutstockOrderEdit;
