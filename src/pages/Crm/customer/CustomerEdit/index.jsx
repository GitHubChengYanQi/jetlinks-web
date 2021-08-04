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
        api={ApiConfig}
        labelCol={9}
        wrapperCol={13}
        fieldKey="customerId"
      >
        <ProCard style={{marginTop: 8}} title="基本信息" headerBordered>
          <Row gutter={24} style={{padding: '0 30px'}}>
            <Col span={24}>
              <FormItem labelCol={4} wrapperCol={21} label="客户名称" name="customerName" component={SysField.CustomerName} method={props.value} onSuccess={(customerId)=>{props.onSuccess();history.push(`/CRM/customer/${customerId}`);}} required />
            </Col>
          </Row>
          <Row gutter={24} style={{padding: '0 30px'}}>
            <Col span={12}>
              <FormItem label="客户状态" name="status" component={SysField.Status} />
            </Col>
            <Col span={12}>
              <FormItem label="客户分类" name="classification" component={SysField.Classification} />
            </Col>
          </Row>

          <Row gutter={24} style={{padding: '0 30px'}}>
            <Col span={12}>
              <FormItem label="负责人" name="userId" component={SysField.UserName} />
            </Col>
          </Row>
        </ProCard>

        <ProCard
          title="详细信息"
          headerBordered
        >

          <Row gutter={24} style={{padding: '0 30px'}}>
            <Col span={12}>
              <FormItem label="法定代表人" name="legal" component={SysField.Legal} />
            </Col>
            <Col span={12}>
              <FormItem label="公司类型" name="companyType" component={SysField.CompanyType} />
            </Col>
          </Row>

          <Row gutter={24} style={{padding: '0 30px'}}>
            <Col span={12}>
              <FormItem label="成立时间" name="setup" component={SysField.Setup} />
            </Col>
            <Col span={12}>
              <FormItem label="统一社会信用代码" name="utscc" component={SysField.Utscc} />
            </Col>
          </Row>

          <Row gutter={24} style={{padding: '0 30px'}}>
            <Col span={12}>
              <FormItem label="营业期限" name="businessTerm" component={SysField.BusinessTerm} />
            </Col>
            <Col span={12}>
              <FormItem label="注册地址" name="signIn" component={SysField.SignIn} />

            </Col>
          </Row>

          <Row gutter={24} style={{padding: '0 30px'}}>
            <Col span={12}>
              <FormItem label="简介" name="introduction" component={SysField.Introduction} />
            </Col>
            <Col span={12}>
              <FormItem label="备注" name="note" component={SysField.Note} />
            </Col>
          </Row>

          <Row gutter={24} style={{padding: '0 30px'}}>
            <Col span={12}>
              <FormItem label="网址" name="url" component={SysField.Url} />
            </Col>
            <Col span={12}>

              <FormItem label="客户级别" name="customerLevelId" component={SysField.CustomerLevelId} />
            </Col>
          </Row>

          <Row gutter={24} style={{padding: '0 30px'}}>
            <Col span={12}>
              <FormItem label="客户来源" name="originId" component={SysField.OriginId} />
            </Col>
            <Col span={12}>
              <FormItem label="邮箱" name="emall" component={SysField.Emall} />
            </Col>
          </Row>
          <Row gutter={24} style={{padding: '0 30px'}}>
            <Col span={12}>
              <FormItem label="行业" name="industryOne" component={SysField.IndustryOne} />

            </Col>
          </Row>

        </ProCard>


      </Form>


    </>
  );
};

export default CustomerEdit;
