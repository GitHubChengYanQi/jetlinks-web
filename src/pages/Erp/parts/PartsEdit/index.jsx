/**
 * 清单编辑页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef, useState} from 'react';
import Form from '@/components/Form';
import {Button, notification, Steps} from 'antd';
import {partsDetail, partsAdd, partsEdit, partsList} from '../PartsUrl';
import * as SysField from '../PartsField';
import {useBoolean} from 'ahooks';
import {createFormActions, FieldList, FormEffectHooks} from '@formily/antd';
import styled from 'styled-components';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import SpuList from '@/pages/Erp/parts/components/SpuList';
import {useRequest} from '@/util/Request';

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

const PartsEdit = ({...props}) => {

  const [add, {setTrue, setFalse}] = useBoolean();

  const openNotificationWithIcon = type => {
    notification[type]({
      message: type === 'success' ? '保存成功！' : '删除成功！',
    });
  };


  const {onFieldValueChange$} = FormEffectHooks;


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
        effect={() => {
          // onFieldValueChange$('parts.*.spuId').subscribe((observer) => {
          //   console.log(observer);
          // });
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

                      <SpuList index={index} />

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
                  hidden={!add}
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
