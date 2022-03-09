/**
 * 联系人表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Button, Col, Divider, message, Row} from 'antd';
import {createFormActions, InternalFieldList as FieldList} from '@formily/antd';
import styled from 'styled-components';
import ProCard from '@ant-design/pro-card';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import Title from '@/components/Title';
import * as SysField from '@/pages/Crm/contacts/ContactsField';
import {contactsDetail, contactsAdd, contactsEdit} from '../contactsUrl';
import Form from '@/components/Form';
import {CompanyRoleId, DeptName} from '@/pages/Crm/customer/CustomerField';

const {FormItem} = Form;

const ApiConfig = {
  view: contactsDetail,
  add: contactsAdd,
  save: contactsEdit
};


const formActionsPublic = createFormActions();
const ContactsEdit = ({...props}, ref) => {

  const {customerId, ...other} = props;
  const formRef = useRef(null);


  useImperativeHandle(ref, () => ({
    submit: formRef.current.submit,
  }));


  return (
    <>
      <div style={{padding: 16}}>
        <Form
          {...other}
          NoButton={false}
          formActions={formActionsPublic}
          ref={formRef}
          api={ApiConfig}
          fieldKey="contactsId"
          onSubmit={(value) => {

            if (value.positionName) {
              value = {...value, positionName: value.positionName.id ? value.positionName.id : value.positionName.name};
            }

            if (value.deptName) {
              value = {
                ...value,
                deptName: value.deptName.id ? value.deptName.id : value.deptName.name
              };
            }

            if (!customerId) {
              message.warn('请选择客户！');
              return false;
            }
            return {...value, customerId};
          }}
          onSuccess={(data) => {
            props.onSuccess(data && data.data);
          }}
          onError={() => {
          }}
        >
          <ProCard
            className="h2Card"
            style={{marginTop: 8}}
            title={<Title title="联系人信息" level={4} />}
            headerBordered>
            <FormItem label="联系人姓名" name="contactsName" component={SysField.ContactsName} required />
            <FormItem label="职务" name="positionName" component={CompanyRoleId} />
            <FormItem label="部门" name="deptName" component={DeptName} />
          </ProCard>
          <FieldList
            name="phoneParams"
            initialValue={[
              {phoneNumber: ''},
            ]}
          >

            {({state, mutators}) => {
              const onAdd = () => mutators.push();
              return (
                <div>
                  <ProCard
                    className="h2Card"
                    style={{marginTop: 8}}
                    title={<Title title="联系人电话" level={4} />}
                    extra={<Button
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={onAdd}>增加电话</Button>}
                    headerBordered>

                    {state.value.map((item, index) => {
                      const onRemove = index => mutators.remove(index);
                      return (
                        <div key={index}>
                          <div style={{display:'inline-block',width:'90%'}}>
                            <FormItem
                              label="电话号码"
                              name={`phoneParams.${index}.phoneNumber`}
                              component={SysField.PhoneNumber}
                              rules={[{
                                required: true,
                                message: '请输入正确的手机号码!',
                                pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
                              }]}
                            />
                          </div>
                          <Button
                            type="link"
                            style={{float: 'right', display: state.value.length === 1 && 'none'}}
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => {
                              onRemove(index);
                            }} />
                        </div>
                      );
                    })}
                  </ProCard>
                </div>
              );
            }}
          </FieldList>
        </Form>
      </div>
    </>
  );
};

export default forwardRef(ContactsEdit);
