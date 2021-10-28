/**
 * 质检方案编辑页
 *
 * @author Captain_Jazz
 * @Date 2021-10-28 10:29:56
 */

import React, {useRef} from 'react';
import {Button, Card, Input} from 'antd';
import Form from '@/components/Form';
import {qualityPlanDetail, qualityPlanAdd, qualityPlanEdit} from '../qualityPlanUrl';
import * as SysField from '../qualityPlanField';
import ProCard from '@ant-design/pro-card';
import {useRequest} from '@/util/Request';
import {rulesRelationList} from '@/pages/Erp/codingRules/components/rulesRelation/rulesRelationUrl';
import ProSkeleton from '@ant-design/pro-skeleton';
import {FieldList, FormEffectHooks, FormPath} from '@formily/antd';
import SpuList from '@/pages/Erp/parts/components/SpuList';
import {DeleteOutlined, DownOutlined, PlusOutlined, UpOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import {qualityCheckDetail} from '@/pages/Erp/qualityCheck/qualityCheckUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: qualityPlanDetail,
  add: qualityPlanAdd,
  save: qualityPlanEdit
};


const QualityPlanEdit = ({...props}) => {

  const formRef = useRef();

  const {loading, data} = useRequest(rulesRelationList, {
    defaultParams: {
      data: {
        moduleId: 2
      }
    }
  });

  const {run} = useRequest(qualityCheckDetail, {
    manual: true
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  const {onFieldValueChange$} = FormEffectHooks;

  return (
    <Card title="质检方案">
      <Form
        {...props}
        ref={formRef}
        value={false}
        api={ApiConfig}
        fieldKey="qualityPlanId"
        effects={({setFieldState}) => {

          onFieldValueChange$('qualityClassParams.*.qualityCheckClass').subscribe(async (value) => {
            setFieldState(
              FormPath.transform(value.name, /\d/, ($1) => {
                return `qualityClassParams.${$1}.qualityPlanDetailParams.*.qualityCheckId`;
              }),
              state => {
                state.props.qualityCheckClass = value.value;
              }
            );
          });

          onFieldValueChange$('qualityClassParams.*.qualityPlanDetailParams.*.qualityCheckId').subscribe(async (value) => {

            if (value.value) {
              const data = await run({
                data: {
                  qualityCheckId: value.value
                }
              });

              setFieldState(
                FormPath.transform(value.name, /\d/, ($1, $2) => {
                  return `qualityClassParams.${$1}.qualityPlanDetailParams.${$2}.qualityCheckId`;
                }),
                state => {
                  state.props.type = data.type;
                }
              );

              setFieldState(
                FormPath.transform(value.name, /\d/, ($1, $2) => {
                  return `qualityClassParams.${$1}.qualityPlanDetailParams.${$2}.standardValue`;
                }),
                state => {
                  state.props.type = data.type;
                }
              );

              setFieldState(
                FormPath.transform(value.name, /\d/, ($1, $2) => {
                  return `qualityClassParams.${$1}.qualityPlanDetailParams.${$2}.operator`;
                }),
                state => {
                  switch (data.type) {
                    case 1:
                    case 5:
                      state.visible = true;
                      break;
                    case 2:
                    case 3:
                    case 4:
                    case 6:
                    case 7:
                      state.visible = false;
                      break;
                    default:
                      state.visible = true;
                      break;
                  }
                }
              );

            }

          });
        }}
      >
        <div style={{maxWidth: 1220, margin: 'auto'}}>
          <ProCard className="h2Card" title="基本信息" headerBordered>
            <FormItem
              label="方案编号"
              name="planCoding"
              codingId={data && data[0] ? data[0].codingRulesId : null}
              component={SysField.Codings}
              required />
            <FormItem label="方案名称" name="planName" component={SysField.PlanName} required />
            <FormItem label="质检类型" name="planType" component={SysField.PlanType} required />
            <FormItem
              label="检查类型"
              name="testingType"
              component={SysField.TestingType}
              required
            />
            <FormItem label="特别提醒" name="attentionPlease" component={SysField.AttentionPlease} />
            <FormItem label="附件" name="planAdjunct" component={SysField.PlanAdjunct} />
          </ProCard>
          <ProCard className="h2Card" title="质检项" headerBordered>

            <FieldList
              name="qualityClassParams"
              initialValue={[{}]}
            >
              {({state, mutators}) => {
                const onAdd = () => {
                  mutators.push();
                };
                return (
                  <div>
                    {state.value.map((item, indexs) => {
                      const onRemove = indexs => mutators.remove(indexs);
                      const onMoveUp = indexs => mutators.moveUp(indexs);
                      const onMoveDown = indexs => mutators.moveDown(indexs);
                      return (
                        <Card
                          title={`质检分类${indexs + 1}`}
                          headStyle={{border: 'none', borderBottom: 'solid 1px #eee'}}
                          key={indexs}
                          extra={
                            <div style={{display: state.value.length === 1 ? 'none' : 'inline-block',}}>
                              <Button
                                type="link"
                                style={{marginRight: 8}}
                                onClick={() => {
                                  onMoveUp(indexs);
                                }}
                                // icon={<UpOutlined />}
                              >
                                上
                              </Button>
                              <Button
                                type="link"
                                style={{marginRight: 8}}
                                // icon={<DownOutlined />}
                                onClick={() => {
                                  onMoveDown(indexs);
                                }}
                              >
                                下
                              </Button>
                              <Button
                                type="link"
                                style={{marginRight: 8}}
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                  onRemove(indexs);
                                }}
                                danger
                              />
                            </div>
                          }
                        >
                          <div style={{display: 'inline-block', width: '30%'}}>
                            <FormItem
                              labelCol={7}
                              label="分类"
                              name={`qualityClassParams.${indexs}.qualityCheckClass`}
                              component={SysField.QualityCheckClass}
                              required
                            />
                          </div>

                          <div style={{border:'solid #eee 1px',padding:16}}>
                            <FieldList
                              name={`qualityClassParams.${indexs}.qualityPlanDetailParams`}
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
                                      const onMoveUp = index => mutators.moveUp(index);
                                      const onMoveDown = index => mutators.moveDown(index);
                                      return (
                                        <div key={index}>
                                          <div style={{display: 'inline-block'}}>
                                            <FormItem
                                              labelCol={7}
                                              label={`质检项${index + 1}`}
                                              name={`qualityClassParams.${indexs}.qualityPlanDetailParams.${index}.qualityCheckId`}
                                              component={SysField.QualityCheckId}
                                              required
                                            />
                                          </div>
                                          <div style={{display: 'inline-block'}}>
                                            <FormItem
                                              name={`qualityClassParams.${indexs}.qualityPlanDetailParams.${index}.operator`}
                                              component={SysField.Operator}
                                            />
                                          </div>
                                          <div style={{display: 'inline-block'}}>
                                            <FormItem
                                              name={`qualityClassParams.${indexs}.qualityPlanDetailParams.${index}.standardValue`}
                                              component={SysField.StandardValue}
                                            />
                                          </div>
                                          <div style={{display: 'inline-block', width: '10%'}}>
                                            <FormItem
                                              name={`qualityClassParams.${indexs}.qualityPlanDetailParams.${index}.isNull`}
                                              component={SysField.Yes}
                                            />
                                          </div>
                                          <div style={{
                                            display: state.value.length === 1 ? 'none' : 'inline-block',
                                            float: 'right'
                                          }}>
                                            <Button
                                              type="link"
                                              disabled={index === 0}
                                              style={{marginRight: 8}}
                                              onClick={() => {
                                                onMoveUp(index);
                                              }}
                                              // icon={<UpOutlined />}
                                            >
                                              上
                                            </Button>
                                            <Button
                                              type="link"
                                              disabled={index === state.value.length - 1}
                                              style={{marginRight: 8}}
                                              // icon={<DownOutlined />}
                                              onClick={() => {
                                                onMoveDown(index);
                                              }}
                                            >
                                              下
                                            </Button>
                                            <Button
                                              type="link"
                                              style={{marginRight: 8}}
                                              icon={<DeleteOutlined />}
                                              onClick={() => {
                                                onRemove(index);
                                              }}
                                              danger
                                            />
                                          </div>
                                        </div>
                                      );
                                    })}
                                    <Button
                                      type="dashed"
                                      icon={<PlusOutlined />}
                                      onClick={onAdd}>增加质检项</Button>
                                  </div>
                                );
                              }}
                            </FieldList>
                          </div>
                        </Card>
                      );
                    })}
                    <Button
                      style={{marginTop: 8}}
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={onAdd}>增加分类</Button>
                  </div>
                );
              }}
            </FieldList>
          </ProCard>
        </div>
      </Form>
    </Card>
  );
};

export default QualityPlanEdit;
