import React from 'react';
import {
  Form,
  FormItem,
  FormEffectHooks,
  createFormActions,
  VirtualField,
  FieldList,
  Submit,
  FormButtonGroup,
  Reset, FormPath
} from '@formily/antd';
import {Radio, Select, Input} from '@formily/antd-components';
import {Button, Divider, InputNumber} from 'antd';
import styled from 'styled-components';
import SpuList from '@/pages/Erp/instock/components/SpuList';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {request} from '@/util/Request';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';

const actions = createFormActions();

const RowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    margin-right: 16px;
  }

  .ant-form-item {
    display: inline-flex;
    margin-right: 16px;
    margin-bottom: 16px;
  }
`;

const Setps = () => {

  return (
    <Form
      actions={actions}
      effects={($, {setFieldState}) => {
        FormEffectHooks.onFieldValueChange$('type').subscribe(({value}) => {

          const item = ['setp', 'ship', 'audit', 'audit_process'];
          for (let i = 0; i < item.length; i++) {
            const field = item[i];
            setFieldState(field, state => {
              state.visible = value === field;
            });
          }
        });

        // 控制投入物料的产品规格联动
        FormEffectHooks.onFieldValueChange$('inGoodsList.*.spuId').subscribe(async (value) => {
          if (value.value) {
            const data = await request({
              ...spuDetail,
              data: {
                spuId: value.value
              }
            });

            setFieldState(
              FormPath.transform(value.name, /\d/, $1 => {
                return `inGoodsList.${$1}.skuId`;
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

        // 控制投入物料的产品规格联动
        FormEffectHooks.onFieldValueChange$('outGoodsList.*.spuId').subscribe(async (value) => {
          if (value.value) {
            const data = await request({
              ...spuDetail,
              data: {
                spuId: value.value
              }
            });

            setFieldState(
              FormPath.transform(value.name, /\d/, $1 => {
                return `outGoodsList.${$1}.skuId`;
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
      defaultValue={{
        type: 'setp'
      }}
    >
      <FormItem
        required
        label="类型"
        name="type"
        component={Radio.Group}
        dataSource={[
          {label: '工序', value: 'setp'},
          {label: '工艺', value: 'ship'},
          {label: '审批', value: 'audit'},
          {label: '流程', value: 'audit_process'}
        ]} />
      <VirtualField name="setp">
        <FormItem
          wrapperCol={10}
          required
          label="工序"
          name="setpId"
          component={Select}
          dataSource={[
            {label: '工序1', value: '1'},
            {label: '工序2', value: '2'},
            {label: '工序3', value: '3'},
            {label: '工序4', value: '4'}
          ]}
        />
        <FormItem
          wrapperCol={10}
          required
          label="工时"
          name="length"
          component={Input}
        />
        <Divider orientation="left">投入物料：</Divider>
        <FieldList
          name="inGoodsList"
        >
          {({state, mutators}) => {
            const onAdd = () => mutators.push();
            return (
              <div>
                {state.value.map((item, index) => {
                  const onRemove = index => mutators.remove(index);
                  return (
                    <div key={index}>

                      <SpuList
                        style={{display: 'inline-block', width: '30%'}}
                        spuName={`inGoodsList.${index}.spuId`}
                        spuLabel="产品"
                        skusName={`inGoodsList.${index}.skuId`}
                        skuLabel="规格" />
                      <div style={{display: 'inline-block', width: '15%'}}>
                        <FormItem
                          name={`inGoodsList.${index}.num`}
                          component={InputNumber}
                          title="数量"
                        />
                      </div>
                      <Button
                        type="link"
                        style={{float: 'right'}}
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          onRemove(index);
                        }}
                        danger
                      />
                    </div>
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
        <Divider orientation="left">产出：</Divider>
        <FieldList
          name="outGoodsList"
        >
          {({state, mutators}) => {
            const onAdd = () => mutators.push();
            return (
              <div>
                {state.value.map((item, index) => {
                  const onRemove = index => mutators.remove(index);
                  return (
                    <div key={index}>

                      <SpuList
                        style={{display: 'inline-block', width: '30%'}}
                        spuName={`outGoodsList.${index}.spuId`}
                        spuLabel="产品"
                        skusName={`outGoodsList.${index}.skuId`}
                        skuLabel="规格" />
                      <div style={{display: 'inline-block', width: '15%'}}>
                        <FormItem
                          name={`outGoodsList.${index}.num`}
                          component={InputNumber}
                          title="数量"
                        />
                      </div>

                      <div style={{display: 'inline-block', width: '20%'}}>
                        <FormItem
                          name={`outGoodsList.${index}.qualityCheck`}
                          component={Select}
                          title="质检方案"
                        />
                      </div>
                      <Button
                        type="link"
                        style={{float: 'right'}}
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          onRemove(index);
                        }}
                        danger
                      />
                    </div>
                  );
                })}
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={onAdd}>增加产出</Button>
              </div>
            );
          }}
        </FieldList>
      </VirtualField>
      <VirtualField name="ship">
        <FormItem
          required
          label="工艺"
          name="setpsId"
          component={Select}
          dataSource={[
            {label: '工艺1', value: '1'},
            {label: '工艺2', value: '2'},
            {label: '工艺3', value: '3'},
            {label: '工艺4', value: '4'}
          ]}
        />
      </VirtualField>
      <VirtualField name="audit">暂未开放</VirtualField>
      <VirtualField name="audit_process">暂未开放</VirtualField>

      <div style={{marginTop: 16}}>
        <FormButtonGroup offset={8} sticky>
          <Submit>确定</Submit>
          <Button>取消</Button>
        </FormButtonGroup>
      </div>
    </Form>
  );
};

export default Setps;
