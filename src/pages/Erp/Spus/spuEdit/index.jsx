/**
 * 编辑页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useImperativeHandle, useRef, useState} from 'react';
import {
  Col,
  notification,
  Row,
  Spin,
} from 'antd';
import ProCard from '@ant-design/pro-card';
import {createAsyncFormActions, createFormActions, FormEffectHooks,} from '@formily/antd';
import Form from '@/components/Form';
import {spuDetail, spuAdd, spuEdit, spuClassificationListSelect} from '../spuUrl';
import * as SysField from '../spuField';
import {request, useRequest} from '@/util/Request';
import {categoryDetail} from '@/pages/Erp/category/categoryUrl';
import {spuClassificationList} from '@/pages/Erp/spu/components/spuClassification/spuClassificationUrl';
import {useBoolean} from 'ahooks';

const {FormItem} = Form;

const ApiConfig = {
  view: spuDetail,
  add: spuAdd,
  save: spuEdit
};

const formActionsPublic = createFormActions();

const SpuEdit = ({...props}, ref) => {

  const formRef = useRef();


  const {onFieldValueChange$} = FormEffectHooks;

  const [attribute, setAttribute] = useState();

  const [spus, setSpus] = useState([]);

  const openNotificationWithIcon = type => {
    notification[type]({
      message: '创建成功！',
    });
  };

  const {loading, run} = useRequest(categoryDetail, {
    manual: true, onSuccess: (res) => {
      setAttribute(res.categoryRequests);
    }
  });

  const {loading: spuClassLoading, run: spuClass} = useRequest(spuClassificationListSelect, {
    manual: true,
    onSuccess: (res) => {
      setSpus(res);
    }
  });

  useImperativeHandle(ref, () => ({
    formRef,
  }));

  const [details, setDetails] = useState();



  return (
    <div style={{padding: 16}}>
      <Form
        NoButton={false}
        {...props}
        ref={formRef}
        api={ApiConfig}
        formActions={formActionsPublic}
        fieldKey="spuId"
        details={(value) => {
          setDetails(value);
        }}
        effects={({setFieldState}) => {
          onFieldValueChange$('categoryId').subscribe(({value}) => {
            if (value !== undefined && value !== '0') {
              run({
                data: {
                  categoryId: value
                }
              });
            }
          });

          onFieldValueChange$('spuClass').subscribe(async ({value}) => {
            if (value) {
              spuClass({
                data: {
                  spuClassificationId: value,
                  type: 2,
                }
              });
            }
          });
        }}
        onSuccess={() => {
          openNotificationWithIcon('success');
          // history.goBack();
          props.onSuccess();
        }}
        onSubmit={(value) => {
          return {...value, type: 1, isHidden: false};
        }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <ProCard title="基础信息" className="h2Card" headerBordered>
              <FormItem label="配置" name="categoryId" component={SysField.CategoryId} required />
              <FormItem label="名字" name="name" component={SysField.Name} required />
              <FormItem
                label="分类"
                name="spuClass"
                component={SysField.SpuClass}
                defaultParams={{data: {isNotproduct: 1}}}
                value={details && details.spuClassificationResult && details.spuClassificationResult.pid}
                required />
              <FormItem
                label="产品"
                name="spuClassification"
                component={SysField.Spu}
                value={{name:details && details.spuClassificationResult && details.spuClassificationResult.name,id:details && details.spuClassificationId}}
                required
                loading={spuClassLoading}
                options={spus}
              />
              <FormItem label="单位" name="unitId" value={details && details.unitId} component={SysField.UnitId} required />
              <FormItem label="生产类型" name="productionType" component={SysField.Type} required />
            </ProCard>
          </Col>
          <Col span={12}>
            <ProCard title="详细信息" className="h2Card" headerBordered>
              <FormItem label="养护周期" name="curingCycle" component={SysField.CuringCycle} />
              <FormItem label="质保期" name="shelfLife" component={SysField.ShelfLife} />
              <FormItem label="材质名称" name="materialId" component={SysField.MaterialId} />
              <FormItem label="易损" name="vulnerability" component={SysField.Vulnerability} />
              <FormItem label="重要程度" name="important" component={SysField.Important} />
              <FormItem label="产品重量" name="weight" component={SysField.Weight} />
            </ProCard>
          </Col>
        </Row>


        <ProCard title="属性信息" className="h2Card" headerBordered>
          {loading ?
            <div style={{textAlign: 'center'}}><Spin size="large" /></div>
            :
            <FormItem name="spuAttributes" component={SysField.Atts} spuId={props.value} attribute={attribute} />}
        </ProCard>
      </Form>
    </div>
  );
};

export default React.forwardRef(SpuEdit);
