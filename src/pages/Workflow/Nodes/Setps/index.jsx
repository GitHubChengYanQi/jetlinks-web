import React from 'react';
import {Form, FormItem, FormEffectHooks, createFormActions, VirtualField, FieldList, Submit,FormButtonGroup,Reset} from '@formily/antd';
import {Radio, Select, Input} from '@formily/antd-components';
import {Button} from 'antd';
import styled from 'styled-components';
import SpuList from '@/pages/Erp/parts/components/SpuList';

const actions = createFormActions();

const RowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    margin-right: 16px;
  }

  .ant-form-item {
    display: inline-flex;
    margin-right: 16px;
    margin-bottom: 16px;
  }
`;

const Setps = () => {

  return (
    <Form
      actions={actions}
      effects={($, {setFieldState}) => {
        FormEffectHooks.onFieldValueChange$('type').subscribe(({value}) => {

          const item = ['setp', 'ship', 'audit', 'audit_process'];
          for (let i = 0; i < item.length; i++) {
            const field = item[i];
            setFieldState(field, state => {
              state.visible = value === field;
            });
          }
        });
      }}
      defaultValue={{
        type: 'setp'
      }}
    >
      <FormItem
        required
        label="类型"
        name="type"
        component={Radio.Group}
        dataSource={[
          {label: '工序', value: 'setp'},
          {label: '工艺', value: 'ship'},
          {label: '审批', value: 'audit'},
          {label: '流程', value: 'audit_process'}
        ]} />
      <VirtualField name="setp">
        <FormItem
          required
          label="工序"
          name="setpId"
          component={Select}
          dataSource={[
            {label: '工序1', value: '1'},
            {label: '工序2', value: '2'},
            {label: '工序3', value: '3'},
            {label: '工序4', value: '4'}
          ]}
        />
        <FormItem
          required
          label="工时"
          name="length"
          component={Input}
        />
        投入物料：
        <FieldList
          name="inGoodsList"
        >
          {({state, mutators}) => {
            const onAdd = () => mutators.push();
            return (
              <div>
                {state.value.map((item, index) => {
                  const onRemove = index => mutators.remove(index);
                  return (
                    <RowStyleLayout key={index}>
                      <SpuList spuName="supId" spuLabel="产品" />
                      <FormItem
                        name={`goodsList.${index}.num`}
                        component={Input}
                        title="数量"
                      />
                      <Button onClick={() => {
                        onRemove(index);
                      }}>remove</Button>
                    </RowStyleLayout>
                  );
                })}
                <Button onClick={onAdd}>增加</Button>
              </div>
            );
          }}
        </FieldList>
        产出：
        <FieldList
          name="outGoodsList"
        >
          {({state, mutators}) => {
            const onAdd = () => mutators.push();
            return (
              <div>
                {state.value.map((item, index) => {
                  const onRemove = index => mutators.remove(index);
                  return (
                    <RowStyleLayout key={index}>
                      <SpuList spuName="supId" spuLabel="产品" />
                      <FormItem
                        name={`goodsList.${index}.num`}
                        component={Input}
                        title="数量"
                      />
                      <Button onClick={() => {
                        onRemove(index);
                      }}>remove</Button>
                    </RowStyleLayout>
                  );
                })}
                <Button onClick={onAdd}>增加</Button>
              </div>
            );
          }}
        </FieldList>
      </VirtualField>
      <VirtualField name="ship">
        <FormItem
          required
          label="工艺"
          name="setpsId"
          component={Select}
          dataSource={[
            {label: '工艺1', value: '1'},
            {label: '工艺2', value: '2'},
            {label: '工艺3', value: '3'},
            {label: '工艺4', value: '4'}
          ]}
        />
      </VirtualField>
      <VirtualField name="audit">暂未开放</VirtualField>
      <VirtualField name="audit_process">暂未开放</VirtualField>

      <FormButtonGroup offset={8} sticky>
        <Submit>确定</Submit>
        <Button>取消</Button>
      </FormButtonGroup>
    </Form>
  );
};

export default Setps;
