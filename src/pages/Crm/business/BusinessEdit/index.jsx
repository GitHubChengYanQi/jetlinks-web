/**
 * 商机表编辑页
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

import React, {useRef, useState, useEffect} from 'react';
import {Button, Input, Steps, Row, Col, Table as AntTable, Modal} from 'antd';
import Form from '@/components/Form';
import FormIndex from '@/components/Form/FormIndex';
import {
  businessDetail,
  businessAdd,
  businessEdit,
} from '../BusinessUrl';
import * as SysField from '../BusinessField';
import Drawer from '@/components/Drawer';
import Index from '@/pages/Crm/customer/CustomerEdit/components/ContactsEdit';
import TableDetail from '@/pages/Crm/business/BusinessEdit/components/TableDetail';
import BusinessComplete from '@/pages/Crm/business/BusinessAdd/components/businessComplete';
import {useRequest} from '@/util/Request';
import Description from '@/pages/Crm/business/BusinessDetails/compontents/Description';

const {FormItem} = Form;

const ApiConfig = {
  view: businessDetail,
  add: businessAdd,
  save: businessEdit
};

const BusinessEdit = ({...props}) => {


  const {Step} = Steps;
  const [result, setResult] = useState(props.value);
  const [current, setCurrent] = React.useState(0);
  const [data, setData] = useState();
  const [visi, setVisi] = useState();
  const tableRef = useRef(null);
  const ref = useRef(null);
  const formRef = useRef();

  const {run} = useRequest(businessDetail, {
    manual: true
  });


  const steps = [
    {
      title: '添加商机信息',
      content:
        <>
          <div style={{margin: '50px 150px'}}>
            <FormIndex
              {...props}
              value={result}
              ref={formRef}
              api={ApiConfig}
              fieldKey="businessId"
              success={(result) => {
                if (!props.value) {
                  setResult(result.data);
                }
                next();
              }}
            >
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem
                    label="商机名称"
                    name="businessName"
                    rules={[{required: true, message: '请输入商机名称!'}]}
                    component={SysField.BusinessNameListSelect}
                    required />
                </Col>
                <Col span={12}>
                  <FormItem
                    label="负责人"
                    name="person"
                    rules={[{required: true, message: '请输入负责人!'}]}
                    component={SysField.PersonListSelect}
                    required />
                </Col>
              </Row>
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem
                    label="客户名称"
                    name="customerId"
                    component={SysField.CustomerNameListSelect}
                    rules={[{required: true, message: '请输入已存在的客户!'}]}
                  />
                </Col>
                <Col span={12}>
                  <FormItem label="机会来源" name="originId" component={SysField.OrgNameListSelect} />
                </Col>
              </Row>
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem
                    label="销售流程" name="salesId"
                    rules={[{required: true, message: '请输入销售流程!'}]}
                    component={SysField.SalesIdListSelect} required />
                </Col>
                <Col span={12}>
                  <FormItem label="阶段变更时间" name="changeTime" component={SysField.ChangeTimeListSelect17} />
                </Col>
              </Row>
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem
                    label="商机阶段" name="stage"
                    rules={[{required: true, message: '请输入商机阶段!'}]}
                    component={SysField.StageListSelect13} required />
                </Col>
                <Col span={12}>
                  <FormItem label="商机金额" name="opportunityAmount" component={SysField.OpportunityAmountListSelect3} />
                </Col>
              </Row>
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem label="立项日期" name="time" component={SysField.TimeListSelect2} />
                </Col>
                <Col span={12}>
                  <FormItem label="结单日期" name="statementTime" component={SysField.StatementTimeListSelect14} />
                </Col>
              </Row>
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem label="产品合计" name="totalProducts" component={SysField.TotalProductsListSelect4} />
                </Col>
              </Row>
              <div style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit">
                  下一步
                </Button>
              </div>
            </FormIndex>
          </div>

        </>
    },
    {
      title: '添加商机明细',
      content:
        <>
          <div style={{margin: '5px 150px'}}>
            <TableDetail value={result} onSuccess={() => {
              tableRef.current.refresh();
            }} />
            <Drawer width={800} title="编辑" component={Index} onSuccess={() => {
              tableRef.current.refresh();
              ref.current.close();
            }} ref={ref} />
            <div style={{textAlign: 'center'}}>
              <Button style={{marginRight: 20}} type="primary" onClick={() => {
                next();
              }
              }>
                下一步
              </Button>
              <Button onClick={() => prev()}>
                返回
              </Button>
            </div>
          </div>
        </>
    }, {
      title: '完成',
      content:
        <>
          <BusinessComplete add={() => {
            setCurrent(0);
            setResult(false);
          }} detail={async () => {
            if (result) {
              const data = await run(
                {
                  data: {
                    businessId: result
                  }
                }
              );
              setData(data);
              setVisi(true);
            } else {
              console.log(result);
            }

          }} />
        </>
    }
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div style={{maxHeight: 510, height: 'calc(100vh - 200px)'}}>
      <div style={{overflow: 'auto', height: 'calc(100vh - 200px)'}}>
        <Steps current={current} style={{padding: '30px 150px '}}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <Modal visible={visi} width={800} onCancel={() => {
          setVisi(false);
        }} onOk={() => {
          setVisi(false);
        }}>
          <Description data={data || null} />
        </Modal>
      </div>
    </div>
  );
};

export default BusinessEdit;
