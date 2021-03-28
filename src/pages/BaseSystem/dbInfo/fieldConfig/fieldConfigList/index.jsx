/**
 * 字段配置列表页
 *
 * @author Sing
 * @Date 2020-12-12 10:33:42
 */

import React, {useEffect, useState, useImperativeHandle} from 'react';
import {
  Form,
  FormItem,
  InternalFieldList as FieldList,
  createFormActions,
  FormEffectHooks,
  FormPath
} from '@formily/antd';
import {Table, Skeleton, Checkbox, Select, Input} from 'antd';
import {useRequest} from '@/util/Request';
import {fieldConfigAdd, fieldConfigList} from '@/pages/BaseSystem/dbInfo/fieldConfig/fieldConfigUrl';
import DbSourceConfig from '@/pages/BaseSystem/dbInfo/fieldConfig/dbSourceConfig';
import styles from './index.module.less';


const actions = createFormActions();
const {onFieldValueChange$,onFieldInputChange$} = FormEffectHooks;

const FieldConfigList = (
  {
    dbId,
    tableName,
    onLoading = () => {
    },
    Loaded = () => {
    }
  }
  , ref) => {

  const [fieldLists, setFieldLists] = useState(null);
  const {run, loading} = useRequest(fieldConfigList, {
    manual: true,
    onSuccess: (result) => {
      setFieldLists(result);
    }
  });

  const {run: save} = useRequest(fieldConfigAdd, {
    manual: true
  });

  const submit = async (values) => {
    onLoading();
    const response = await save({
      data: values
    });
    Loaded(response);
  };

  useEffect(() => {
    setFieldLists(null);
    if (dbId && tableName) {
      run({
        params: {
          dbId,
          tableName
        }
      });
    }
  }, [dbId, tableName]);

  useImperativeHandle(ref, () => ({
    submit: actions.submit
  }));

  if (loading) {
    return (<Skeleton active/>);
  }
  return (
    fieldLists && <Form
      onSubmit={(values) => {
        submit(values);
      }}
      initialValues={{
        tableName,
        fieldLists
      }}
      className={styles.table}
      actions={actions}
      effects={({setFieldValue}) => {
        onFieldInputChange$('fieldLists.*.type').subscribe(({name, value}) => {
          setFieldValue(
            FormPath.transform(name, /\d/, $1 => {
              return `fieldLists.${$1}.config`;
            }),
            {
              type: value
            }
          );
        });
      }}
    >
      <FormItem name="tableName" component={Input} display={false}/>
      <FieldList
        name="fieldLists"
      >
        {
          ({state, mutators}) => {
            return (
              <Table
                dataSource={state.value}
                rowKey="columnName"
                pagination={false}
              >
                <Table.Column
                  dataIndex="columnName"
                  title="字段名"
                  width={200}
                  render={(text, values, index) => {
                    return (
                      <>{values.columnName}
                        <FormItem
                          name={`fieldLists.${index}.fieldName`}
                          value={values.columnName}
                          component={Input}
                          display={false}
                        />
                      </>
                    );
                  }}
                />
                <Table.Column dataIndex="columnComment" title="字段注释"/>
                <Table.Column title="编辑页" width={100} align="center" render={(text, values, index) => {
                  return (
                    <FormItem name={`fieldLists.${index}.inEdit`} component={Checkbox.Group} options={[
                      {label: '', value: 'true'}
                    ]} itemStyle={{width: 16, display: 'inline-block'}}/>
                  );
                }}/>
                <Table.Column title="列表显示" width={100} align="center" render={(text, values, index) => {
                  return (
                    <FormItem name={`fieldLists.${index}.showList`} component={Checkbox.Group} options={[
                      {label: '', value: 'true'}
                    ]} itemStyle={{width: 16, display: 'inline-block'}}/>
                  );
                }}/>
                <Table.Column title="搜索条件" width={100} align="center" render={(text, values, index) => {
                  return (
                    <FormItem name={`fieldLists.${index}.isSearch`} component={Checkbox.Group} options={[
                      {label: '', value: 'true'}
                    ]} itemStyle={{width: 16, display: 'inline-block'}}/>
                  );
                }}/>
                <Table.Column dataIndex="type" title="类型" render={(text, values, index) => {
                  return (
                    <FormItem name={`fieldLists.${index}.type`} component={Select} options={[
                      {label: '不指定', value: ''},
                      {label: 'Input', value: 'input'},
                      {label: 'Title标题', value: 'title'},
                      {label: '数字', value: 'number'},
                      {label: '上级ID', value: 'parentKey'},
                      {label: '联级选择控件（接口）', value: 'cascader'},
                      {label: 'Select控件（接口）', value: 'select'},
                      {label: 'Select控件（固定值）', value: 'selectValue'},
                      {label: 'Checkbox控件', value: 'checkbox'},
                      {label: 'Radio控件', value: 'radio'},
                      {label: '文本区域', value: 'textArea'},
                      {label: '时间控件', value: 'time'},
                      {label: '日期控件', value: 'date'},
                    ]} style={{minWidth:175}}/>
                  );
                }}/>
                <Table.Column title="数据配置" render={(text, values, index) => {
                  return (
                    <FormItem name={`fieldLists.${index}.config`} component={DbSourceConfig}/>
                  );
                }}/>
              </Table>
            );
          }
        }
      </FieldList>
    </Form>
  );
};

export default React.forwardRef(FieldConfigList);
