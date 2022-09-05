import React, {useEffect, useState} from 'react';
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
import {Button, Input, Radio, Space, Tabs} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import InputNumber from '@/components/InputNumber';
import Select from '@/components/Select';
import {qualityCheckListSelect} from '@/pages/Erp/qualityCheck/components/qualityPlan/qualityPlanUrl';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import {shipSetpDetail, shipSetpListSelect} from '@/pages/ReSearch/shipSetp/shipSetpUrl';
import {request} from '@/util/Request';
import {ShipNote, SkuShow, Sop, Tool} from '@/pages/ReSearch/BOM/Nodes/Setps/components/SetpsField';
import FileUpload from '@/components/FileUpload';
import {productionStationListSelect} from '@/pages/BaseSystem/productionStation/productionStationUrl';

const actions = createFormActions();


const Setps = ({value: defaultValue, onClose, onChange, bomSkuIds}) => {

  const [equals, setEquals] = useState(defaultValue && defaultValue.productionType);

  const [type, setType] = useState();

  const [displaySkuIds, setDisplaySkuIds] = useState([]);

  const skuIds = (index) => {
    if (type === 'ship') {
      return bomSkuIds;
    }
    return bomSkuIds && bomSkuIds.filter((item) => {
      const ids = [];
      displaySkuIds.map((sku) => {
        if (index !== sku.index) {
          ids.push(sku.skuId);
        }
        return null;
      });
      if (ids.includes(item.skuId)) {
        return false;
      }
      if (equals) {
        return true;
      } else {
        return item.next === true && item.display !== true;
      }
    });
  };

  useEffect(() => {
    defaultValue = null;
  }, []);

  return (
    <Form
      labelCol={5}
      wrapperCol={12}
      actions={actions}
      defaultValue={defaultValue}
      effects={({setFieldState}) => {

        FormEffectHooks.onFieldValueChange$('type').subscribe(({value}) => {
          setType(value);
          const item = ['setp', 'ship', 'audit', 'quality', 'purchase', 'audit_process'];
          for (let i = 0; i < item.length; i++) {
            const field = item[i];
            setFieldState(field, state => {
              state.visible = value === field;
            });
          }
        });

        FormEffectHooks.onFieldValueChange$('productionType').subscribe(({value}) => {
          setEquals(value);
          setFieldState('setpSetDetails', state => {
            state.visible = true;
            state.value = defaultValue ? defaultValue.setpSetDetails : [{}];
          });
          setFieldState('skuShow', state => {
            state.props.skus = '';
          });
        });

        FormEffectHooks.onFieldValueChange$('setpSetDetails').subscribe(({value, name}) => {
          if (value) {
            setDisplaySkuIds(value.map((item, index) => {
              return {
                skuId: item && item.skuId,
                index,
              };
            }));
          }
          setFieldState('skuShow', state => {
            state.props.skus = value;
          });
        });

        FormEffectHooks.onFieldValueChange$('shipSetpId').subscribe(async ({value}) => {
          if (value) {
            const res = await request({
              ...shipSetpDetail,
              data: {
                shipSetpId: value
              }
            });
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
        // if (!equals){
        //   const array = bomSkuIds && bomSkuIds.map((item) => {
        //     if (displaySkuIds.includes(item.skuId)) {
        //       return {
        //         ...item,
        //         display: true,
        //       };
        //     }
        //     return item;
        //   });
        //   setBomSkuIds(array);
        // }
        typeof onChange === 'function' && onChange(values);
      }}
    >
      <FormItem
        required
        label="配置生产过程"
        name="type"
        component={Radio.Group}
        options={[
          {label: '工序', value: 'setp',},
          {label: '工艺路线', value: 'ship',},
        ]} />
      <VirtualField name="setp" visible={false}>
        <FormItem
          wrapperCol={10}
          required
          label="投入与产出是否相同"
          name="productionType"
          component={Radio.Group}
          options={[
            {label: '是', value: 1,},
            {label: '否', value: 0,},
          ]}
        />

        <FieldList
          name="setpSetDetails"
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
                  <div style={{width: 90, paddingBottom: 16}}><span
                    style={{color: 'red'}}>* </span>数量
                  </div>
                  <div style={{width: 200, paddingBottom: 16}}>自检方案</div>
                  <div style={{width: 200, paddingBottom: 16}}>质检方案</div>
                </Space>
                {state.value.map((item, index) => {
                  const onRemove = index => mutators.remove(index);
                  return (
                    <Space key={index} align="start">
                      <div style={{width: 200}}>
                        <FormItem
                          name={`setpSetDetails.${index}.skuId`}
                          component={SelectSku}
                          placeholder="选择物料"
                          width="100%"
                          ids={skuIds(index).map((item) => {
                            return item.skuId;
                          })}
                          rules={[{
                            required: true,
                            message: equals ? '请选择投入物料' : '请选择产出物料！'
                          }]}
                        />
                      </div>
                      <div style={{width: 90, paddingBottom: 16}}>
                        <FormItem
                          name={`setpSetDetails.${index}.num`}
                          component={InputNumber}
                          placeholder="数量"
                          min={1}
                          rules={[{
                            required: true,
                            message: '请输入数量!'
                          }]}
                        />
                      </div>
                      <div style={{width: 200}}>
                        <FormItem
                          name={`setpSetDetails.${index}.MyQualityId`}
                          component={Select}
                          placeholder="自己检查的方案"
                          api={qualityCheckListSelect}
                        />
                      </div>

                      <div style={{width: 200}}>
                        <FormItem
                          name={`setpSetDetails.${index}.qualityId`}
                          component={Select}
                          placeholder="质量检查的方案"
                          api={qualityCheckListSelect}
                        />
                      </div>

                      <Button
                        type="link"
                        disabled={state.value.length === 1}
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
            <Tabs.TabPane tab="工序信息" key="1" forceRender>
              <FormItem
                label="工序"
                name="shipSetpId"
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
                label="作业指导"
                name="sop"
                component={Sop}
                placeholder="作业指导"
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
            <Tabs.TabPane tab={equals ? '产出物料' : '投入物料'} key="2" forceRender>
              <FormItem
                equals={equals}
                name="skuShow"
                nextSkus={bomSkuIds}
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
          ids={skuIds().map((item) => {
            return item.skuId;
          })}
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
