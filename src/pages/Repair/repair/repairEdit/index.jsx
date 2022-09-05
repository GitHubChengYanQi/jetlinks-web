/**
 * 报修编辑页
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

import React, {useRef, useState} from 'react';
import ProCard from '@ant-design/pro-card';
import Form from '@/components/Form';
import {repairDetail, repairAdd, repairEdit} from '../repairUrl';
import * as SysField from '../repairField';
import {useRequest} from '@/util/Request';
import store from '@/store';

const {FormItem} = Form;

const ApiConfig = {
  view: repairDetail,
  add: repairAdd,
  save: repairEdit
};

const RepairEdit = ({...props}) => {

  const {value} = props;

  const [state, setState] = useState();

  const [areaData] = store.useModel('dataSource');

  const formRef = useRef();

  const {data, run} = useRequest({
    url: '/api/getDeliveryList',
    method: 'POST',
    data: {customerId: value ? props.value.customerId : '111'}
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
          <FormItem label="使用单位" name="customerId" component={SysField.CustomerId} customerId={async (value) => {
            setState(true);
            await run(
              {
                data: {customerId: value || ' '}
              }
            );
          }} required />
          <FormItem label="省/市/区" name="area" component={SysField.Province} options={areaData && areaData.area}
                    required />
          <FormItem label="详细地址" name="address" component={SysField.Address} required />
          <FormItem label="姓名" name="people" component={SysField.People} required />
          <FormItem label="电话" name="telephone" component={SysField.Telephone} required />
          <FormItem label="职务" name="position" component={SysField.Position} required />

        </ProCard>

        <ProCard
          title="报修信息"
          headerBordered
        >
          <FormItem label="设备" name="itemId" component={SysField.ItemId} repair={data || null} state={state} required />
          <FormItem label="图片" name="itemImgUrlList" banner={value.repairId || null} component={SysField.Img} />
          <FormItem label="服务类型" name="serviceType" component={SysField.ServiceType} required />
          <FormItem label="期望到达日期" name="expectTime" component={SysField.ExpectTime} required />
          <FormItem label="维修费用" name="money" component={SysField.Money} required />
          <FormItem label="描述" name="comment" component={SysField.Comment} required />
        </ProCard>


      </Form>
    </>
  );
};

export default RepairEdit;
