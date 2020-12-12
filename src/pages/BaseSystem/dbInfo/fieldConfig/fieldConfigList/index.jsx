/**
 * 字段配置列表页
 *
 * @author Sing
 * @Date 2020-12-12 10:33:42
 */

import React from 'react';
import {Form, FormItem, InternalFieldList as FieldList} from '@formily/antd';
import {Input} from 'antd';

const FieldConfigList = () => {

  return (
    <Form
    >
      <FieldList
        name="fieldLists"
        initialValue={[
          {username: 'morally', age: 21},
          {username: 'bill', age: 22}
        ]}
      >
        {({state, mutators}) => {
          return (
            <div>
              {state.value.map((item, index) => {

                return (
                  <div key={index}>
                    <FormItem
                      name={`userList.${index}.username`}
                      component={Input}
                      title="用户名"
                    />
                    <FormItem
                      name={`userList.${index}.age`}
                      component={Input}
                      title="年龄"
                    />
                  </div>
                );
              })}
            </div>
          );
        }}
      </FieldList>
    </Form>
  );
};

export default FieldConfigList;
