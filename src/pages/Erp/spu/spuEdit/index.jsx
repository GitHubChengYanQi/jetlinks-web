/**
 * 编辑页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useRef, useState} from 'react';
import {Affix, Button, Card, Checkbox, Col, Divider, Input, Row, Spin, Table as AntTable, Table} from 'antd';
import Form from '@/components/Form';
import {spuDetail, spuAdd, spuEdit} from '../spuUrl';
import * as SysField from '../spuField';
import ProCard from '@ant-design/pro-card';
import {FormEffectHooks, InternalFieldList as FieldList, Reset, Submit} from '@formily/antd';
import styled from 'styled-components';
import {useRequest} from '@/util/Request';
import {categoryDetail} from '@/pages/Erp/category/categoryUrl';
import {useHistory} from 'ice';

const {FormItem} = Form;
const {Column} = AntTable;

const ApiConfig = {
  view: spuDetail,
  add: spuAdd,
  save: spuEdit
};


const SpuEdit = ({...props}) => {

  const formRef = useRef();

  const history = useHistory();

  const {onFieldChange$} = FormEffectHooks;

  const [attribute, setAttribute] = useState();

  const {loading, run} = useRequest(categoryDetail, {
    manual: true, onSuccess: (res) => {
      setAttribute(res.categoryRequests);
    }
  });

  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        NoButton={false}
        value={false}
        ref={formRef}
        api={ApiConfig}
        fieldKey="spuId"
        effect={() => {
          onFieldChange$('categoryId').subscribe(({value}) => {
            if (value !== undefined && value !== '0') {
              run({
                data: {
                  categoryId: value
                }
              });
            }

          });
        }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <ProCard title="基础信息" className="h2Card" headerBordered>
              <FormItem label="类目" name="categoryId" component={SysField.CategoryId} required />
              <FormItem label="产品名字" name="name" component={SysField.Name} required />
              <FormItem label="制件方式" name="type" component={SysField.Type} required />
              <FormItem label="生产日期" name="productionTime" component={SysField.ProductionTime} required />
              <FormItem label="质保期" name="shelfLife" component={SysField.ShelfLife} required />
            </ProCard>
          </Col>
          <Col span={12}>
            <ProCard title="详细信息" className="h2Card" headerBordered>
              <FormItem label="材质名称" name="materialId" component={SysField.MaterialId} />
              <FormItem label="易损" name="vulnerability" component={SysField.Vulnerability} />
              <FormItem label="重要程度" name="important" component={SysField.Important} />
              <FormItem label="产品重量" name="weight" component={SysField.Weight} />
              <FormItem label="成本" name="cost" component={SysField.Cost} />
            </ProCard>
          </Col>
        </Row>


        <ProCard title="属性信息" className="h2Card" headerBordered>
          {loading ?
            <div style={{textAlign: 'center'}}><Spin size="large" /></div>
            :
            <FormItem name="Atts" component={SysField.Atts} attribute={attribute} />}
        </ProCard>
        <div>
          <Submit showLoading>保存</Submit>
          <Button style={{marginLeft: 16}} onClick={() => {
            history.push('/ERP/spu');
          }}>返回</Button>
        </div>
      </Form>

    </div>
  );
};

export default SpuEdit;
