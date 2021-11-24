import React from 'react';
import {
  Form,
  FormItem,
  FormEffectHooks,
  createFormActions,
  VirtualField,
  FieldList,
  Submit,
  FormButtonGroup,
} from '@formily/antd';
import {Radio, Select, Input} from '@formily/antd-components';
import {Button, Divider, InputNumber} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {SkuId} from '@/pages/Workflow/Process/processField';
import {UserId} from '@/pages/Workflow/Nodes/Setps/components/SetpsField';

const actions = createFormActions();


const Setps = ({value, onChange}) => {

  return (
    <Form
      labelCol={4}
      wrapperCol={12}
      actions={actions}
      effects={($, {setFieldState}) => {
        FormEffectHooks.onFieldValueChange$('type').subscribe(({value}) => {

          const item = ['setp', 'ship', 'audit','quality', 'audit_process'];
          for (let i = 0; i < item.length; i++) {
            const field = item[i];
            setFieldState(field, state => {
              state.visible = value === field;
            });
          }
        });


        FormEffectHooks.onFieldValueChange$('auditType').subscribe(({value}) => {
          if (value === '指定人') {
            setFieldState('rule', (state) => {
              state.visible = true;
            });
          } else if (value === '主管') {
            setFieldState('rule', (state) => {
              state.visible = false;
            });
          }
        });

      }}
      defaultValue={{
        type: value && value.type || 'audit',
        auditType: value && value.auditType,
        rule: value && value.rule,
        action: value && value.auditType,
      }}
      onSubmit={(values) => {
        typeof onChange === 'function' && onChange(values);
      }}
    >
      <FormItem
        required
        label="类型"
        name="type"
        component={Radio.Group}
        dataSource={[
          {label: '工序', value: 'setp', disabled: true},
          {label: '工艺', value: 'ship', disabled: true},
          {label: '审批', value: 'audit'},
          {label: '质检', value: 'quality'},
          {label: '流程', value: 'audit_process', disabled: true}
        ]} />
      <VirtualField name="setp">
        <FormItem
          wrapperCol={10}
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
          wrapperCol={10}
          required
          label="工时"
          name="length"
          component={Input}
        />
        <Divider orientation="left">投入物料：</Divider>
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
                    <div key={index}>

                      <div style={{display: 'inline-block', width: '40%'}}>
                        <FormItem
                          label="物料"
                          name={`inGoodsList.${index}.skuId`}
                          component={SkuId}
                          required
                        />
                      </div>
                      <div style={{display: 'inline-block', width: '40%'}}>
                        <FormItem
                          name={`inGoodsList.${index}.num`}
                          component={InputNumber}
                          title="数量"
                        />
                      </div>
                      <Button
                        type="link"
                        style={{float: 'right'}}
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          onRemove(index);
                        }}
                        danger
                      />
                    </div>
                  );
                })}
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={onAdd}>增加物料</Button>
              </div>
            );
          }}
        </FieldList>
        <Divider orientation="left">产出：</Divider>
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
                    <div key={index}>

                      <div style={{display: 'inline-block', width: '40%'}}>
                        <FormItem
                          label="物料"
                          name={`outGoodsList.${index}.skuId`}
                          component={SkuId}
                          required
                        />
                      </div>
                      <div style={{display: 'inline-block', width: '20%'}}>
                        <FormItem
                          name={`outGoodsList.${index}.num`}
                          component={InputNumber}
                          title="数量"
                        />
                      </div>

                      <div style={{display: 'inline-block', width: '30%'}}>
                        <FormItem
                          name={`outGoodsList.${index}.qualityCheck`}
                          component={Select}
                          title="质检方案"
                        />
                      </div>
                      <Button
                        type="link"
                        style={{float: 'right'}}
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          onRemove(index);
                        }}
                        danger
                      />
                    </div>
                  );
                })}
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={onAdd}>增加产出</Button>
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
      <VirtualField name="audit">
        <FormItem
          required
          label="类型"
          name="auditType"
          component={Select}
          dataSource={[
            {label: '指定人', value: '指定人'},
            {label: '主管', value: '主管'},
            // {label: '自主选择', value: 'optional'},
          ]}
        />
        <FormItem
          required
          label="指定人"
          visible={false}
          name="rule"
          component={UserId}
        />
      </VirtualField>
      <VirtualField name="quality">
        <FormItem
          required
          label="质检动作"
          name="action"
          component={Select}
          dataSource={[
            {label: '执行任务', value: '执行任务'},
            {label: '完成任务', value: '完成任务'},
          ]}
        />
      </VirtualField>
      <VirtualField name="audit_process">暂未开放</VirtualField>

      <div style={{marginTop: 16}}>
        <FormButtonGroup offset={8} sticky>
          <Submit>确定</Submit>
          <Button>取消</Button>
        </FormButtonGroup>
      </div>
    </Form>
  );
};

export default Setps;
