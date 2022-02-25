/**
 * 物品分类表编辑页
 *
 * @author
 * @Date 2021-10-18 10:54:16
 */

import React, {useRef} from 'react';
import ProCard from '@ant-design/pro-card';
import {InternalFieldList as FieldList} from '@formily/antd';
import {Button, Card, Space} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import * as SysField from '../categoryField';
import {categoryDetail, categoryAdd} from '../categoryUrl';
import Form from '@/components/Form';

const {FormItem} = Form;

const ApiConfig = {
  view: categoryDetail,
  add: categoryAdd,
  save: categoryAdd
};

const CategoryEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="categoryId"
    >
      <ProCard title="基本信息" className="h2Card" headerBordered>
        <FormItem label="上级配置" name="pid" component={SysField.Pid} required />
        <FormItem label="配置名称" name="categoryName" component={SysField.CategoryName} required />
        <FormItem label="排序" name="sort" component={SysField.Scort} required />
      </ProCard>

      <ProCard title="属性值" className="h2Card" headerBordered>
        <FieldList
          name="itemAttributeParams"
          initialValue={[
            {},
          ]}
        >
          {({state, mutators}) => {
            const onAdd = (mutators) => mutators.push();
            const onRemove = (index, mutators) => mutators.remove(index);
            return (
              <div>
                {state.value.map((item, index) => {
                  return (<FieldList
                    key={index}
                    name={`itemAttributeParams.${index}.attributeValuesParams`}
                    initialValue={[
                      {},
                    ]}
                  >
                    {({state:stateValue, mutators:mutatorsValue}) => {
                      return (
                        <Card
                          bordered={false}
                          headStyle={{borderLeft: 'none', padding: 0}}
                          key={index}
                          title={
                            <FormItem
                              labelCol={3}
                              itemStyle={{margin: 0}}
                              label={`属性${index + 1}`}
                              name={`itemAttributeParams.${index}.attribute`}
                              component={SysField.CategoryName}
                              required
                            />
                          }
                          extra={<Space align='center'>
                            <Button
                              type="dashed"
                              style={{marginTop: 8}}
                              icon={<PlusOutlined />}
                              onClick={() => {
                                onAdd(mutatorsValue);
                              }}>增加值</Button>
                            <Button
                              type="link"
                              style={{float: 'right'}}
                              disabled={state.value.length === 1}
                              icon={<DeleteOutlined />}
                              onClick={() => {
                                onRemove(index, mutators);
                              }}
                              danger
                            />
                          </Space>}
                        >
                          <Space direction="vertical">
                            {stateValue.value.map((itemValue, indexValue) => {
                              return (<Space align="start" key={index}>
                                <FormItem
                                  label={`值${indexValue + 1}`}
                                  name={`itemAttributeParams.${index}.attributeValuesParams.${indexValue}.attributeValues`}
                                  component={SysField.CategoryName}
                                  required
                                />
                                <Button
                                  type="link"
                                  style={{marginLeft: 8}}
                                  disabled={state.value.length === 1}
                                  icon={<DeleteOutlined />}
                                  onClick={() => {
                                    onRemove(indexValue, mutatorsValue);
                                  }}
                                  danger
                                />
                              </Space>);
                            })}
                          </Space>
                        </Card>
                      );
                    }}
                  </FieldList>);
                })}
                <Button
                  type="dashed"
                  style={{marginTop: 8}}
                  icon={<PlusOutlined />}
                  onClick={() => {
                    onAdd(mutators);
                  }}>增加属性</Button>
              </div>
            );
          }}
        </FieldList>
      </ProCard>
    </Form>
  );
};

export default CategoryEdit;
