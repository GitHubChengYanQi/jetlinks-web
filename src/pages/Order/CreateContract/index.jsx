import React, {useImperativeHandle, useRef} from 'react';
import {Alert, Spin} from 'antd';
import {FormEffectHooks} from '@formily/antd';
import Form from '@/components/Form';
import {deliveryAdd} from '@/pages/Erp/delivery/deliveryUrl';
import Coding from '@/pages/Erp/tool/components/Coding';
import {AllField, TemplateId} from '@/pages/Order/CreateOrder/components/Field';
import {useRequest} from '@/util/Request';
import {templateGetLabel} from '@/pages/Crm/template/TemplateUrl';

const ApiConfig = {
  view: {},
  add: deliveryAdd,
  save: {}
};

const {FormItem} = Form;

const CreateContract = ({...props}, ref) => {

  const formRef = useRef();

  useImperativeHandle(ref, () => ({
    submit: formRef.current.submit,
  }));

  const {loading, data, run} = useRequest(templateGetLabel, {manual: true});

  return <div style={{padding: 24}}>
    <Form
      NoButton={false}
      value={false}
      ref={formRef}
      api={ApiConfig}
      fieldKey="deliveryId"
      effects={() => {
        FormEffectHooks.onFieldValueChange$('templateId').subscribe(({value}) => {
          if (value) {
            run({
              params: {templateId: value}
            });
          }
        });
      }}
    >
      <FormItem label="合同编码" name="contractCoding" component={Coding} required />
      <FormItem label="合同模板" name="templateId" component={TemplateId} required />
      {loading ? <Spin>
        <Alert
          style={{padding: 32}}
          message="正在加载合同变量，请稍后..."
          type="info"
        />
      </Spin> : <AllField array={data} />}
    </Form>
  </div>;
};

export default React.forwardRef(CreateContract);
