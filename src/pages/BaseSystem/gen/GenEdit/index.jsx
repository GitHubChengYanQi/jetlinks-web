import React from 'react';
import Form from '@/components/Form';
import {Card, Input} from 'antd';
import {DataBaseInfo, dbTableList} from '@/pages/BaseSystem/gen/GenUrl';
import Select from '@/components/Select';
import GenDataBaseInfo from '@/pages/BaseSystem/gen/GenDataBaseInfo';

const {FormItem} = Form;

const GenEdit = () => {
  return (
    <Card
      title="代码生成"
      style={{width: 800, margin: '0px auto '}}
      bordered={false}
    >
      <Form
        api={{
          add: {}
        }}
        value={false}
      >
        <FormItem label="作者" name="author" component={Input}/>
        <FormItem label="包名" name="proPackage" component={Input}/>
        <FormItem label="表前缀移除" name="removePrefix" component={Input}/>
        <FormItem label="数据源选择" name="dataSourceId" component={Select} api={DataBaseInfo}/>
        <FormItem label="选择表" name="tables" component={GenDataBaseInfo}/>
      </Form>
    </Card>
  );
};

export default GenEdit;
