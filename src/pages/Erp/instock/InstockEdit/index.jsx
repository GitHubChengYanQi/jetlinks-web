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
import {Avatar, Button, Card, Row, Space} from 'antd';
import styled from 'styled-components';
import ProCard from '@ant-design/pro-card';
import {Codings, itemId} from '../InstockField';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {request, useRequest} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import SpuList from '@/pages/Erp/instock/components/SpuList';
import {codingRulesList} from '@/pages/Erp/tool/toolUrl';
import ProSkeleton from '@ant-design/pro-skeleton';
import {config} from 'ice';

const {FormItem} = Form;

const ApiConfig = {
  view: instockDetail,
  add: instockOrderAdd,
  save: instockEdit
};

const {code} = config;

const InstockEdit = ({...props}) => {

  const formRef = useRef();

  const {loading, data} = useRequest(codingRulesList, {
    defaultParams: {
      data: {
        module: 1,
        state: 1
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }


  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="instockId"
        onSuccess={() => {
          props.onSuccess();
        }}
        onError={() => {

        }}
        onSubmit={(value)=>{
          // eslint-disable-next-line no-template-curly-in-string
          return {...value,url:`${code}?id=codeId`};
        }}
      >

        <ProCard title="入库信息" className="h2Card" headerBordered>
          <div style={{display: 'inline-block',width:'30%'}}>
            <FormItem label="编码" name="coding" codingId={data} component={SysField.Codings} required />
          </div>
          <div style={{display: 'inline-block',width:'30%'}}>
            <FormItem label="仓库名称" name="storeHouseId" component={SysField.StoreHouseSelect} required />
          </div>
          <div style={{display: 'inline-block',width:'30%'}}>
            <FormItem label="负责人" name="userId" component={SysField.UserId} required />
          </div>

        </ProCard>
        <ProCard title="物料列表" className="h2Card" headerBordered>
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
                        style={{marginTop: 8}}
                        headStyle={{border: 'none', borderBottom: 'solid 1px #eee'}}
                        bodyStyle={{padding: 8}}
                        key={index}>
                        <Avatar size={24}>{`${index + 1}`}</Avatar>
                        <div style={{width: '23%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={7}
                            itemStyle={{margin: 0}}
                            label="物料"
                            name={`instockRequest.${index}.skuId`}
                            component={SysField.SkuId}
                            required
                          />
                        </div>
                        <div style={{width: '27%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={10}
                            itemStyle={{margin: 0}}
                            label="品牌(供应商)"
                            name={`instockRequest.${index}.brandId`}
                            component={SysField.BrandId}
                            required
                          />
                        </div>
                        <div style={{width: '14%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={7}
                            itemStyle={{margin: 0}}
                            label="数量"
                            name={`instockRequest.${index}.number`}
                            component={SysField.Number}
                            required
                          />
                        </div>
                        <div style={{width: '14%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={7}
                            itemStyle={{margin: 0}}
                            label="总价"
                            name={`instockRequest.${index}.costPrice`}
                            component={SysField.CostPrice}
                          />
                        </div>
                        <div style={{width: '14%', display: 'inline-block'}}>
                          <FormItem
                            labelAlign="left"
                            itemStyle={{margin: 0}}
                            labelCol={7}
                            label="售价"
                            name={`instockRequest.${index}.sellingPrice`}
                            component={SysField.SellingPrice}
                          />
                        </div>
                        <Button
                          type="link"
                          style={{float: 'right'}}
                          disabled={state.value.length === 1}
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            onRemove(index);
                          }}
                          danger
                        />
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
