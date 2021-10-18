/**
 * sku表编辑页
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

import React, {useEffect, useRef} from 'react';
import {Input, Radio, Table} from 'antd';
import Form from '@/components/Form';
import {skuDetail, skuAdd, skuEdit} from '../skuUrl';
import * as SysField from '../skuField';
import {useRequest} from '@/util/Request';
import {itemAttributeList} from '@/pages/Erp/itemAttribute/itemAttributeUrl';
import {attributeValuesList} from '@/pages/Erp/attributeValues/attributeValuesUrl';
import {SkuName} from '../skuField';
import {FieldList} from '@formily/antd';

const {FormItem} = Form;

const ApiConfig = {
  view: skuDetail,
  add: skuAdd,
  save: skuEdit
};


const SkuEdit = ({...props}) => {

  const {spuId, attributes, ...other} = props;
  const formRef = useRef();

  return (
    <div style={{padding: 16}}>
      <Form
        {...other}
        ref={formRef}
        api={ApiConfig}
        fieldKey="skuId"
      >
        <div style={{display: 'none'}}>
          <FormItem hidden name="spuId" component={SysField.SpuId} value={spuId} required />
          <FormItem hidden name="spuId" component={SysField.SpuId} value={spuId} required />
        </div>

        <FieldList
          name="attributeValues"
          initialValue={[]}
        >

          {attributes && attributes.map((items, index) => {
            return (
              <div key={index}>
                <div style={{display: 'none'}}>
                  <FormItem
                    key={index}
                    name={`attributeValues.${index}.attribute`}
                    component={SysField.Attributes}
                    value={items.attribute && items.attribute.attributeId}
                    required />
                </div>
                <FormItem
                  key={index}
                  label={items.attribute && items.attribute.attribute}
                  name={`attributeValues.${index}.Vlaues`}
                  component={SysField.Values}
                  items={items.value || []} required />
              </div>
            );
          })}

        </FieldList>


      </Form>
    </div>
  );
};

export default SkuEdit;
