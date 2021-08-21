/**
 * 报修编辑页
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

import React, {useRef, useState} from 'react';
import {Button, Col, Input, Row, Steps} from 'antd';
import Form from '@/components/Form';
import {repairDetail, repairAdd, repairEdit} from '../repairUrl';
import * as SysField from '../repairField';
import FormIndex from '@/components/Form/FormIndex';
import TableDetail from '@/pages/Crm/business/BusinessEdit/components/TableDetail';
import Drawer from '@/components/Drawer';
import Index from '@/pages/Crm/customer/CustomerEdit/components/ContactsEdit';
import CompanyAddressEdit from '@/pages/Portal/companyAddress/companyAddressEdit';

const {FormItem} = Form;

const ApiConfig = {
  view: repairDetail,
  add: repairAdd,
  save: repairEdit
};

const RepairEdit = ({...props}) => {

  const {Step} = Steps;
  const [result, setResult] = useState(props.value);
  const [current, setCurrent] = React.useState(0);
  const tableRef = useRef(null);
  const ref = useRef(null);
  const formRef = useRef();

  const steps = [
    {
      title: '添加报修信息',
      content:
        <>
          <div style={{margin: '50px 150px'}}>
            <FormIndex
              {...props}
              value={result}
              ref={formRef}
              api={ApiConfig}
              fieldKey="repairId"
              success={(result) => {
                if(!props.value){
                  setResult(result.data);
                }
                next();
              }}
            >
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem label="保修部位图片" name="itemImgUrl" component={SysField.ItemImgUrl} required/>
                </Col>
                <Col span={12}>
                  <FormItem label="描述" name="comment" component={SysField.Comment} required/>
                </Col>
              </Row>
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem label="设备id" name="itemId" component={SysField.ItemId} required/>
                </Col>
                <Col span={12}>
                  <FormItem label="服务类型" name="serviceType" component={SysField.ServiceType} required/>
                </Col>
              </Row>
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                <FormItem label="期望到达日期" name="expectTime" component={SysField.ExpectTime} required/>
              </Col>
                <Col span={12}>
                  <FormItem label="维修费用" name="money" component={SysField.Money} required/>
                </Col>
              </Row>
              <Row gutter={24} style={{padding: '0 30px'}}>
                <Col span={12}>
                  <FormItem label="质保类型" name="qualityType" component={SysField.QualityType} required/>
                </Col>
                <Col span={12}>
                  <FormItem label="合同类型" name="contractType" component={SysField.ContractType} required/>
                </Col>
              </Row>
              <div style={{textAlign:'center'}}>
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
            <CompanyAddressEdit result={result} onSuccess={() => {
              tableRef.current.refresh();
            }} />
            <Drawer width={800} title="编辑" component={Index} onSuccess={() => {
              tableRef.current.refresh();
              ref.current.close();
            }} ref={ref} />
            <div style={{textAlign:'center'}}>
              <Button style={{marginRight:20}} type="primary" onClick={()=>{
                props.onSuccess();
              }
              }>
                保存
              </Button>
              <Button onClick={()=> prev()}>
                返回
              </Button>
            </div>
          </div>
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
    <>
      <Steps current={current} style={{padding: '30px 150px '}}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
    </>
  );
};

export default RepairEdit;
