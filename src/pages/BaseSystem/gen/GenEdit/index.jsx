import React, {useRef, useState} from 'react';
import Form from '@/components/Form';
import {Card, Input, Radio} from 'antd';
import {DataBaseInfo, execute} from '@/pages/BaseSystem/gen/GenUrl';
import Select from '@/components/Select';
import GenDataBaseInfo from '@/pages/BaseSystem/gen/GenDataBaseInfo';
import {LifeCycleTypes} from '@formily/antd';
import cookie from 'js-cookie';
import qs from 'qs';
import {config} from 'ice';

const {FormItem} = Form;

const GenEdit = () => {

  let javaGenPack = {
    author: '',
    proPackage: 'cn.atsoft.dasheng.app',
    removePrefix: '',
    version: 'at',
    genLocation: 'DEFAULT_PATH',
    dataSourceId: ''
  };
  const javaGen = cookie.get('java-gen');
  try {
    if (javaGen) {
      javaGenPack = JSON.parse(javaGen);
    }
  } catch (e) {
    console.warn('javaGen error');
  }

  const formRef = useRef(null);

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
        initialValues={javaGenPack}
        onSubmit={(values) => {
          console.log(values);
          const result = {
            ...values,
            tables: [
              '',
              ...values.tables
            ]
          };
          result.tables = result.tables.join('CAT');
          console.log(qs.stringify(result));
          window.open(`${config.baseURI}${execute.url}?${qs.stringify(result)}`);
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
            setFieldState('tables', state => {
              if (fieldState.value) {
                setDataSourceId(fieldState.value);
              }
              state.visible = fieldState.value !== '';
            });
          });
        }}
      >
        <FormItem label="作者" name="author" component={Input} help="作者写在代码中的注释"/>
        <FormItem label="包名" required name="proPackage" component={Input} placeholder="cn.at-soft.dasheng" help="一般是把域名（或您的邮箱）反转过来做前缀，后面增加产品名称的字符。"/>
        <FormItem label="表前缀移除" name="removePrefix" component={Input} style={{width: 200}} help="移除表前缀的关键词"/>
        <FormItem label="版本" required name="version" component={Radio.Group} options={[
          {
            label: 'React前后端分离版',
            value: 'at'
          }
        ]}/>
        <FormItem label="生成位置" required name="genLocation" component={Radio.Group} options={[
          {
            label: '文件默认的下载路径',
            value: 'DEFAULT_PATH'
          },
          {
            label: '下载并生成到本项目',
            value: 'PROJECT_PATH',
            disabled: true
          }
        ]}/>
        <FormItem label="数据源选择" required name="dataSourceId" component={Select} api={DataBaseInfo} placeholder="请选择数据源" style={{width: 200}}/>
        <FormItem label="选择表" required name="tables" component={GenDataBaseInfo} dataSourceId={dataSourceId}/>
      </Form>
    </Card>
  );
};

export default GenEdit;
