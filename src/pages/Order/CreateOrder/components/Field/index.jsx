/**
 * 询价任务字段配置页
 *
 * @author cheng
 * @Date 2022-01-17 09:29:56
 */

import React, {useRef, useState} from 'react';
import {Input, Radio, Spin, Select as AntSelect, Button, Space, message, List, Table, AutoComplete} from 'antd';
import parse from 'html-react-parser';
import Coding from '@/pages/Erp/tool/components/Coding';
import DatePicker from '@/components/DatePicker';
import {useRequest} from '@/util/Request';
import Modal from '@/components/Modal';
import {adressIdSelect} from '@/pages/Crm/adress/AdressUrl';
import SetSelectOrCascader from '@/components/SetSelectOrCascader';
import AdressEdit from '@/pages/Crm/adress/AdressEdit';
import {templateListSelect} from '@/pages/Crm/template/TemplateUrl';
import Editor from '@/components/Editor';
import AddSkuTable from '@/pages/Order/CreateOrder/components/AddSkuTable';
import CheckSku from '@/pages/Order/CreateOrder/components/CheckSku';
import InputNumber from '@/components/InputNumber';
import AddSpu from '@/pages/Order/CreateOrder/components/AddSpu';
import {unitListSelect} from '@/pages/Erp/spu/spuUrl';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';
import UpLoadImg from '@/components/Upload';
import TemplateEdit from '@/pages/Crm/template/TemplateEdit';


export const AddSku = ({value = [], customerId, onChange, module, currency, ...props}) => {

  const addSku = useRef();

  const addSpu = useRef();

  const addSkuRef = useRef();

  const [skuId, setSkuId] = useState();

  const [type, setType] = useState();

  const {loading: skuLoading, run: skuRun} = useRequest(skuDetail, {
    manual: true,
    onSuccess: (res) => {
      onChange([...value, {
        skuId: res.skuId,
        coding: res.standard,
        skuResult: res,
        preordeNumber: 0,
        unitId: res.spuResult && res.spuResult.unitId,
        brandIds: res.brandIds
      }]);
    }
  });

  return (<>
    <AddSkuTable
      addSkuLoading={skuLoading}
      currency={currency}
      module={module}
      value={value}
      onChange={onChange}
      onAddSku={(type) => {
        setType(type);
        switch (type) {
          case 'spu':
            setSkuId(null);
            addSpu.current.open(true);
            break;
          case 'sku':
            addSku.current.open(true);
            break;
          case 'supplySku':
            if (!customerId) {
              message.warn('请选择供应商！');
              return false;
            }
            addSku.current.open(true);
            break;
          default:
            break;
        }
      }}
    />

    <Modal
      headTitle="物料选择"
      ref={addSpu}
      width={800}
      footer={<Space>
        <Button onClick={() => {
          addSpu.current.close();
        }}>取消</Button>
        <Button type="primary" disabled={!skuId} onClick={() => {
          skuRun({
            data: {
              skuId
            }
          });
          addSpu.current.close();
        }}>确定</Button>
      </Space>}
    >
      <AddSpu onChange={setSkuId} value={skuId} />
    </Modal>

    <Modal
      ref={addSku}
      width={1000}
      headTitle="添加物料"
      footer={<Space>
        <Button onClick={() => {
          onChange(addSkuRef.current.check());
        }}>选中</Button>
        <Button type="primary" onClick={() => {
          onChange(addSkuRef.current.change());
          addSku.current.close();
        }}>选中并关闭</Button>
      </Space>}
    >
      <CheckSku
        {...props}
        type={type}
        value={value}
        ref={addSkuRef}
        customerId={customerId}
      />
    </Modal>
  </>);
};

export const Name = (props) => {
  return (<Input  {...props} />);
};

export const Show = ({value}) => {
  return (<>{value || '无'}</>);
};

export const Codings = (props) => {
  return (<Coding  {...props} />);
};

export const Date = (props) => {
  return (<DatePicker {...props} />);
};


export const PayTime = (props) => {
  return (<DatePicker showTime {...props} />);
};


export const Remark = (props) => {
  return (<Input.TextArea rows={4} placeholder="请输入采购单备注" {...props} />);
};

export const Currency = (props) => {
  const {loading, data} = useRequest({
    url: '/Enum/money',
    method: 'GET'
  }, {
    onSuccess: () => {
      props.onChange('人民币');
    }
  });

  if (loading) {
    return <Spin />;
  }
  const options = data ? data.map((item) => {
    return {
      label: item.name,
      value: item.name,
    };
  }) : [];

  return (<AntSelect style={{width: 100}} options={options} {...props} />);
};

export const Money = (props) => {
  return (<InputNumber min={0} precision={2} {...props} />);
};

export const Index = (props) => {
  return (<></>);
};

export const AdressId = (props) => {
  const {customerId, ...other} = props;
  return (customerId ? <SetSelectOrCascader
    placeholder="请选择交货地址"
    width={200}
    customer={customerId}
    api={adressIdSelect}
    data={{customerId}}
    title="添加其他地址"
    component={AdressEdit} {...other} /> : '请选择甲方公司');
};
export const PayPlan = (props) => {

  const {loading, data, ...other} = props;

  const style = {borderTop: 'dashed 1px #d9d9d9'};

  if (loading) {
    props.onChange(null);
    return <Spin />;
  }

  return (<AntSelect
    {...other}
    placeholder="请选择付款计划"
  >
    {
      data && data.map((item, index) => {
        return <AntSelect.Option key={index} value={item.value}>{item.label}</AntSelect.Option>;
      })
    }
    <AntSelect.Option key={99} value={2} style={style}>按时间分期付款</AntSelect.Option>
    <AntSelect.Option key={98} value={3} style={style}>按动作分期付款</AntSelect.Option>
    <AntSelect.Option key={97} value={4} style={style}>其他模板</AntSelect.Option>
  </AntSelect>);
};

export const PayType = (props) => {
  return (<AntSelect
    style={{width: 120}}
    options={[{
      label: '订单创建后',
      value: 0,
    }, {
      label: '合同签订后',
      value: 1,
    }, {
      label: '订单发货前',
      value: 2,
    }, {
      label: '订单发货后',
      value: 3,
    }, {
      label: '入库后',
      value: 4,
    }]}
    {...props}
  />);
};

export const Percentum = (props) => {

  const {value, onChange} = props;
  console.log(value);

  const [number, setNumber] = useState();

  return (<InputNumber
    min={1}
    max={100}
    addonAfter="%"
    value={value}
    onChange={(value) => {
      setNumber(value);
    }}
    onBlur={() => {
      onChange(number);
    }} />);
};

export const TemplateId = (props) => {
  return (
    <SetSelectOrCascader
      height="100%"
      component={TemplateEdit}
      placement="top"
      api={templateListSelect}
      title="添加合同模板"
      width={200} {...props} />);
};

export const Freight = (props) => {
  return (<Radio.Group {...props}><Radio value={1}>是</Radio><Radio value={0}>否</Radio></Radio.Group>);
};
export const PayMethod = (props) => {
  return (<Input placeholder="请输入 现金/承兑/电汇" {...props} />);
};

export const DateWay = (props) => {
  return (<AntSelect
    options={[{
      label: '天',
      value: 0,
    }, {
      label: '月',
      value: 1,
    }, {
      label: '年',
      value: 2,
    }]}
    {...props}
  />);
};

export const dateNumber = (props) => {
  return (<InputNumber min={1} {...props} />);
};

export const DeliveryWay = (props) => {
  return (<Input placeholder="请输入交货方式" {...props} />);
};
export const Note = (props) => {
  return (<Editor {...props} />);
};

export const AllField = ({value: defaultValue = {}, onChange, array, skuList, payList}) => {

  const {data} = useRequest(unitListSelect);

  const unitResult = (id) => {
    const units = data ? data.filter((item) => {
      return item.value === id;
    }) : [];
    return units[0] && units[0].label;
  };

  const input = '\\<input (.*?)\\>';

  const [values, setValues] = useState([]);

  const [skus, setSkus] = useState([]);

  const [pays, setpPays] = useState([]);

  const change = (index, value) => {
    const newString = [];
    for (let i = 0; i < array.strings.length; i++) {
      newString.push(values[i]);
    }
    newString[index] = value;
    onChange({
      ...defaultValue,
      contractReplaces: newString.map((item, index) => {
        return {
          oldText: array.strings[index],
          newText: item || ''
        };
      })
    });
    setValues(newString);
  };


  const newSkuTable = (item, stringItem, oldString, value, oldItem) => {
    if (oldString === oldItem) {
      const replaceString = oldString.match(input)[0];
      return oldString.replace(replaceString, value);
    } else {
      return stringItem;
    }
  };

  const tableChange = (value, oldItem, changeIndex, type) => {
    let newList;
    switch (type) {
      case 'sku':
        newList = skuList.map((item, index) => {
          if (changeIndex === index) {
            return array.inputs.map((stringItem, stringIndex) => {
              return newSkuTable(item, skus[index] && skus[index][stringIndex] || stringItem, stringItem, value, oldItem);
            });
          } else {
            return array.inputs.map((stringItem, stringIndex) => {
              return skus[index] && skus[index][stringIndex] || stringItem;
            });
          }
        });
        onChange({
          ...defaultValue,
          cycleReplaces: newList.map((item) => {
            return {
              cycles: item.map((stringItem, index) => {
                let newText = stringItem;
                if (newText.search(input) !== -1) {
                  const replaceString = newText.match(input)[0];
                  newText = newText.replace(replaceString, '');
                }
                return {
                  oldText: array.inputs[index],
                  newText,
                };
              })
            };
          }),
        });
        setSkus(newList);
        break;
      case 'pay':
        newList = payList.map((item, index) => {
          if (changeIndex === index) {
            return array.pays.map((stringItem, stringIndex) => {
              return newSkuTable(item, pays[index] && pays[index][stringIndex] || stringItem, stringItem, value, oldItem);
            });
          } else {
            return array.pays.map((stringItem, stringIndex) => {
              return pays[index] && pays[index][stringIndex] || stringItem;
            });
          }
        });
        onChange({
          ...defaultValue,
          payReplaces: newList.map((item) => {
            return {
              cycles: item.map((stringItem, index) => {
                let newText = stringItem;
                if (newText.search(input) !== -1) {
                  const replaceString = newText.match(input)[0];
                  newText = newText.replace(replaceString, '');
                }
                return {
                  oldText: array.pays[index],
                  newText,
                };
              })
            };
          }),
        });
        setpPays(newList);
        break;
      default:
        break;
    }
  };

  const replaceDom = (string, index) => {
    return parse(string, {
      replace: domNode => {
        if (domNode.name === 'input') {
          switch (domNode.attribs.type) {
            case 'text':
              return <Space>{domNode.attribs['data-title']}
                <AutoComplete
                  defaultValue={domNode.attribs.value}
                  onChange={(value) => {
                    change(index, value);
                  }}
                  options={domNode.attribs.placeholder && Array.isArray(domNode.attribs.placeholder.split(',')) && domNode.attribs.placeholder.split(',').map((item) => {
                    return {
                      label: item,
                      value: item,
                    };
                  })}
                >
                  <Input
                    placeholder="输入文本"
                    // style={{width: 200, margin: '0 10px'}}
                  />
                </AutoComplete>
              </Space>;
            case 'number':
              return <Space>{domNode.attribs['data-title']}<InputNumber
                placeholder="输入数值"
                style={{width: 200, margin: '0 10px'}}
                onChange={(value) => {
                  change(index, value);
                }}
              /></Space>;
            case 'date':
              return <Space>{domNode.attribs['data-title']}<DatePicker
                showTime
                placeholder="输入时间"
                style={{width: 200, margin: '0 10px'}}
                onChange={(value) => {
                  change(index, value);
                }}
              /></Space>;
            case 'file':
              return <Space>{domNode.attribs['data-title']}
                <UpLoadImg onChange={(value) => {
                  change(index, `<image src=${value} width="100" />`);
                }} />
              </Space>;
            default:
              break;
          }
        } else if (domNode.name === 'textarea') {
          return <Space>{domNode.attribs['data-title']}
            <Editor onChange={(value) => {
              change(index, value);
            }} /></Space>;
        }
      }
    });
  };

  const skuTableReplaceDom = (string, item, index, type) => {
    return parse(string, {
      replace: domNode => {
        if (domNode.name === 'input') {
          switch (domNode.attribs.type) {
            case 'text':
              return <Input
                placeholder="输入文本"
                style={{width: 200, margin: '0 10px'}}
                onChange={(value) => {
                  tableChange(value.target.value, item, index, type);
                }}
              />;
            case 'number':
              return <InputNumber
                placeholder="输入数值"
                style={{width: 200, margin: '0 10px'}}
                onChange={(value) => {
                  tableChange(value, item, index, type);
                }}
              />;
            case 'date':
              return <DatePicker
                showTime
                placeholder="输入时间"
                style={{width: 200, margin: '0 10px'}}
                onChange={(value) => {
                  tableChange(value, item, index, type);
                }}
              />;
            default:
              break;
          }
        }
      }
    });
  };

  if (!array) {
    return <></>;
  }

  const skuTableTitle = (item) => {
    // eslint-disable-next-line no-template-curly-in-string
    if (item.indexOf('${{coding}}') !== -1) {
      return {
        title: '物料编码',
        dataIndex: 'coding',
        render: (value, record) => {
          return value || (record.skuResult && record.skuResult.standard);
        }
      };
      // eslint-disable-next-line no-template-curly-in-string
    } else if (item.indexOf('${{spuName}}') !== -1) {
      return {
        title: '物料名称',
        dataIndex: 'skuResult',
        render: (value) => {
          return value && value.spuResult.name;
        }
      };
      // eslint-disable-next-line no-template-curly-in-string
    } else if (item.indexOf('${{skuName}}') !== -1) {
      return {
        title: '规格 / 型号',
        dataIndex: 'skuResult',
        render: (value) => {
          return `${value.skuName} / ${value.specifications || '无'}`;
        }
      };
      // eslint-disable-next-line no-template-curly-in-string
    } else if (item.indexOf('${{skuClass}}') !== -1) {
      return {
        title: '分类',
        dataIndex: 'skuResult',
        render: (value) => {
          return value.spuResult && value.spuResult.spuClassificationResult && value.spuResult.spuClassificationResult.name;
        }
      };
      // eslint-disable-next-line no-template-curly-in-string
    } else if (item.indexOf('${{brand}}') !== -1) {
      return {
        title: '品牌',
        dataIndex: 'brand',
        render: (value, record) => {
          return record.brandResult || record.defaultBrandResult;
        }
      };
      // eslint-disable-next-line no-template-curly-in-string
    } else if (item.indexOf('${{unit}}') !== -1) {
      return {
        title: '单位',
        dataIndex: 'unitId',
        render: (value) => {
          return unitResult(value);
        }
      };
      // eslint-disable-next-line no-template-curly-in-string
    } else if (item.indexOf('${{totalPrice}}') !== -1) {
      return {
        title: '总价',
        dataIndex: 'totalPrice',
      };
      // eslint-disable-next-line no-template-curly-in-string
    } else if (item.indexOf('${{skuNumber}}') !== -1) {
      return {
        title: '数量',
        dataIndex: 'purchaseNumber'
      };
      // eslint-disable-next-line no-template-curly-in-string
    } else if (item.indexOf('${{price}}') !== -1) {
      return {
        title: '单价',
        dataIndex: 'onePrice'
      };
      // eslint-disable-next-line no-template-curly-in-string
    } else if (item.indexOf('${{deliveryDate}}') !== -1) {
      return {
        title: '交货日期',
        dataIndex: 'deliveryDate'
      };
    } else if (item.indexOf('<input') !== -1 && item.indexOf('data-title') !== -1) {
      let title = '';
      parse(item, {
        replace: domNode => {
          if (domNode.name === 'input') {
            title = domNode.attribs['data-title'];
          }
        }
      });

      return {
        title,
        render: (value, record, index) => {
          return skuTableReplaceDom(item.match(input)[0], item, index, 'sku');
        }
      };
    } else {
      return {};
    }

  };

  const payTableTitle = (item) => {
    // eslint-disable-next-line no-template-curly-in-string
    if (item.indexOf('${{detailMoney}}') !== -1) {
      return {
        title: '付款金额',
        dataIndex: 'money',
      };
      // eslint-disable-next-line no-template-curly-in-string
    } else if (item.indexOf('${{detailDateWay}}') !== -1) {
      return {
        title: '日期方式',
        dataIndex: 'payType',
        render: (value) => {
          switch (value) {
            case 0:
              return '天';
            case 1:
              return '月';
            case 2:
              return '年';
            default:
              return '';
          }
        }
      };
      // eslint-disable-next-line no-template-curly-in-string
    } else if (item.indexOf('${{percentum}}') !== -1) {
      return {
        title: '付款比例',
        dataIndex: 'percentum',
        render: (value) => {
          return `${value || ''} %`;
        }
      };
      // eslint-disable-next-line no-template-curly-in-string
    } else if (item.indexOf('${{DetailPayDate}}') !== -1) {
      return {
        title: '付款日期',
        dataIndex: 'payTime',
      };
      // eslint-disable-next-line no-template-curly-in-string
    } else if (item.indexOf('${{DetailPayRemark}}') !== -1) {
      return {
        title: '款项说明',
        dataIndex: 'remark',
      };
    } else if (item.indexOf('<input') !== -1 && item.indexOf('data-title') !== -1) {
      let title = '';
      parse(item, {
        replace: domNode => {
          if (domNode.name === 'input') {
            title = domNode.attribs['data-title'];
          }
        }
      });

      return {
        title,
        render: (value, record, index) => {
          return skuTableReplaceDom(item.match(input)[0], item, index, 'pay');
        }
      };
    } else {
      return {};
    }

  };

  const skuColumns = array.inputs ?
    array.inputs.map((item) => {
      return {
        ...skuTableTitle(item),
        width: 200
      };
    })
    : [];

  const payColumns = array.pays ?
    array.pays.map((item) => {
      return {
        ...payTableTitle(item),
        width: 200
      };
    })
    : [];


  return (<div>
    <List
      size="large"
      bordered
      dataSource={array.strings || []}
      renderItem={(item, index) => <List.Item key={index}>{replaceDom(item, index)}</List.Item>}
    />
    {
      array.inputs && array.inputs.length > 0 &&
      <div style={{marginTop: 16}}>
        <Table
          columns={skuColumns}
          pagination={false}
          rowKey="key"
          dataSource={skuList && skuList.map((item, index) => {
            return {...item, key: index};
          }) || []} />
      </div>
    }

    {
      array.pays && array.pays.length > 0 &&
      <div style={{marginTop: 16}}>
        <Table
          columns={payColumns}
          pagination={false}
          rowKey="key"
          dataSource={payList && payList.map((item, index) => {
            return {...item, key: index};
          }) || []} />
      </div>
    }
  </div>);
};





