import React from 'react';
import {
  Form,
  FormItem,
  FormEffectHooks,
  createFormActions,
  Submit,
  FormButtonGroup,
} from '@formily/antd';
import {Radio} from '@formily/antd-components';
import {Button} from 'antd';
import {ActionIds, Rule, StautsId} from '@/pages/Workflow/Nodes/Setps/components/SetpsField';

const actions = createFormActions();


const Setps = ({
  value = {},
  onClose = () => {
  },
  onChange = () => {
  },
  type,
  module
}) => {

  return (
    <Form
      labelCol={4}
      wrapperCol={12}
      actions={actions}
      effects={($, {setFieldState, getFieldState}) => {

        FormEffectHooks.onFieldValueChange$('type').subscribe(({value}) => {
          setFieldState('actionStatuses', state => {
            state.visible = value === 'status';
          });
        });

        FormEffectHooks.onFieldValueChange$('documentsStatusId').subscribe(({value, ...props}) => {
          const type = getFieldState('type');
          if (type && type.value === 'status') {
            setFieldState('actionStatuses', state => {
              const visible = value && value.actions;
              state.visible = visible;
              state.props.actions = visible ? value.actions : [];
              state.value = value.actions || [];
            });
          }
        });

      }}
      defaultValue={{
        type: value.type || 'audit',
        ...value,
      }}
      onSubmit={(values) => {
        onChange({...values, documentsStatusId: values.documentsStatusId && values.documentsStatusId.value});
      }}
    >

      <FormItem
        label="人员范围"
        required
        name="auditRule"
        component={Rule}
      />
      <FormItem
        required
        label="类型"
        name="type"
        component={Radio.Group}
        dataSource={[
          {label: '审批', value: 'audit'},
          {label: '状态', value: 'status'},
        ]} />
      <FormItem
        type={type}
        label="单据状态"
        name="documentsStatusId"
        component={StautsId}
        required
      />
      <FormItem
        visible={false}
        label="单据动作"
        defaultValue={value.actionStatuses}
        name="actionStatuses"
        component={ActionIds}
      />

      <div style={{marginTop: 16}}>
        <FormButtonGroup offset={8} sticky>
          <Submit>确定</Submit>
          <Button onClick={() => {
            onClose();
          }}>取消</Button>
        </FormButtonGroup>
      </div>
    </Form>
  );
};

export default Setps;
