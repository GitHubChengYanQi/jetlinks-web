/**
 * 合同模板编辑页
 *
 * @author
 * @Date 2021-07-21 08:22:02
 */

import React, {useImperativeHandle, useRef} from 'react';
import {
  Button,
  Card,
  Col,
  message,
  Row,
} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {createFormActions, FormEffectHooks, FormPath, InternalFieldList as FieldList} from '@formily/antd';
import ProCard from '@ant-design/pro-card';
import Form from '@/components/Form';
import * as SysField from '@/pages/Crm/contract/ContractField';
import {contractAdd, contractDetail, contractEdit} from '@/pages/Crm/contract/ContractUrl';
import {request, useRequest} from '@/util/Request';
import CustomerAll from '@/pages/Crm/contract/components/CustomerAll';
import {businessEdit} from '@/pages/Crm/business/BusinessUrl';
import {templateDetail} from '@/pages/Crm/template/TemplateUrl';


const company = '1416605276529807486';


const {FormItem} = Form;

const ApiConfig = {
  view: contractDetail,
  add: contractAdd,
  save: contractEdit
};


const AddContractEdit = ({businessId, loading, ...props}, ref) => {

  const {value, customerId, ...other} = props;

  const formRef = useRef();

  useImperativeHandle(ref, () => ({
    formRef,
  }));

  const {run: business} = useRequest({
    ...businessEdit,
  }, {manual: true});


  return (
    <div style={{padding: 16}}>
      <Form
        NoButton={false}
        value={value}
        {...other}
        ref={formRef}
        api={ApiConfig}
        fieldKey="contractId"
        onError={() => {
        }}
        onSuccess={async (result) => {
          if (result.data !== '') {
            if (businessId) {
              if (result.data.contractId) {
                await business({
                  data: {
                    businessId,
                    contractId: result.data.contractId
                  }
                });
              } else {
                message.error('创建合同失败！');
              }
            }
          }
          other.onSuccess(result);
        }}
        onSubmit={(value) => {
          return {...value, payment: {details: value.details}};
        }}
        effects={() => {

          const {setFieldState, getFieldState} = createFormActions();

          FormEffectHooks.onFieldValueChange$('partyA').subscribe(async ({value}) => {
            if (value) {
              setFieldState('partyAContactsId', (state) => {
                state.props.customerId = value;
              });
              setFieldState('partyAAdressId', (state) => {
                state.props.customerId = value;
              });
              setFieldState('partyAPhone', (state) => {
                state.props.customerId = value;
              });
            }
          });

          FormEffectHooks.onFieldValueChange$('partyB').subscribe(async ({value}) => {
            if (value) {
              setFieldState('partyBContactsId', (state) => {
                state.props.customerId = value;
              });
              setFieldState('partyBAdressId', (state) => {
                state.props.customerId = value;
              });
              setFieldState('partyBPhone', (state) => {
                state.props.customerId = value;
              });
            }
          });

          FormEffectHooks.onFieldValueChange$('partyAContactsId').subscribe(async ({value}) => {
            if (value) {
              setFieldState('partyAPhone', (state) => {
                state.props.contactsId = value;
              });
            }
          });

          FormEffectHooks.onFieldValueChange$('partyBContactsId').subscribe(async ({value}) => {
            if (value) {
              setFieldState('partyBPhone', (state) => {
                state.props.contactsId = value;
              });
            }
          });


          FormEffectHooks.onFieldValueChange$('templateId').subscribe(async ({value}) => {
            if (value) {
              const data = await request({...templateDetail, data: {templateId: value}});
              setFieldState('contractClassId', (state) => {
                state.value = data.contractClassId;
              });
            }
          });

          // 输入百分比计算金额
          FormEffectHooks.onFieldValueChange$('details.*.percent').subscribe(({active, name, value}) => {
            const allMoney = getFieldState('allMoney');
            if (active) {
              if (allMoney.value) {
                let percents = 0;
                const details = getFieldState('details');
                details.value.map((items) => {
                  return percents += items.percent;
                });
                setFieldState(
                  FormPath.transform(name, /\d/, ($1) => {
                    return `details.${$1}.money`;
                  }),
                  state => {
                    if (percents > 100) {
                      message.warning('不能超过百分之百！');
                      state.value = null;
                    } else
                      state.value = allMoney.value * (value / 100);
                  }
                );
              } else {
                message.warning('请先输入总金额！');
              }
            }
          });

          // 输入金额计算百分比
          FormEffectHooks.onFieldValueChange$('details.*.money').subscribe(({active, name, value}) => {
            const allMoney = getFieldState('allMoney');
            if (active) {
              if (allMoney.value) {
                let moneys = 0;
                const details = getFieldState('details');
                details.value.map((items) => {
                  return moneys += items.money;
                });
                setFieldState(
                  FormPath.transform(name, /\d/, ($1) => {
                    return `details.${$1}.percent`;
                  }),
                  state => {
                    if (moneys > allMoney.value) {
                      message.warning('不能超过总金额！');
                      state.value = null;
                    } else {
                      state.value = (value / allMoney.value) * 100;
                    }
                  }
                );
              } else {
                message.warning('请先输入总金额！');
              }
            }
          });

        }}

      >
        <ProCard headerBordered className="h2Card" title="基础信息">
          <FormItem labelCol={5} label="选择合同模板" name="templateId" component={SysField.Template} required />
          <FormItem labelCol={5} label="合同名称" name="name" component={SysField.Name} required />
          <FormItem labelCol={5} label="合同分类" name="contractClassId" component={SysField.ContractClassId} required />
          <FormItem labelCol={5} label="付款总金额" name="allMoney" component={SysField.AllMoney} required />
        </ProCard>
        <ProCard headerBordered className="h2Card" title="付款信息">
          <FieldList
            name="details"
            initialValue={[
              {},
            ]}
          >
            {({state, mutators}) => {
              const onAdd = () => mutators.push();
              return (
                <div>
                  {state.value.map((item, index) => {
                    const onRemove = index => mutators.remove(index);
                    return (
                      <Card
                        style={{marginTop: 8}}
                        headStyle={{border: 'none', borderBottom: 'solid 1px #eee'}}
                        bodyStyle={{padding: 8}}
                        key={index}>
                        <div style={{width: '5%', display: 'inline-block'}}>{`第${index + 1}批`}</div>
                        <div style={{width: '25%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={7}
                            itemStyle={{margin: 0}}
                            label="名称"
                            name={`details.${index}.name`}
                            component={SysField.MoneyName}
                            required
                          />
                        </div>
                        <div style={{width: '18%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={8}
                            itemStyle={{margin: 0}}
                            label="金额"
                            name={`details.${index}.money`}
                            component={SysField.Money}
                            required
                          />
                        </div>
                        <div style={{width: '23%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={8}
                            itemStyle={{margin: 0}}
                            label="百分比"
                            name={`details.${index}.percent`}
                            component={SysField.Percent}
                            required
                          />
                        </div>
                        <div style={{width: '25%', display: 'inline-block'}}>
                          <FormItem
                            labelCol={7}
                            itemStyle={{margin: 0}}
                            label="付款时间"
                            name={`details.${index}.time`}
                            component={SysField.Time}
                          />
                        </div>
                        <Button
                          type="link"
                          style={{float: 'right'}}
                          disabled={state.value.length === 1}
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            onRemove(index);
                          }}
                          danger
                        />
                      </Card>
                    );
                  })}
                  <Button
                    type="dashed"
                    style={{marginTop: 8}}
                    icon={<PlusOutlined />}
                    onClick={onAdd}>增加付款信息</Button>
                </div>
              );
            }}
          </FieldList>
        </ProCard>

        <Row gutter={24}>
          <Col span={12}>
            <ProCard headerBordered className="h2Card" title="甲方信息">
              <CustomerAll
                customer="partyA"
                contacts="partyAContactsId"
                adress="partyAAdressId"
                phone="partyAPhone"
                customerId={customerId} />
            </ProCard>
          </Col>
          <Col span={12}>
            <ProCard className="h2Card" headerBordered title="乙方信息">
              <CustomerAll
                customer="partyB"
                adress="partyBAdressId"
                contacts="partyBContactsId"
                phone="partyBPhone"
                customerId={company} />
            </ProCard>
          </Col>
        </Row>
      </Form>
    </div>
  );

};

export default React.forwardRef(AddContractEdit);
