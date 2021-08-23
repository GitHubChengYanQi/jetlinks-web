/**
 * 客户管理表编辑页
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

import React, {useRef} from 'react';
import {Anchor} from 'antd';
import {
  customerAdd,
  customerDetail, customerEdit
} from '@/pages/Crm/customer/CustomerUrl';
import * as SysField from '@/pages/Crm/customer/CustomerField';
import Form from '@/pages/Crm/customer/CustomerEdit/components/From';
import ProCard from '@ant-design/pro-card';
import {useHistory} from 'ice';
import {MegaLayout} from '@formily/antd-components';

const {FormItem} = Form;


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
        api={ApiConfig}
        fieldKey="customerId"
      >
        <ProCard style={{marginTop: 8}} title="基本信息" headerBordered>
          <MegaLayout labelWidth={120}>
            <FormItem
              label="客户名称" name="customerName" component={SysField.CustomerName}
              method={props.value}
              onSuccess={(customerId) => {
                props.onSuccess();
                history.push(`/CRM/customer/${customerId}`);
              }} required />

          </MegaLayout>
          <MegaLayout labelWidth={120} grid>
            <FormItem label="客户状态" name="status" component={SysField.Status} />
            <FormItem label="客户分类" name="classification" component={SysField.Classification} />
          </MegaLayout>
          <MegaLayout labelWidth={120} grid>
            <FormItem label="负责人" name="userId" component={SysField.UserName} />
          </MegaLayout>


        </ProCard>

        <ProCard
          title="详细信息"
          headerBordered
        >


          <MegaLayout labelWidth={120} grid>
            <FormItem label="法定代表人" name="legal" component={SysField.Legal} />
            <FormItem label="公司类型" name="companyType" component={SysField.CompanyType} />
          </MegaLayout>

          <MegaLayout labelWidth={120} grid>
            <FormItem label="成立时间" name="setup" component={SysField.Setup} />
            <FormItem label="统一社会信用代码" name="utscc" component={SysField.Utscc} />
          </MegaLayout>

          <MegaLayout labelWidth={120} grid>
            <FormItem label="营业期限" name="businessTerm" component={SysField.BusinessTerm} />
            <FormItem label="注册地址" name="signIn" component={SysField.SignIn} />
          </MegaLayout>

          <MegaLayout labelWidth={120} grid>
            <FormItem label="网址" name="url" component={SysField.Url} />
            <FormItem label="客户级别" name="customerLevelId" component={SysField.CustomerLevelId} />
          </MegaLayout>

          <MegaLayout labelWidth={120} grid>
            <FormItem label="客户来源" name="originId" component={SysField.OriginId} />
            <FormItem label="邮箱" name="emall" component={SysField.Emall} />
          </MegaLayout>


          <MegaLayout labelWidth={120} grid>
            <FormItem label="行业" name="industryId" component={SysField.IndustryOne} />
          </MegaLayout>

          <MegaLayout labelWidth={120}>
            <FormItem label="简介" name="introduction" component={SysField.Introduction} />
          </MegaLayout>

          <MegaLayout labelWidth={120}>
            <FormItem label="备注" name="note" component={SysField.Note} />
          </MegaLayout>


        </ProCard>


      </Form>


    </>
  );
};

export default CustomerEdit;
