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
import {Rule, StautsId} from '@/pages/Workflow/Nodes/Setps/components/SetpsField';

const actions = createFormActions();


const Setps = ({value, onClose, onChange, module}) => {

  return (
    <Form
      labelCol={4}
      wrapperCol={12}
      actions={actions}
      effects={($, {setFieldState}) => {

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
        documentsStatusId: value && value.documentsStatusId
      }}
      onSubmit={(values) => {
        typeof onChange === 'function' && onChange(values);
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
        required
        type={module}
        label="单据状态"
        name="documentsStatusId"
        component={StautsId}
      />

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
