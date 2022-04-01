import React, {useState} from 'react';
import {
  Form,
  FormItem,
  createFormActions,
  VirtualField,
  FieldList,
  Submit,
} from '@formily/antd';
import {Radio} from '@formily/antd-components';
import {Affix, Button, Divider, Input, message, Space} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import InputNumber from '@/components/InputNumber';
import Select from '@/components/Select';
import {qualityCheckListSelect} from '@/pages/Erp/qualityCheck/components/qualityPlan/qualityPlanUrl';
import SelectSku from '@/pages/Erp/sku/components/SelectSku';
import {shipSetpListSelect} from '@/pages/ReSearch/shipSetp/shipSetpUrl';
import {
  Bom,
  ShipNote,
  ShowShip,
  SkuShow,
  Sop,
  Tool
} from '@/pages/ReSearch/BOM/Nodes/Setps/components/SetpsField';
import FileUpload from '@/components/FileUpload';
import {productionStationListSelect} from '@/pages/BaseSystem/productionStation/productionStationUrl';
import Effects from '@/pages/ReSearch/BOM/Nodes/Setps/components/Effects';

const actions = createFormActions();


const Setps = (
  {
    value: defaultValue,
    spuSkuId,
    onClose = () => {
    },
    onChange = () => {
    }
  }) => {

  const [disabled, setDisabled] = useState([]);

  const [productionType, setProductionType] = useState(defaultValue && defaultValue.productionType);

  return (
    <Form
      labelCol={5}
      wrapperCol={12}
      actions={actions}
      onChange={(value) => {
        let valueDisabled = false;
        let details;
        if (value.setpSetDetails) {
          details = value.setpSetDetails.filter((item) => {
            if (productionType === 'out') {
              return !(item && item.partsId && item.skuId && item.num);
            }
            return !(item && item.skuId && item.num);
          }).length === 0;
        } else {
          details = false;
        }

        switch (value.type) {
          case 'ship':
            valueDisabled = value.type && value.skuId && value.processId && value.num;
            break;
          case 'setp':
            valueDisabled = value.type && value.productionType && value.productionStationId && value.shipSetpId && details;
            break;
          default:
            break;
        }

        setDisabled(!valueDisabled);
      }}
      defaultValue={defaultValue || {}}
      effects={({setFieldState}) => {
        Effects(setFieldState, defaultValue);
      }}
      onSubmit={(values) => {
        if (values.type === 'setp') {
          if (values.setpSetDetails) {
            const setpSetDetails = values.setpSetDetails.map((item) => {
              return {
                ...item,
                type: productionType,
              };
            });
            onChange({...values, setpSetDetails, productionType});
          } else {
            message.warn('请选择物料！');
          }

        } else if (values.type === 'ship') {
          onChange({...values});
        }

      }}
    >
      <FormItem
        required
        label="配置生产过程"
        name="type"
        component={Radio.Group}
        dataSource={[
          {label: '工序', value: 'setp',},
          {label: '工艺路线', value: 'ship',},
        ]}/>
      <VirtualField name="setp" visible={false}>
        <FormItem
          label="工序名称"
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
          wrapperCol={10}
          required
          label="投入与产出是否相同"
          name="productionType"
          onChange={(value) => {
            return setProductionType(value.target.value);
          }}
          component={Radio.Group}
          dataSource={[
            {label: '是', value: 'in',},
            {label: '否', value: 'out',},
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
                <div>
                  <Space align='center'>
                    <div style={{width: 50, paddingBottom: 16}}/>
                    <div style={{width: 200, paddingBottom: 16}}><span
                      style={{color: 'red'}}>* </span>产出物料
                    </div>
                    <div style={{width: 90, paddingBottom: 16}}><span
                      style={{color: 'red'}}>* </span>数量
                    </div>
                    <div style={{width: 200, paddingBottom: 16}}>自检方案</div>
                    <div style={{width: 200, paddingBottom: 16}}>质检方案</div>
                  </Space>
                </div>

                {state.value.map((item, index) => {
                  const onRemove = index => mutators.remove(index);
                  return (
                    <div key={index}>
                      <Space align="start">
                        <div style={{width: 50}}>
                          <FormItem
                            visible={false}
                            spuSkuId={spuSkuId}
                            equals={productionType === 'in'}
                            name={`setpSetDetails.${index}.partsId`}
                            component={Bom}
                          />
                        </div>
                        <div style={{width: 200}}>
                          <FormItem
                            name={`setpSetDetails.${index}.skuId`}
                            component={SelectSku}
                            placeholder="选择物料"
                            width="100%"
                            rules={[{
                              required: true,
                              message: '请选择产出物料！'
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
                          icon={<DeleteOutlined/>}
                          onClick={() => {
                            onRemove(index);
                          }}
                          danger
                        />
                      </Space>
                    </div>
                  );
                })}
                <Button
                  type="dashed"
                  icon={<PlusOutlined/>}
                  onClick={onAdd}>增加产出物料</Button>
              </Space>
            );
          }}
        </FieldList>

        <div style={{display: productionType === undefined && 'none'}}>
          <Divider orientation="left">投入物料信息</Divider>

          <FormItem
            productionType={productionType}
            name="skuShow"
            component={SkuShow}
          />
          <Divider orientation="left">关联信息</Divider>
          <FormItem
            label="工位"
            name="productionStationId"
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

        </div>


      </VirtualField>
      <VirtualField name="ship" visible={false}>
        <FormItem
          required
          label="产出物料"
          name="skuId"
          component={SelectSku}
        />
        <FormItem
          visible={false}
          label="工艺路线"
          name="processId"
          component={ShowShip}
        />
        <FormItem
          required
          label="产出数量"
          name="num"
          component={InputNumber}
        />
        <FormItem
          label="备注"
          name="shipNote"
          component={Input.TextArea}
        />
      </VirtualField>

      <Affix offsetBottom={0}>
        <div
          style={{height: 47, borderTop: '1px solid #e7e7e7', background: '#fff', textAlign: 'center', paddingTop: 8}}>
          <Space>
            <Submit disabled={disabled}>确定</Submit>
            <Button onClick={() => {
              onClose();
            }}>取消</Button>
          </Space>
        </div>
      </Affix>
    </Form>
  );
};

export default Setps;
