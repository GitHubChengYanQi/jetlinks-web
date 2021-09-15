/**
 * 编辑页
 *
 * @author
 * @Date 2021-09-07 09:50:09
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {competitorDetail, competitorAdd, competitorEdit} from '../competitorUrl';
import * as SysField from '../competitorField';
import ProCard from '@ant-design/pro-card';
import {MegaLayout} from '@formily/antd-components';

const {FormItem} = Form;

const ApiConfig = {
  view: competitorDetail,
  add: competitorAdd,
  save: competitorEdit
};

const CompetitorEdit = ({onChange,...props}) => {

  const {value} = props;
  // const {position} = props;
  const formRef = useRef();
  const height = () => {
    if (window.document.body.clientHeight < 1088) {
      return 'calc(100vh - 206px)';
    }
    return 850;
  };

  return (
    <div style={{height: height()}}>
      <Form
        {...props}
        value={value ? value.competitorId : false}
        ref={formRef}
        api={ApiConfig}
        res={(res) => {
          onChange(res);
        }}
        wrapperCol={24}
        fieldKey="competitorId"
      >
        <div style={{height: height(), overflow: 'auto'}}>
          <ProCard
            title="详细信息"
            headerBordered
          >
            <MegaLayout labelWidth={150} full>
              <FormItem label="竞争对手企业名称" name="name" component={SysField.Name} required />
            </MegaLayout>
            <MegaLayout labelWidth={150} full>
              <FormItem label="竞争项目名称" name="businessId" component={SysField.BusinessId} value={value && value.crmBusinessList.length>0 && value.crmBusinessList[0].businessId} required />
            </MegaLayout>
            <MegaLayout labelWidth={150}>
              <FormItem label="地区" name="region" component={SysField.Region} required />
            </MegaLayout>
            <MegaLayout labelWidth={150} grid>
              <FormItem label="创立日期" name="creationDate" component={SysField.CreationDate} required />
              <FormItem label="联系电话" name="phone" component={SysField.Phone} required />
            </MegaLayout>
            <MegaLayout labelWidth={150} grid>
              <FormItem label="网址 " name="url" component={SysField.Url} required />
              <FormItem label="邮箱" name="email" component={SysField.Email} required />
            </MegaLayout>
            <MegaLayout labelWidth={150} grid>
              <FormItem label="员工规模" name="staffSize" component={SysField.StaffSize} required />
              <FormItem label="公司所有制" name="ownership" component={SysField.Ownership} required />
            </MegaLayout>
            <MegaLayout labelWidth={150} grid>
              <FormItem label="竞争级别" name="competitionLevel" component={SysField.CompetitionLevel} required />
              <FormItem label="年销售" name="annualSales" component={SysField.AnnualSales} required />
            </MegaLayout>
            <MegaLayout labelWidth={150}>
              <FormItem label="公司简介" name="companyProfile" component={SysField.CompanyProfile} required />
            </MegaLayout>
            <MegaLayout labelWidth={150}>
              <FormItem label="对手优势" name="rivalAdvantage" component={SysField.RivalAdvantage} required />
            </MegaLayout>
            <MegaLayout labelWidth={150}>
              <FormItem label="对手劣势" name="opponentsWeaknesses" component={SysField.OpponentsWeaknesses} required />
            </MegaLayout>
            <MegaLayout labelWidth={150}>
              <FormItem label="采取对策" name="takeCountermeasures" component={SysField.TakeCountermeasures} required />
            </MegaLayout>
          </ProCard>
        </div>
      </Form>
    </div>
  );
};

export default CompetitorEdit;
