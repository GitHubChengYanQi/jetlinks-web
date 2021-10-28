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
import {createFormActions, FieldList, FormEffectHooks, FormPath} from '@formily/antd';
import SpuList from '@/pages/Erp/parts/components/SpuList';
import {DeleteOutlined, DownOutlined, PlusOutlined, UpOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import {spuDetail} from '@/pages/Erp/spu/spuUrl';
import {qualityCheckDetail} from '@/pages/Erp/qualityCheck/qualityCheckUrl';
import request from '../../../../../../util/Request/request';
import {useHistory} from 'ice';

const {FormItem} = Form;

const ApiConfig = {
  view: qualityPlanDetail,
  add: qualityPlanAdd,
  save: qualityPlanEdit
};

const formActionsPublic = createFormActions();


const QualityPlanEdit = (props) => {

  const params = props.searchParams.id;

  const formRef = useRef();

  const history = useHistory();

  const {loading, data} = useRequest(rulesRelationList, {
    defaultParams: {
      data: {
        moduleId: 2
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  const {onFieldValueChange$} = FormEffectHooks;


  return (
    <Card title="质检方案">
      <Form
        ref={formRef}
        value={params || false}
        api={ApiConfig}
        fieldKey="qualityPlanId"
        formActions={formActionsPublic}
        onSuccess={() => {
          history.goBack();
        }}
        onSubmit={(value)=>{
          value = {
            ...value,
            qualityPlanDetailParams:value.qualityPlanDetailParams.map((items,index)=>{
              return {
                ...items,
                sort:index,
              };
            })
          };

          return value;
        }}
        effects={({setFieldState}) => {

          onFieldValueChange$('qualityPlanDetailParams.*.operator').subscribe(async (value) => {
            setFieldState(
              FormPath.transform(value.name, /\d/, ($1) => {
                return `qualityPlanDetailParams.${$1}.standardValue`;
              }),
              state => {
                state.props.typeClass = value.value;
              }
            );

          });

          onFieldValueChange$('qualityPlanDetailParams.*.qualityCheckId').subscribe(async (value) => {

            if (value.value) {
              const result = await request({
                ...qualityCheckDetail,
                data: {
                  qualityCheckId: value.value
                }
              });
              setFieldState(
                value.path,
                state => {
                  state.props.type = result.type;
                }
              );

              setFieldState(
                FormPath.transform(value.name, /\d/, ($1) => {
                  return `qualityPlanDetailParams.${$1}.standardValue`;
                }),
                state => {
                  state.props.type = result.type;
                  state.props.active = value.active;
                }
              );

              setFieldState(
                FormPath.transform(value.name, /\d/, ($1) => {
                  return `qualityPlanDetailParams.${$1}.operator`;
                }),
                state => {
                  switch (result.type) {
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
              name="qualityPlanDetailParams"
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
                      const onMoveUp = async (index) => {
                        mutators.moveUp(index);
                      };
                      const onMoveDown = index => {
                        mutators.moveDown(index);
                      };
                      return (
                        <div key={index}>
                          <>{index}</>
                          <div style={{display: 'inline-block'}}>
                            <FormItem
                              labelCol={7}
                              label="质检项"
                              name={`qualityPlanDetailParams.${index}.qualityCheckId`}
                              component={SysField.QualityCheckId}
                              required
                            />
                          </div>
                          <div style={{display: 'inline-block'}}>
                            <FormItem
                              name={`.qualityPlanDetailParams.${index}.operator`}
                              component={SysField.Operator}
                            />
                          </div>
                          <div style={{display: 'inline-block'}}>
                            <FormItem
                              name={`qualityPlanDetailParams.${index}.standardValue`}
                              component={SysField.StandardValue}
                            />
                          </div>
                          <div style={{display: 'inline-block', width: '10%'}}>
                            <FormItem
                              name={`qualityPlanDetailParams.${index}.isNull`}
                              component={SysField.Yes}
                            />
                          </div>
                          <div style={{display: state.value.length === 1 ? 'none' : 'inline-block', float: 'right'}}>
                            <Button
                              type="link"
                              disabled={index === 0}
                              style={{marginRight: 8}}
                              onClick={() => {
                                onMoveUp(index);
                              }}
                              // icon={<UpOutlined />}
                            >
                              上移
                            </Button>
                            <Button
                              type="link"
                              disabled={index === state.value.length - 1}
                              style={{marginRight: 8}}
                              // icon={<DownOutlined />}
                              onClick={() => {
                                onMoveDown(index);
                              }}
                            >下移</Button>
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
          </ProCard>
        </div>
      </Form>
    </Card>
  );
};

export default QualityPlanEdit;
