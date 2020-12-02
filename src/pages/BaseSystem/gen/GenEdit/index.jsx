import React, {useRef, useState} from 'react';
import Form from '@/components/Form';
import {Card, Input} from 'antd';
import {DataBaseInfo} from '@/pages/BaseSystem/gen/GenUrl';
import Select from '@/components/Select';
import GenDataBaseInfo from '@/pages/BaseSystem/gen/GenDataBaseInfo';
import {LifeCycleTypes} from '@formily/antd';

const {FormItem} = Form;

const GenEdit = () => {

  const dbInfoRef = useRef(null);
  const formRef = useRef(null);

  console.log(formRef);

  const [dataSourceId, setDataSourceId] = useState(0);

  return (
    <Card
      title="代码生成"
      style={{width: 800, margin: '0px auto '}}
      bordered={false}
    >
      <Form
        ref={formRef}
        api={{
          add: {}
        }}
        value={false}
        initialValues={{
          author: '1111111',
          proPackage: '222',
          removePrefix: '3333'
        }}
        onSubmit={(values) => {
          console.log(values);
          return false;
        }}
        labelCol={3}
        wrapperCol={21}
        effects={($, {setFieldState, getFieldState}) => {
          $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
            setFieldState('tables', state => {
              state.visible = false;
            });
          });

          $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'dataSourceId').subscribe(fieldState => {
            console.log(fieldState);
            // console.log(getFieldState);
            getFieldState('tables', (state) => {
              console.log(state);
            });
            setFieldState('tables', state => {
              setDataSourceId(fieldState.value);
              state.visible = fieldState.value !== '';
            });
          });
        }}
      >
        <FormItem label="作者" name="author" component={Input}/>
        <FormItem label="包名" name="proPackage" component={Input}/>
        <FormItem label="表前缀移除" name="removePrefix" component={Input}/>
        <FormItem label="数据源选择" name="dataSourceId" component={Select} api={DataBaseInfo}/>
        <FormItem label="选择表" name="tables" component={GenDataBaseInfo} dataSourceId={dataSourceId}/>
      </Form>
    </Card>
  );
};

export default GenEdit;
