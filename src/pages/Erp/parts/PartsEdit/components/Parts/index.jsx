/**
 * 清单编辑页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef, useState} from 'react';
import Form from '@/components/Form';
import {partsDetail, partsAdd, partsEdit} from '../../../PartsUrl';
import * as SysField from '../../../PartsField';
import {Sku} from '../../../PartsField';
import {Button, Select} from 'antd';
import {createFormActions, FieldList, FormEffectHooks} from '@formily/antd';
import SpuList from '@/pages/Erp/instock/components/SpuList';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import styled from 'styled-components';

const {FormItem} = Form;

const ApiConfig = {
  view: partsDetail,
  add: partsAdd,
  save: partsEdit
};

const RowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    margin-right: 16px;
  }

  .ant-form-item {
    display: inline-flex;
    min-width: 270px;
  }
`;


const Parts = ({spuId, ...props}) => {

  const formRef = useRef(null);

  const [type,setType] = useState();

  return (
    <>
      <div style={{margin: '50px 150px'}}>
        <Form
          {...props}
          ref={formRef}
          api={ApiConfig}
          fieldKey="partsId"
          onSubmit={(value) => {
            value = {
              partName: value.partName,
              spuId: value.spuId
            };
            return value;
          }}
          effect={()=>{
            const {setFieldState} = createFormActions();

            FormEffectHooks.onFieldValueChange$('spuId').subscribe(({value}) => {
              if (!type){
                setFieldState(
                  'attributes',
                  state => {
                    state.props.spuId = value;
                  }
                );
              }
            });
          }
          }
        >
          <FormItem label="清单名称" name="partName" component={SysField.PartName} required />
          <FormItem
            label={
              <Select
                defaultValue={0}
                bordered={false}
                options={[{label: 'spu', value: 0}, {label: 'sku', value: 1}]}
                onChange={(value)=>{
                  setType(value);
                }}
              />
            }
            name="spuId"
            type={type}
            component={type ? SysField.Sku : SysField.Spu}
            required />

          {!type && <FormItem label="属性" name="attributes" component={SysField.Attributes} required />}

          <FieldList
            name="parts"
            initialValue={[{}]}
          >
            {({state, mutators}) => {
              const onAdd = () => {
                mutators.push();
              };
              return (
                <div>
                  {state.value.map((item, index) => {
                    const onRemove = index => mutators.remove(index);
                    return (
                      <RowStyleLayout key={index}>

                        <SpuList
                          labelCol={7}
                          spuLabel="物料名称"
                          skuLabel="规格描述"
                          spuName={`parts.${index}.spuId`}
                          index={index}
                          skusName={`parts.${index}.skuId`} />

                        <FormItem
                          labelCol={7}
                          label="数量"
                          name={`parts.${index}.number`}
                          component={SysField.Number}
                          required
                        />
                        <FormItem
                          labelCol={7}
                          label="备注"
                          name={`parts.${index}.note`}
                          component={SysField.Name}
                        />

                        <Button
                          type="link"
                          style={{float: 'right'}}
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            onRemove(index);
                          }}
                          danger
                        />
                      </RowStyleLayout>
                    );
                  })}
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={onAdd}>增加物料</Button>
                </div>
              );
            }}
          </FieldList>

        </Form>
      </div>
    </>
  );
};

export default Parts;
