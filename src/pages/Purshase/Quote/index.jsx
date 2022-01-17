import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, message, notification, Select, Space} from 'antd';
import {DeleteOutlined, PlusOutlined,} from '@ant-design/icons';
import {
  FormEffectHooks, FormPath,
  InternalFieldList as FieldList
} from '@formily/antd';
import Form from '@/components/Form';
import * as SysField from '@/pages/Purshase/purchaseQuotation/purchaseQuotationField';
import {useRequest} from '@/util/Request';
import {purchaseConfigList} from '@/pages/BaseSystem/dictType/components/purchaseConfig/purchaseConfigUrl';
import {purchaseQuotationAdd, purchaseQuotationAddbatch} from '@/pages/Purshase/purchaseQuotation/purchaseQuotationUrl';


const {FormItem} = Form;

const Quote = (props) => {

  const {value: {skuId, skus, source, sourceId}, onSuccess,} = props;

  const ApiConfig = {
    view: purchaseQuotationAdd,
    add: skus ? purchaseQuotationAdd : purchaseQuotationAddbatch,
    save: purchaseQuotationAdd
  };

  const [loading, setLoading] = useState(false);

  const formRef = useRef();

  const [supply, setSupply] = useState();

  const [skuIds, setSkuIds] = useState([]);

  const {data: supplyData, run: getSupply} = useRequest({
    url: 'supply/getSupplyByLevel',
    method: 'GET'
  }, {
    manual: true,
  });

  const [config, setConfig] = useState({});

  const {run: configRun} = useRequest(
    purchaseConfigList,
    {
      manual: true,
      onSuccess: (res) => {

        const supplys = res.filter((value) => {
          return value.type === 'supply';
        });

        const level = res.filter((value) => {
          return value.type === 'level';
        });

        const levelId = level && level.length > 0 && JSON.parse(level[0].value).value;

        if (levelId) {
          getSupply({
            params: {
              levelId,
            }
          });
        } else {
          getSupply({});
        }
        setConfig({
          supply: supplys && supplys.length > 0 && supplys[0].value,
          level: level && level.length > 0 && level[0].value,
        });

      }
    }
  );

  useEffect(() => {
    configRun();
  }, []);


  return <>
    <Card
      title={skus
      &&
      <Select
        placeholder="选择供应商"
        showSearch
        style={{minWidth:200}}
        filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        allowClear
        options={supplyData && supplyData.map((items) => {
          return {
            value: items.customerId,
            label: items.customerName,
            object: items
          };
        }) || []}
        onClear={() => {
          formRef.current.reset();
        }}
        onSelect={(value, option) => {
          formRef.current.reset();
          if (config.supply && config.supply === '是') {
            setSkuIds(skus);
          } else {
            // 取出供应商有的物料
            const array = skus && skus.filter((items) => {
              const arr = option.object
                &&
                option.object.supplyResults
                &&
                option.object.supplyResults.filter((value) => {
                  return value.skuId === items;
                });
              return arr && arr.length > 0;
            });
            setSkuIds(array);
          }
          setSupply(value);
        }}
      />}>

      <Form
        loading={(load) => {
          setLoading(load);
        }}
        value={false}
        ref={formRef}
        api={ApiConfig}
        NoButton={false}
        fieldKey="purchaseAskId"
        onSubmit={(value) => {
          if (skus && !supply) {
            message.warn('请选择供应商！');
            return false;
          }
          if (value.quotationParams.filter((items) => {
            if (skus) {
              return (items && !items.skuId);
            } else {
              return (items && !items.customerId);
            }
          }).length > 0) {
            message.warn(skus ? '供应商为必填项' : '物料为必填项！');
            return false;
          }
          if (skus) {
            return {...value, CustomerId: supply, source, sourceId};
          } else {
            const array = value.quotationParams.map((item)=>{
              return {
                ...item,
                skuId,
                source,
                sourceId,
              };
            });
            return {quotationParams: array};
          }
        }}
        onSuccess={() => {
          notification.success({
            message: '添加报价成功！',
          });
          onSuccess();
        }}
        onError={() => {
        }}
        effects={({setFieldState, getFieldState}) => {
          FormEffectHooks.onFieldValueChange$('quotationParams.*.total').subscribe(async ({name, value}) => {
            const price = getFieldState(FormPath.transform(name, /\d/, ($1) => {
              return `quotationParams.${$1}.price`;
            }));
            const afterTax = getFieldState(FormPath.transform(name, /\d/, ($1) => {
              return `quotationParams.${$1}.afterTax`;
            }));
            const preTax = getFieldState(FormPath.transform(name, /\d/, ($1) => {
              return `quotationParams.${$1}.preTax`;
            }));
            setFieldState(FormPath.transform(name, /\d/, ($1) => {
              return `quotationParams.${$1}.allPrice`;
            }), (state) => {
              state.value = value * (price && price.value || 0);
            });
            setFieldState(FormPath.transform(name, /\d/, ($1) => {
              return `quotationParams.${$1}.allAfterTax`;
            }), (state) => {
              state.value = value * (afterTax && afterTax.value || 0);
            });
            setFieldState(FormPath.transform(name, /\d/, ($1) => {
              return `quotationParams.${$1}.allPreTax`;
            }), (state) => {
              state.value = value * (preTax && preTax.value || 0);
            });
          });

          FormEffectHooks.onFieldValueChange$('quotationParams.*.price').subscribe(async ({name, value}) => {
            const total = getFieldState(FormPath.transform(name, /\d/, ($1) => {
              return `quotationParams.${$1}.total`;
            }));
            setFieldState(FormPath.transform(name, /\d/, ($1) => {
              return `quotationParams.${$1}.allPrice`;
            }), (state) => {
              state.value = value * (total && total.value || 0);
            });
          });

          FormEffectHooks.onFieldValueChange$('quotationParams.*.afterTax').subscribe(async ({name, value}) => {
            const total = getFieldState(FormPath.transform(name, /\d/, ($1) => {
              return `quotationParams.${$1}.total`;
            }));
            setFieldState(FormPath.transform(name, /\d/, ($1) => {
              return `quotationParams.${$1}.allAfterTax`;
            }), (state) => {
              state.value = value * (total && total.value || 0);
            });
          });

          FormEffectHooks.onFieldValueChange$('quotationParams.*.preTax').subscribe(async ({name, value}) => {
            const total = getFieldState(FormPath.transform(name, /\d/, ($1) => {
              return `quotationParams.${$1}.total`;
            }));
            setFieldState(FormPath.transform(name, /\d/, ($1) => {
              return `quotationParams.${$1}.allPreTax`;
            }), (state) => {
              state.value = value * (total && total.value || 0);
            });
          });

        }}
      >
        <Space style={{backgroundColor: '#E6E6E6', padding: 16}}>
          <div style={{width: 50, textAlign: 'center'}} />
          <div style={{width: skus ? 200 : 328, textAlign: 'center'}}>
            {skus ? '物料' : '供应商'}
          </div>
          <div style={{width: 90, textAlign: 'center'}}>
            采购数量
          </div>
          <div style={{width: 90, textAlign: 'center'}}>
            单价
          </div>
          <div style={{width: 90, textAlign: 'center'}}>
            总价
          </div>
          <div style={{width: 120, textAlign: 'center'}}>
            票据类型
          </div>
          <div style={{width: 120, textAlign: 'center'}}>
            税率
          </div>
          <div style={{width: 90, textAlign: 'center'}}>
            含税单价
          </div>
          <div style={{width: 90, textAlign: 'center'}}>
            含税总价
          </div>
          <div style={{width: 90, textAlign: 'center'}}>
            不含税单价
          </div>
          <div style={{width: 90, textAlign: 'center'}}>
            不含税总价
          </div>
          <div style={{width: 90, textAlign: 'center'}}>
            税额
          </div>
          <div style={{width: 120, textAlign: 'center'}}>
            付款方式
          </div>
          <div style={{width: 120, textAlign: 'center'}}>
            交货时间
          </div>
          <div style={{width: 120, textAlign: 'center'}}>
            价格有效期
          </div>
          <div style={{width: 50, textAlign: 'center'}}>
            含运
          </div>
          <div style={{width: 50, textAlign: 'center'}} />
        </Space>
        <FieldList
          name="quotationParams"
          initialValue={[
            {},
          ]}
        >
          {({state, mutators}) => {
            const onAdd = () => {
              mutators.push();
            };
            return (
              <div>
                {state.value.map((item, index) => {
                  const onRemove = index => {
                    mutators.remove(index);
                  };
                  return (
                    <div key={index}>
                      <Space style={{padding: 16}}>

                        <div style={{width: 50, textAlign: 'center'}}>
                          <Button
                            type="link"
                            onClick={() => {
                              if (skus) {
                                if (formRef.current.getFieldValue('quotationParams')[index] && formRef.current.getFieldValue('quotationParams')[index].skuId) {
                                  mutators.insert(index + 1, {...formRef.current.getFieldValue('quotationParams')[index]});
                                } else {
                                  message.warn('请选择物料！');
                                }
                              } else if (formRef.current.getFieldValue('quotationParams')[index] && formRef.current.getFieldValue('quotationParams')[index].customerId) {
                                mutators.insert(index + 1, {...formRef.current.getFieldValue('quotationParams')[index]});
                              } else {
                                message.warn('请选择供应商！');
                              }
                            }}
                            icon={<PlusOutlined />}
                          />
                        </div>

                        {skus ?
                          <FormItem
                            itemStyle={{margin: 0}}
                            placeholder="物料"
                            name={`quotationParams.${index}.skuId`}
                            component={SysField.SkuId}
                            ids={skuIds}
                          />
                          :
                          <FormItem
                            itemStyle={{margin: 0}}
                            placeholder="供应商"
                            width={200}
                            supply={1}
                            name={`quotationParams.${index}.customerId`}
                            component={SysField.SupplyId}
                          />
                        }

                        <FormItem
                          itemStyle={{margin: 0}}
                          placeholder="采购数量"
                          name={`quotationParams.${index}.total`}
                          component={SysField.Total}
                        />

                        <FormItem
                          itemStyle={{margin: 0}}
                          placeholder="单价"
                          name={`quotationParams.${index}.price`}
                          component={SysField.Price}
                        />

                        <FormItem
                          itemStyle={{margin: 0}}
                          placeholder="总价"
                          name={`quotationParams.${index}.allPrice`}
                          component={SysField.AllPrice}
                        />

                        <FormItem
                          itemStyle={{margin: 0}}
                          placeholder="票据类型"
                          name={`quotationParams.${index}.InvoiceType`}
                          component={SysField.InvoiceType}
                        />

                        <FormItem
                          itemStyle={{margin: 0}}
                          placeholder="税率"
                          name={`quotationParams.${index}.taxRateId`}
                          component={SysField.TaxRateId}
                        />

                        <FormItem
                          itemStyle={{margin: 0}}
                          placeholder="含税单价"
                          name={`quotationParams.${index}.afterTax`}
                          component={SysField.AfterTax}
                        />

                        <FormItem
                          itemStyle={{margin: 0}}
                          placeholder="含税总价"
                          name={`quotationParams.${index}.allAfterTax`}
                          component={SysField.AllAfterTax}
                        />

                        <FormItem
                          itemStyle={{margin: 0}}
                          placeholder="不含税单价"
                          name={`quotationParams.${index}.preTax`}
                          component={SysField.PreTax}
                        />

                        <FormItem
                          itemStyle={{margin: 0}}
                          placeholder="不含税总价"
                          name={`quotationParams.${index}.allPreTax`}
                          component={SysField.AllPreTax}
                        />

                        <FormItem
                          itemStyle={{margin: 0}}
                          placeholder="税额"
                          name={`quotationParams.${index}.taxPrice`}
                          component={SysField.TaxPrice}
                        />

                        <FormItem
                          itemStyle={{margin: 0}}
                          placeholder="付款方式"
                          name={`quotationParams.${index}.paymentMethod`}
                          component={SysField.PaymentMethod}
                        />

                        <FormItem
                          itemStyle={{margin: 0}}
                          placeholder="交货时间"
                          name={`quotationParams.${index}.deliveryDate`}
                          component={SysField.DeliveryDate}
                        />

                        <FormItem
                          itemStyle={{margin: 0}}
                          placeholder="价格有效期"
                          name={`quotationParams.${index}.periodOfValidity`}
                          component={SysField.PeriodOfValidity}
                        />
                        <div style={{width: 50, textAlign: 'center'}}>
                          <FormItem
                            itemStyle={{margin: 0}}
                            placeholder="是否含运"
                            name={`quotationParams.${index}.isFreight`}
                            component={SysField.IsFreight}
                          />
                        </div>
                        <div style={{width: 50, textAlign: 'center'}}>
                          <Button
                            type="link"
                            disabled={state.value.length === 1}
                            icon={<DeleteOutlined />}
                            onClick={() => {
                              onRemove(index);
                            }}
                            danger
                          />
                        </div>
                      </Space>
                    </div>
                  );
                })}
                <div style={{width: '100%', textAlign: 'center'}}>
                  <Space>
                    <Button
                      type="dashed"
                      style={{marginTop: 8}}
                      icon={<PlusOutlined />}
                      onClick={() => {
                        if (skus && !supply) {
                          message.warn('请选择供应商！');
                          return null;
                        }
                        onAdd();
                      }}>增加物料</Button>
                    <Button
                      type="primary"
                      loading={loading}
                      style={{marginTop: 8}}
                      onClick={() => {
                        formRef.current.submit();
                      }}>添加报价</Button>
                  </Space>
                </div>
              </div>
            );
          }}
        </FieldList>
      </Form>

    </Card>
  </>;
};

export default Quote;
