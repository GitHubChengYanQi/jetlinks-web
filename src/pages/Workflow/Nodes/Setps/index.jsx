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
import {Rule} from '@/pages/Workflow/Nodes/Setps/components/SetpsField';

const actions = createFormActions();


const Setps = ({value, onClose, onChange, type, module}) => {

  const types = () => {
    switch (type) {
      case 'quality':
        return [
          {label: '审批', value: 'audit'},
          {label: '质检', value: 'quality'},
        ];
      case 'purchase':
        return [
          {label: '审批', value: 'audit'},
          {label: '采购', value: 'purchase'},
        ];
      default:
        return [
          {label: '工序', value: 'setp',},
          {label: '工艺', value: 'ship',},
          {label: '审批', value: 'audit'},
          {label: '质检', value: 'quality'},
          {label: '采购', value: 'purchase'},
          {label: '流程', value: 'audit_process',}
        ];
    }
  };

  const modules = () => {
    switch (type) {
      case 'quality':
        switch (module) {
          case 'inQuality':
          case 'purchaseQuality':
            return [
              {label: '分派任务', value: 'quality_dispatch'},
              {label: '执行任务', value: 'quality_perform'},
              {label: '完成任务', value: 'quality_complete'},
            ];
          default:
            return [];
        }
      case 'purchase':
        switch (module) {
          case 'purchaseAsk':
            return [
              {label: '采购申请完成', value: 'purchase_complete'},
            ];
          case 'purchasePlan':
            return [];
          case 'purchaseOrder':
            return [];
          default:
            return [];
        }
      default:
        return [];
    }
  };

  return (
    <Form
      labelCol={4}
      wrapperCol={12}
      actions={actions}
      effects={($, {setFieldState}) => {
        FormEffectHooks.onFieldValueChange$('type').subscribe(({value}) => {

          const item = ['setp', 'ship', 'audit', 'quality', 'purchase', 'audit_process'];
          for (let i = 0; i < item.length; i++) {
            const field = item[i];
            setFieldState(field, state => {
              state.visible = value === field;
            });
          }
        });

        FormEffectHooks.onFieldValueChange$('quality_action').subscribe(({value}) => {

          setFieldState('actionRule', state => {
            if (value === 'quality_dispatch') {
              state.visible = true;
            } else {
              state.visible = false;
            }
          });

        });

      }}
      defaultValue={{
        type: value && value.type || 'audit',
        auditRule: value && value.auditRule,
        actionRule: value && value.auditRule,
        quality_action: value && value.action,
        purchase_action: value && value.action
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
        dataSource={types()} />

      <VirtualField name="audit">
        <FormItem
          required
          name="auditRule"
          component={Rule}
        />
      </VirtualField>
      <VirtualField name="quality">
        <FormItem
          required
          label="质检动作"
          name="quality_action"
          component={Select}
          dataSource={modules()}
        />
        <FormItem
          required
          visible={false}
          label="设置规则"
          name="actionRule"
          component={Rule}
        />
      </VirtualField>
      <VirtualField name="purchase">
        <FormItem
          required
          label="采购动作"
          name="purchase_action"
          component={Select}
          dataSource={modules()}
        />
      </VirtualField>
      <VirtualField name="audit_process">暂未开放</VirtualField>

      <div style={{marginTop: 16}}>
        <FormButtonGroup offset={8} sticky>
          <Submit>确定</Submit>
          <Button onClick={() => {
            typeof onClose === 'function' && onClose();
          }}>取消</Button>
        </FormButtonGroup>
      </div>
    </Form>
  );
};

export default Setps;
