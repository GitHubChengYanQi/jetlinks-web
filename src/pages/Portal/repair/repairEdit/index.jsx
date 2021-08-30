/**
 * 报修编辑页
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Input, Row, Steps} from 'antd';
import Form from '@/components/Form';
import {repairDetail, repairAdd, repairEdit} from '../repairUrl';
import * as SysField from '../repairField';
import FormIndex from '@/components/Form/FormIndex';
import TableDetail from '@/pages/Crm/business/BusinessEdit/components/TableDetail';
import Drawer from '@/components/Drawer';
import Index from '@/pages/Crm/customer/CustomerEdit/components/ContactsEdit';
import CompanyAddressEdit from '@/pages/Portal/companyAddress/companyAddressEdit';
import {useRequest} from '@/util/Request';
import ProCard from '@ant-design/pro-card';
import {MegaLayout} from '@formily/antd-components';
import {Img} from '../repairField';

const {FormItem} = Form;

const ApiConfig = {
  view: repairDetail,
  add: repairAdd,
  save: repairEdit
};

const RepairEdit = ({...props}) => {

  const {value} = props;




  const [state,setState] = useState();

  const formRef = useRef();

  const {loading, data, run} = useRequest({
    url: '/api/getDeliveryList',
    method: 'POST',
    data: {customerId: props.value ? props.value.customerId : ' ' }
  });


  return (
    <>
      <Form
        {...props}
        value={props.value ? props.value.repairId : false}
        ref={formRef}
        api={ApiConfig}
        wrapperCol={24}
        fieldKey="repairId"
      >

        <ProCard style={{marginTop: 8}} title="使用单位" headerBordered>
          <MegaLayout labelWidth={120}>
            <FormItem label="使用单位" name="customerId" component={SysField.CustomerId} customerId={async (value)=>{
              setState(true);
              await run(
                {
                  data: {customerId: value || ' '}
                }
              );
            }} required />

          </MegaLayout>
          <MegaLayout labelWidth={120} grid>
            <FormItem label="省/市/区" name="area" component={SysField.Province} required />
          </MegaLayout>
          <MegaLayout labelWidth={120} grid>
            <FormItem label="详细地址" name="address" component={SysField.Address} required />
          </MegaLayout>
          <MegaLayout labelWidth={120} grid>
            <FormItem label="姓名" name="people" component={SysField.People} required />
            <FormItem label="电话" name="telephone" component={SysField.Telephone} required />
          </MegaLayout>
          <MegaLayout labelWidth={120} grid wrapperCol={9} >
            <FormItem   label="职务" name="position" component={SysField.Position} required />
          </MegaLayout>


        </ProCard>

        <ProCard
          title="报修信息"
          headerBordered
        >
          <MegaLayout labelWidth={120} grid>
            <FormItem label="设备" name="itemId" component={SysField.ItemId} repair={data || null} state={state} required />
          </MegaLayout>
          <MegaLayout labelWidth={120} grid>
            <FormItem label="图片" name="itemImgUrlList" banner={value.repairId || null} component={SysField.Img}  />
          </MegaLayout>

          <MegaLayout labelWidth={120} grid>
            <FormItem label="服务类型" name="serviceType" component={SysField.ServiceType} required />
            <FormItem label="期望到达日期" name="expectTime" component={SysField.ExpectTime} required />
          </MegaLayout>

          <MegaLayout labelWidth={120} grid>
            <FormItem label="维修费用" name="money" component={SysField.Money} required />
          </MegaLayout>

          <MegaLayout labelWidth={120}>
            <FormItem label="描述" name="comment" component={SysField.Comment} required />
          </MegaLayout>


        </ProCard>


      </Form>
    </>
  );
};

export default RepairEdit;
