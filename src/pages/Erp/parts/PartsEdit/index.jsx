/**
 * 清单编辑页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef} from 'react';
import Form from '@/components/Form';
import {Button, notification, Steps} from 'antd';
import {partsDetail, partsAdd, partsEdit} from '../PartsUrl';
import * as SysField from '../PartsField';
import {useBoolean} from 'ahooks';
import {FieldList, FormEffectHooks, FormPath} from '@formily/antd';
import styled from 'styled-components';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import SpuList from '@/pages/Erp/parts/components/SpuList';
import {request, useRequest} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';

const {FormItem} = Form;

const {Step} = Steps;

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
    min-width: 300px;
  }
`;

const {onFieldValueChange$} = FormEffectHooks;

const PartsEdit = ({...props}) => {

  const [add, {setTrue, setFalse}] = useBoolean();

  const openNotificationWithIcon = type => {
    notification[type]({
      message: type === 'success' ? '保存成功！' : '删除成功！',
    });
  };

  const formRef = useRef(null);

  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="partsId"
        NoButton={false}
        onSuccess={() => {
          setFalse();
          openNotificationWithIcon('success');
          props.onSuccess();
        }}
        effects={({setFieldState}) => {
          onFieldValueChange$('parts.*.spuId').subscribe(async (value) => {
            if (value.value) {
              const data = await request({
                ...spuDetail,
                data: {
                  spuId: value.value
                }
              });

              setFieldState(
                FormPath.transform(value.name, /\d/, $1 => {
                  return `parts.${$1}.partsAttributes`;
                }),
                state => {
                  if (value.active) {
                    state.props.select = value;
                  }
                  state.props.sku = data.sku;
                }
              );
            }

          });
        }}
      >
        <FieldList
          name="parts"
          initialValue={[{}]}
        >
          {({state, mutators}) => {
            const onAdd = () => {
              setTrue();
              mutators.push();
            };
            return (
              <div>
                {state.value.map((item, index) => {
                  const onRemove = index => mutators.remove(index);
                  return (
                    <RowStyleLayout key={index}>

                      <SpuList
                        spuLabel="物料名称"
                        skuLabel="规格描述"
                        spuName={`parts.${index}.spuId`}
                        index={index}
                        skusName={`parts.${index}.partsAttributes`} />

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
                          setTrue();
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
                <Button
                  type="primary"
                  style={{marginLeft: 8}}
                  onClick={() => {
                    formRef.current.submit();
                  }}
                >保存</Button>
              </div>
            );
          }}
        </FieldList>
      </Form>
    </div>
  );
};

export default PartsEdit;
