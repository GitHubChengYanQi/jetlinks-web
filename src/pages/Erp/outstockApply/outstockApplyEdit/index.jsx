/**
 * 出库申请编辑页
 *
 * @author song
 * @Date 2021-09-14 16:49:41
 */

import React, {useRef} from 'react';
import {Button, Divider, Input} from 'antd';
import Form from '@/components/Form';
import {outstockApplyDetail, outstockApplyAdd, outstockApplyEdit} from '../outstockApplyUrl';
import {InternalFieldList as FieldList} from '@formily/antd';
import * as SysField from '@/pages/Erp/outstockApply/outstockApplyField';
import styled from 'styled-components';

const {FormItem} = Form;

const ApiConfig = {
  view: outstockApplyDetail,
  add: outstockApplyAdd,
  save: outstockApplyEdit
};

const OutstockApplyEdit = ({...props}) => {

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



  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="outstockApplyId"
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
  );
};

export default OutstockApplyEdit;
