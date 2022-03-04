/**
 * 采购申请编辑页
 *
 * @author song
 * @Date 2021-12-15 09:35:37
 */

import React, {useRef, useState} from 'react';
import {Affix, Button, Card, message, notification, Space} from 'antd';
import ProCard from '@ant-design/pro-card';
import {
  FormEffectHooks,
  FormPath,
} from '@formily/antd';
import {getSearchParams, useHistory} from 'ice';
import Form from '@/components/Form';
import {purchaseAskDetail, purchaseAskAdd, purchaseAskEdit} from '../purchaseAskUrl';
import * as SysField from '../purchaseAskField';
import {request} from '@/util/Request';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';
import Breadcrumb from '@/components/Breadcrumb';

const {FormItem} = Form;

const ApiConfig = {
  view: purchaseAskDetail,
  add: purchaseAskAdd,
  save: purchaseAskEdit
};

const PurchaseAskEdit = () => {

  const params = getSearchParams();

  const formRef = useRef();

  const [loading, setLoading] = useState();

  const history = useHistory();

  return (
    <>
      <div style={{padding:16}}>
        <Breadcrumb title={params.id ? '编辑采购申请' : '创建采购申请'} />
      </div>
      <Card
        title="创建采购申请"
      >
        <Form
          value={params.id || false}
          ref={formRef}
          api={ApiConfig}
          loading={setLoading}
          NoButton={false}
          fieldKey="purchaseAskId"
          onSuccess={() => {
            notification.success({
              message:'提交申请成功！'
            });
            history.push('/purchase/purchaseAsk');
          }}
          onError={() => {
          }}
          onSubmit={(value) => {
            if (!(value.purchaseListings && value.purchaseListings.length > 0)){
              message.warning('物料、申请数量为必填项！');
              return false;
            }
            const required = value.purchaseListings.filter((items) => {
              return !items.skuId || !items.applyNumber;
            });

            const skuBrands = value.purchaseListings.map((items) => {
              return `${items.skuId}${items.brandId}`;
            });

            const sname = skuBrands.filter((item) => {
              const array = skuBrands.filter((value) => {
                return value === item;
              });
              return array.length > 1;
            });

            if (required.length > 0) {
              message.warning('物料、申请数量为必填项！');
              return false;
            } else if (sname.length > 0) {
              message.warning('物料和品牌不能重复！');
              return false;
            } else {
              return value;
            }
          }}
          effects={({setFieldState}) => {

            FormEffectHooks.onFieldValueChange$('purchaseListings.*.skuId').subscribe(async ({name, value}) => {
              if (value) {
                const sku = await request({...skuDetail, data: {skuId: value}});

                setFieldState(
                  FormPath.transform(name, /\d/, ($1) => {
                    return `purchaseListings.${$1}.unitId`;
                  }),
                  state => {
                    state.value = sku && sku.unit && sku.unit.unitId;
                  }
                );
              }
            });

          }}
        >
          <ProCard title="基础信息" className="h2Card" headerBordered>
            <div style={{display: 'inline-block', width: '30%'}}>
              <FormItem label="编号" name="coding" component={SysField.Codings} module={5} required />
            </div>
            <div style={{display: 'inline-block', width: '30%'}}>
              <FormItem label="采购申请类型" name="type" component={SysField.Type} required />
            </div>
            <div style={{display: 'inline-block', width: '30%'}}>
              <FormItem label="备注说明" name="note" component={SysField.Note} />
            </div>
          </ProCard>

          <FormItem name="purchaseListings" component={SysField.AddSku} />
        </Form>
      </Card>

      <Affix offsetBottom={0}>
        <div
          style={{height: 47, borderTop: '1px solid #e7e7e7', background: '#fff', textAlign: 'center', paddingTop: 8}}>
          <Space>
            <Button
              loading={loading}
              type="primary"
              onClick={() => {
                formRef.current.submit();
              }}
            >提交</Button>
            <Button
              onClick={() => {
                history.push('/purchase/purchaseAsk');
              }}>取消</Button>
          </Space>
        </div>
      </Affix>
    </>
  );
};

export default PurchaseAskEdit;
