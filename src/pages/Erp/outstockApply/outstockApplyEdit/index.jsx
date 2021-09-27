/**
 * 出库申请编辑页
 *
 * @author song
 * @Date 2021-09-14 16:49:41
 */

import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Button, Card, Col, Divider, Input, Row} from 'antd';
import Form from '@/components/Form';
import {outstockApplyDetail, outstockApplyAdd, outstockApplyEdit} from '../outstockApplyUrl';
import {InternalFieldList as FieldList} from '@formily/antd';
import * as SysField from '@/pages/Erp/outstockApply/outstockApplyField';
import styled from 'styled-components';
import {useRequest} from '@/util/Request';
import {StoreHouse} from '@/pages/Erp/outstockApply/outstockApplyField';
import CustomerAll from '@/pages/Crm/contract/components/CustomerAll';
import ProCard from '@ant-design/pro-card';

const {FormItem} = Form;

const ApiConfig = {
  view: outstockApplyDetail,
  add: outstockApplyAdd,
  save: outstockApplyEdit
};

const OutstockApplyEdit = ({...props}, ref) => {


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

  useImperativeHandle(ref, () => ({
    formRef,
  }));


  return (
    <div style={{height: '100%',padding:24}}>
      <Form
        {...props}
        NoButton={false}
        ref={formRef}
        api={ApiConfig}
        fieldKey="outstockApplyId"
      >

        <Row gutter={24}>
          <Col span={10}>
            <div style={{height: '100%', overflow: 'auto'}}>
              <ProCard className='h2Card' headerBordered title="基本信息" bordered={false}>
                <div style={{paddingRight: 20}}>
                  <FormItem label="负责人" component={SysField.UserId} name="userId" required />

                  <CustomerAll  />
                </div>
              </ProCard>
            </div>
          </Col>
          <Col span={14}>
            <div style={{height: '100%', overflow: 'auto'}}>
              <ProCard className='h2Card' headerBordered title="发货申请明细" bordered={false}>
                <FieldList
                  name="applyDetails"
                  initialValue={[
                    {itemId:'',brandId:'',number:''},
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
                                name={`applyDetails.${index}.itemId`}
                                component={SysField.ItemId}
                                required
                              />
                              <FormItem
                                label="品牌"
                                name={`applyDetails.${index}.brandId`}
                                component={SysField.BrandId}
                                required
                              />
                              <FormItem
                                label="数量"
                                name={`applyDetails.${index}.number`}
                                component={SysField.Number}
                                required
                              />
                              <Button
                                style={{display: state.value.length === 1 && 'none'}}
                                onClick={()=>onRemove( index)}
                              >删除</Button>
                            </RowStyleLayout>
                          );
                        })}
                        <Button onClick={onAdd}>增加</Button>
                      </div>
                    );
                  }}
                </FieldList>
              </ProCard>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default forwardRef(OutstockApplyEdit);
