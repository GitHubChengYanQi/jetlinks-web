/**
 * 客户管理表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useRef, useState} from 'react';
import {Anchor, Card, Col, Descriptions, Row, Steps} from 'antd';
import {
  customerAdd,
  customerDetail, customerEdit
} from '@/pages/Crm/customer/CustomerUrl';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import Form from '@/pages/Crm/customer/CustomerEdit/components/From';
import ProCard from '@ant-design/pro-card';
import {Button} from 'antd';
import {RightOutlined} from '@ant-design/icons';
import {useHistory} from 'ice';
import {CustomerName} from '@/pages/Crm/customer/CustomerField';
import {MegaLayout} from '@formily/antd-components';

const {FormItem} = Form;


const {Link} = Anchor;

const ApiConfig = {
  view: customerDetail,
  add: customerAdd,
  save: customerEdit
};


const CustomerEdit = ({...props}) => {


  const formRef = useRef();

  const history = useHistory();


  return (
    <>


      <Form
        {...props}
        ref={formRef}
        labelCol={7}
        wrapperCol={20}
        api={ApiConfig}
        fieldKey="customerId"
        labelAlign="right"
      >
        <ProCard style={{marginTop: 8}} title="基本信息" headerBordered>
          <MegaLayout full>
          <FormItem labelCol={4} label="客户名称" name="customerName" component={SysField.CustomerName} method={props.value}
                    onSuccess={(customerId) => {
                      props.onSuccess();
                      history.push(`/CRM/customer/${customerId}`);
                    }} required />
          </MegaLayout>
          <MegaLayout grid>
            <FormItem label="客户状态" name="status" component={SysField.Status} />
            <FormItem label="客户分类" name="classification" component={SysField.Classification} />
          </MegaLayout>

          <MegaLayout grid>
            <FormItem label="负责人" name="userId" component={SysField.UserName} />
          </MegaLayout>

        </ProCard>

        <ProCard
          title="详细信息"
          headerBordered
        >


          <MegaLayout grid>
            <FormItem label="法定代表人" name="legal" component={SysField.Legal} />
            <FormItem label="公司类型" name="companyType" component={SysField.CompanyType} />
          </MegaLayout>

          <MegaLayout grid>
            <FormItem label="成立时间" name="setup" component={SysField.Setup} />
            <FormItem label="统一社会信用代码" name="utscc" component={SysField.Utscc} />
          </MegaLayout>

          <MegaLayout grid>

            <FormItem label="营业期限" name="businessTerm" component={SysField.BusinessTerm} />
            <FormItem label="注册地址" name="signIn" component={SysField.SignIn} />

          </MegaLayout>

          <MegaLayout grid>
            <FormItem label="网址" name="url" component={SysField.Url} />
            <FormItem label="客户级别" name="customerLevelId" component={SysField.CustomerLevelId} />
          </MegaLayout>

          <MegaLayout grid>
            <FormItem label="客户来源" name="originId" component={SysField.OriginId} />
            <FormItem label="邮箱" name="emall" component={SysField.Emall} />
          </MegaLayout>

          <MegaLayout grid>
            <FormItem label="行业" name="industryId" component={SysField.IndustryOne} />

          </MegaLayout>

          <MegaLayout>
            <FormItem label="简介" name="introduction" component={SysField.Introduction} />
          </MegaLayout>

          <MegaLayout>
            <FormItem label="备注" name="note" component={SysField.Note} />
          </MegaLayout>


        </ProCard>


      </Form>


    </>
  );
};

export default CustomerEdit;
