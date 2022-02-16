import React, {useState} from 'react';
import {
  Form,
  FormItem,
  FormEffectHooks,
  createFormActions,
  VirtualField,
  FieldList,
  Submit,
  FormButtonGroup,
} from '@formily/antd';
import {Radio} from '@formily/antd-components';
import {Button, Input, InputNumber, Space, Tabs} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import Select from '@/components/Select';
import {qualityCheckListSelect} from '@/pages/Erp/qualityCheck/components/qualityPlan/qualityPlanUrl';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import {shipSetpDetail, shipSetpListSelect} from '@/pages/ReSearch/shipSetp/shipSetpUrl';
import {request} from '@/util/Request';
import {ShipNote, SkuShow, Sop, Tool} from '@/pages/ReSearch/BOM/Nodes/Setps/components/SetpsField';
import FileUpload from '@/components/FileUpload';
import {productionStationListSelect} from '@/pages/BaseSystem/productionStation/productionStationUrl';

const actions = createFormActions();


const Setps = ({value, onClose, onChange}) => {

  const [equals, setEquals] = useState();

  return (
    <Form
      labelCol={5}
      wrapperCol={12}
      actions={actions}
      effects={($, {setFieldState}) => {
        FormEffectHooks.onFieldValueChange$('type').subscribe(({value}) => {
          const item = ['setp', 'ship', 'audit', 'quality', 'purchase', 'audit_process'];
          for (let i = 0; i < item.length; i++) {
            const field = item[i];
            setFieldState(field, state => {
              state.visible = value === field;
            });
          }
        });

        FormEffectHooks.onFieldValueChange$('equals').subscribe(({value}) => {
          setEquals(value);
          setFieldState('goodsList', state => {
            state.visible = true;
            state.value = [{}];
          });
        });

        FormEffectHooks.onFieldValueChange$('goodsList').subscribe(({value}) => {
          setFieldState('skuShow', state => {
            state.value = value;
          });
        });

        FormEffectHooks.onFieldValueChange$('shipSetp').subscribe(async ({value}) => {
          if (value) {
            const res = await request({
              ...shipSetpDetail,
              data: {
                shipSetpId: value
              }
            });
            console.log(res);
            setFieldState('tool', state => {
              state.value = res.binds;
            });

            setFieldState('sop', state => {
              state.value = res.sopResult;
              state.props.sopId = res.sopId;
            });

            setFieldState('shipNote', state => {
              state.value = res.remark;
            });
          }
        });

      }}
      onSubmit={(values) => {
        typeof onChange === 'function' && onChange(values);
      }}
    >
      <FormItem
        required
        label="类型"
        name="type"
        component={Radio.Group}
        dataSource={[
          {label: '工序', value: 'setp',},
          {label: '工艺路线', value: 'ship',},
        ]} />
      <VirtualField name="setp" visible={false}>
        <FormItem
          wrapperCol={10}
          required
          label="投入与产出是否相同"
          name="equals"
          component={Radio.Group}
          dataSource={[
            {label: '是', value: 1,},
            {label: '否', value: 0,},
          ]}
        />

        <FieldList
          name="goodsList"
          visible={false}
          initialValue={[
            {},
          ]}
        >

          {({state, mutators}) => {
            const onAdd = () => mutators.push();
            return (
              <Space direction="vertical">
                <Space>
                  <div style={{width: 200, paddingBottom: 16}}><span
                    style={{color: 'red'}}>* </span>{equals ? '投入物料' : '产出物料'}</div>
                  <div style={{width: 90, paddingBottom: 16}}>数量</div>
                  <div style={{width: 200, paddingBottom: 16}}>自检方案</div>
                  <div style={{width: 200, paddingBottom: 16}}>质检方案</div>
                </Space>
                {state.value.map((item, index) => {
                  const onRemove = index => mutators.remove(index);
                  return (
                    <Space key={index} align="start">
                      <div style={{width: 200}}>
                        <FormItem
                          name={`goodsList.${index}.skuId`}
                          component={SelectSku}
                          placeholder="选择物料"
                          width="100%"
                          rules={[{
                            required: true,
                            message: equals ? '请选择投入物料' : '请选择产出物料！'
                          }]}
                        />
                      </div>
                      <div style={{width: 90, paddingBottom: 16}}>
                        <FormItem
                          name={`goodsList.${index}.number`}
                          component={InputNumber}
                          placeholder="数量"
                          rules={[{
                            required: true,
                            message: '请输入数量!'
                          }]}
                        />
                      </div>
                      <div style={{width: 200}}>
                        <FormItem
                          name={`goodsList.${index}.myQuality`}
                          component={Select}
                          placeholder="自己检查的方案"
                          api={qualityCheckListSelect}
                        />
                      </div>

                      <div style={{width: 200}}>
                        <FormItem
                          name={`goodsList.${index}.quality`}
                          component={Select}
                          placeholder="质量检查的方案"
                          api={qualityCheckListSelect}
                        />
                      </div>

                      <Button
                        type="link"
                        style={{float: 'right', padding: 0}}
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          onRemove(index);
                        }}
                        danger
                      />
                    </Space>
                  );
                })}
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={onAdd}>{equals ? '增加投入物料' : '增加产出物料'}</Button>
              </Space>
            );
          }}
        </FieldList>

        <div style={{display: equals === undefined && 'none'}}>
          <Tabs defaultActiveKey="2" type="card" style={{marginTop: 16}}>
            <Tabs.TabPane tab="工序信息" key="1">
              <FormItem
                label="工序"
                name="shipSetp"
                component={Select}
                api={shipSetpListSelect}
                placeholder="工序"
                rules={[{
                  required: true,
                  message: '请选择工序!'
                }]}
              />
              <FormItem
                label="工位"
                name="productionStation"
                component={Select}
                api={productionStationListSelect}
                placeholder="工位"
                rules={[{
                  required: true,
                  message: '请选择工位!'
                }]}
              />
              <FormItem
                label="使用工具"
                name="tool"
                component={Tool}
                placeholder="使用工具"
              />
              <FormItem
                label="SOP作业指导"
                name="sop"
                component={Sop}
                placeholder="SOP作业指导"
              />
              <FormItem
                label="附件"
                name="file"
                component={FileUpload}
                placeholder="附件"
              />
              <FormItem
                label="工序备注"
                name="shipNote"
                component={ShipNote}
                placeholder="工序备注"
              />
              <FormItem
                name="note"
                label="备注"
                component={Input.TextArea}
                placeholder="请输入生产过程的备注内容"
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab={equals ? '产出物料' : '投入物料'} key="2">
              <FormItem
                name="skuShow"
                component={SkuShow}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>


      </VirtualField>
      <VirtualField name="ship" visible={false}>
        <FormItem
          required
          label="产出物料"
          name="shipSkuId"
          component={SelectSku}
        />
        <FormItem
          required
          label="工艺BOM"
          name="bom"
          disabled
          component={Input}
        />
        <FormItem
          required
          label="工艺路线"
          name="shipRoute"
          disabled
          component={Input}
        />
        <FormItem
          required
          label="产出数量"
          name="shipNumber"
          component={InputNumber}
        />
        <FormItem
          required
          label="附件"
          name="shipFile"
          component={InputNumber}
        />
        <FormItem
          required
          label="备注"
          name="shipNote"
          component={Input.TextArea}
        />
      </VirtualField>

      <div style={{marginTop: 16}}>
        <FormButtonGroup offset={8} sticky>
          <Submit>确定</Submit>
          <Button onClick={() => {
            typeof onClose === 'function' && onClose();
          }}>取消</Button>
        </FormButtonGroup>
      </div>
    </Form>
  );
};

export default Setps;
