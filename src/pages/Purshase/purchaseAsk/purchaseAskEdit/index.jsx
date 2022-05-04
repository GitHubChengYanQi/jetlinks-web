/**
 * 采购申请编辑页
 *
 * @author song
 * @Date 2021-12-15 09:35:37
 */

import React, {useEffect, useImperativeHandle, useRef} from 'react';
import {Col, message, Row} from 'antd';
import ProCard from '@ant-design/pro-card';
import {
  FormEffectHooks,
  FormPath, MegaLayout,
} from '@formily/antd';
import {getSearchParams} from 'ice';
import Form from '@/components/Form';
import {purchaseAskDetail, purchaseAskAdd, purchaseAskEdit} from '../purchaseAskUrl';
import * as SysField from '../purchaseAskField';
import {request, useRequest} from '@/util/Request';
import {skuDetail, skuResults} from '@/pages/Erp/sku/skuUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: purchaseAskDetail,
  add: purchaseAskAdd,
  save: purchaseAskEdit
};

const PurchaseAskEdit = ({
  loading = () => {
  },
  onSuccess = () => {
  },
  onError = () => {
  },
  value,
}, ref) => {

  const params = getSearchParams();

  const formRef = useRef();

  useImperativeHandle(ref, () => ({
    submit: formRef.current.submit
  }));

  const skus = params.skus && JSON.parse(params.skus);

  const {run} = useRequest(skuResults, {
    manual: true,
    onSuccess: (res) => {
      formRef.current.setFieldValue('purchaseListings', res.map((item, index) => {
        return {
          ...skus[index],
          skuResult: item,
          coding: item.standard,
        };
      }));
    }
  });

  useEffect(() => {
    if (Array.isArray(skus)) {
      run({data: {skuIds: skus.map(item => item.skuId)}});
    }
  }, []);

  return (
    <div>
      <Form
        value={value || false}
        ref={formRef}
        api={ApiConfig}
        loading={loading}
        NoButton={false}
        fieldKey="purchaseAskId"
        wrapperCol={24}
        onSuccess={() => {
          onSuccess();
        }}
        onError={() => {
          onError();
        }}
        onSubmit={(value) => {
          if (!(value.purchaseListings && value.purchaseListings.length > 0)) {
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
          <MegaLayout labelWidth={120}>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem label="编号" name="coding" component={SysField.Codings} module={5} />
              </Col>
              <Col span={8}>
                <FormItem label="采购申请类型" name="type" component={SysField.Type} required />
              </Col>
              <Col span={8}>
                <FormItem label="备注说明" name="note" component={SysField.Note} />
              </Col>
            </Row>
          </MegaLayout>
        </ProCard>

        <FormItem name="purchaseListings" component={SysField.AddSku} />

      </Form>
    </div>
  );
};

export default React.forwardRef(PurchaseAskEdit);
