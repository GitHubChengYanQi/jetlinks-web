/**
 * 出库单编辑页
 *
 * @author cheng
 * @Date 2021-08-16 10:51:46
 */

import React, {useRef} from 'react';
import {Button, Col, message, Row} from 'antd';
import {FormEffectHooks, MegaLayout} from '@formily/antd';
import ProCard from '@ant-design/pro-card';
import {config} from 'ice';
import Form from '@/components/Form';
import {outstockOrderDetail, outstockOrderAdd, outstockOrderEdit} from '../outstockOrderUrl';
import * as SysField from '../outstockOrderField';
import {useRequest} from '@/util/Request';
import Modal from '@/components/Modal';
import PartsList from '@/pages/Erp/parts/PartsList';
import {partsDetail} from '@/pages/Erp/parts/PartsUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: outstockOrderDetail,
  add: outstockOrderAdd,
  save: outstockOrderEdit
};

const {onFieldValueChange$} = FormEffectHooks;

const {wxCp} = config;

const OutstockOrderEdit = ({...props}) => {

  const partsRef = useRef();

  const formRef = useRef();

  const {loading: partsLoading, run: parts} = useRequest(partsDetail, {
    manual: true,
    onSuccess: (res) => {
      formRef.current.setFieldValue('applyDetails', res.parts);
    }
  });

  return (
    <div style={{padding: 24}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="outstockOrderId"
        wrapperCol={24}
        onSuccess={() => {
          props.onSuccess();
        }}
        onError={() => {

        }}
        onSubmit={(value) => {
          if (!value.applyDetails || value.applyDetails.length === 0) {
            message.warn('请添加出库物料！');
            return false;
          }
          return {...value, url: `${wxCp}OrCode?id=codeId`};
        }}
        effects={({setFieldState}) => {

          onFieldValueChange$('bom').subscribe(async ({value}) => {
            setFieldState('applyDetails', state => {
              state.props.skuId = value;
            });
          });
        }}
      >
        <MegaLayout labelWidth={120}>
          <ProCard title="出库信息" className="h2Card" headerBordered>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem label="编码" name="coding" module={2} component={SysField.Codings} required />
              </Col>
              <Col span={8}>
                <FormItem label="仓库" name="storehouseId" component={SysField.Storhouse} required />
              </Col>
              <Col span={8}>
                <FormItem label="负责人" name="userId" component={SysField.UserId} required />
              </Col>
            </Row>


            <FormItem label="备注" name="note" component={SysField.Note} />

          </ProCard>
        </MegaLayout>

        <FormItem
          name="applyDetails"
          loading={partsLoading}
          component={SysField.AddSku}
          cardExtra={<Button onClick={() => {
            partsRef.current.open(false);
          }}>拷贝BOM</Button>}
        />

      </Form>

      <Modal
        headTitle="拷贝BOM"
        width={800}
        spuSkuId
        component={PartsList}
        getPartsId={(id) => {
          partsRef.current.close();
          parts({
            data: {
              partsId: id,
            }
          });
        }}
        ref={partsRef}
      />

    </div>

  );
};

export default OutstockOrderEdit;
