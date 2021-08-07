/**
 * 套餐表编辑页
 *
 * @author qr
 * @Date 2021-08-04 11:01:43
 */

import React, {useRef} from 'react';
import {Col, Input, Row} from 'antd';
import Form from '@/components/Form';
import TableDetail from "@/pages/Erp/erpPackage/erpPackageEdit/components/TableDetail";
import {erpPackageDetail, erpPackageAdd, erpPackageEdit} from '../erpPackageUrl';
import * as SysField from '../erpPackageField';
import FormIndex from "@/components/Form/FormIndex";
import ErpPackageTableList from "@/pages/Erp/erpPackageTable/erpPackageTableList";

const {FormItem} = Form;

const ApiConfig = {
  view: erpPackageDetail,
  add: erpPackageAdd,
  save: erpPackageEdit
};

const ErpPackageEdit = (props) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="packageId"
    >
      <Row gutter={24}>
        <Col span={12}>
          <FormItem label="套餐名称" name="productName" component={SysField.productName} required/>
        </Col>
      </Row>
      <TableDetail value={111}/>
    </Form>

  );
};

export default ErpPackageEdit;
