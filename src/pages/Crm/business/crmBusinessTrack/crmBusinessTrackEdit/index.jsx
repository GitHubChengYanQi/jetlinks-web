/**
 * 项目跟踪表编辑页
 *
 * @author
 * @Date 2021-08-05 10:31:44
 */

import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import styled from 'styled-components';
import ProCard from '@ant-design/pro-card';
import {InternalFieldList as FieldList} from '@formily/antd';
import {Button, Card, Col, Divider, Row, Switch} from 'antd';
import {trackMessageAdd} from '@/pages/Crm/trackMessage/trackMessageUrl';
import Form from '@/components/Form';
import Title from '@/components/Title';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import * as SysField from '../crmBusinessTrackField';
import style from './index.module.scss';


const {FormItem} = Form;

const ApiConfig = {
  add: trackMessageAdd
};

const RowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    //margin-right: 16px;
  }

  .ant-form-item {
    display: inline-flex;
    width: 100%;
  }
`;

const CrmBusinessTrackEdit = ({...props}, ref) => {

  const {val, number, id, track = 1} = props;
  const formRef = useRef();
  useImperativeHandle(ref, () => ({
    formRef,
  }));

  const [hidden, setHidden] = useState(false);
  const [txHidden, setTxHidden] = useState(false);
  const [classNmb, setClassNmb] = useState(number);

  const height = () => {
    if (window.document.body.clientHeight < 910) {
      return 'calc(100vh - 300px)';
    }
    return 810;
  };

  const Label = ['商机', '合同', '订单', '回款'];

  const returnFormItem = (index) => {
    // let businessId = null;
    // let contractId = null;
    // let orderId = null;
    // let backMoney = null;
    // businessId = val.businessId;

    if (!classNmb) {
      return null;
    }

    return (<FormItem
      label={Label[classNmb - 1]}
      required
      classNmb={classNmb}
      name={`businessTrackParams.${index}.classifyId`}
      component={SysField.BusinessId}
      val={id || null} />);
    // if (classNmb === 2) {
    //   contractId = val.contractId;
    //   return (<FormItem
    //     label="合同"
    //     required
    //     name={`businessTrackParams.${index}.classifyId`}
    //     component={SysField.ContractId}
    //     val={(data && data.contractId) || '111'} />);
    // }
    // if (classNmb === 3) {
    //   orderId = val.orderId;
    //   return (<FormItem
    //     label="订单"
    //     required
    //     name={`businessTrackParams.${index}.classifyId`}
    //     component={SysField.OrderId}
    //     value={data && data.businessId || null} />);
    // }
    // if (classNmb === 4) {
    //   backMoney = val.backMoney;
    //   return (<FormItem
    //     label="回款"
    //     required
    //     name={`businessTrackParams.${index}.classifyId`}
    //     component={SysField.BackMoney}
    //     value={data && data.businessId || null} />);
    // }
  };

  return (
    <div className={style.from} style={{height: height(), padding: '0 20px'}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="trackMessageId"
        NoButton={false}
        wrapperCol={24}
      >
        <Row gutter={24} style={{height: '100%'}}>
          <Col span={13} style={{height: '100%'}}>
            <div style={{paddingRight: 10, height: '100%', overflow: 'auto', display: 'inline-block'}}>
              <ProCard
                className="h2Card"
                bodyStyle={{padding: 16}}
                style={{marginTop: 8}}
                title={<Title title="基本信息" level={4} />} headerBordered>
                <FormItem
                  label="客户"
                  name="customerId"
                  component={SysField.CustomerId}
                  track={track}
                  value={val}
                  required />
              </ProCard>
              <ProCard
                className="h2Card"
                style={{marginTop: 2, height: '100%'}}
                bodyStyle={{padding: 16}}
                title={<Title title="事项" level={4} />} headerBordered>
                <FieldList
                  name="businessTrackParams"
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
                            <ProCard
                              style={{width: 'auto'}}
                              headStyle={{borderLeft: 'none', padding: '8px 16px'}}
                              title={<Title title={`事项明细 ${index + 1}`} level={6} />} headerBordered
                              extra={<Button
                                type="link" style={{float: 'right', display: state.value.length === 1 && 'none'}}
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                  onRemove(index);
                                }}
                                danger />} key={index}>
                              <RowStyleLayout key={index}>
                                <FormItem
                                  label="分类"
                                  name={`businessTrackParams.${index}.classify`}
                                  component={SysField.Classify}
                                  value={number}
                                  required
                                  onChange={(value) => {
                                    setClassNmb(value);
                                  }} />
                                {returnFormItem(index)}
                                <FormItem
                                  label="跟踪类型"
                                  required
                                  name={`businessTrackParams.${index}.type`}
                                  component={SysField.Type} />
                                <FormItem
                                  label="跟踪内容"
                                  required
                                  name={`businessTrackParams.${index}.note`}
                                  component={SysField.Note} />
                                <FormItem
                                  label="图片"
                                  name={`businessTrackParams.${index}.image`}
                                  component={SysField.Image} />
                                <Switch
                                  style={{marginLeft: '18%', marginBottom: 20, width: 100}}
                                  checkedChildren="关闭提醒"
                                  unCheckedChildren="开启提醒"
                                  checked={txHidden}
                                  onChange={() => {
                                    setTxHidden(!txHidden);
                                  }}
                                > </Switch>
                                {txHidden ? <FormItem
                                  label="跟进提醒时间"
                                  required
                                  name={`businessTrackParams.${index}.time`}
                                  component={SysField.Time} /> : null}
                                {txHidden ? <FormItem
                                  label="提醒内容"
                                  required
                                  name={`businessTrackParams.${index}.message`}
                                  component={SysField.Message} /> : null}
                                <Switch
                                  style={{marginLeft: '18%', marginBottom: 20, width: 100}}
                                  checkedChildren="暂不报价"
                                  unCheckedChildren="马上报价"
                                  checked={hidden}
                                  onChange={() => {
                                    setHidden(!hidden);
                                  }}
                                > </Switch>
                                {hidden ? <FormItem
                                  label="报价金额"
                                  required
                                  name={`businessTrackParams.${index}.money`}
                                  component={SysField.Money} /> : null}
                              </RowStyleLayout>
                              <Divider dashed />
                            </ProCard>
                          );
                        })}
                        <Button
                          type="dashed"
                          icon={<PlusOutlined />}
                          style={{width: '100%'}}
                          onClick={onAdd}>增加明细</Button>
                      </div>
                    );
                  }}
                </FieldList>
              </ProCard>
            </div>
          </Col>
          <Col span={11} style={{height: '100%'}}>
            <div style={{height: '100%', overflow: 'auto'}}>
              <ProCard className="h2Card" bodyStyle={{padding: 16}} style={{marginTop: 8, height: '100%'}}
                       title={<Title title="竞争对手报价" level={4} />} headerBordered>
                <FieldList
                  name="competitorQuoteParam"
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
                            <ProCard bodyStyle={{padding: 16}} headStyle={{borderLeft: 'none', padding: '8px 16px'}}
                                     title={<Title title={`竞争对手明细 ${index + 1}`} level={6} />} headerBordered
                                     extra={<Button
                                       type="link" style={{float: 'right', display: state.value.length === 1 && 'none'}}
                                       icon={<DeleteOutlined />}
                                       onClick={() => {
                                         onRemove(index);
                                       }}
                                       danger />} key={index}>
                              <RowStyleLayout key={index}>
                                <FormItem
                                  label="竞争对手"
                                  name={`competitorQuoteParam.${index}.competitorId`}
                                  component={SysField.CompetitorId}
                                  businessId={val.businessId}
                                />
                                <FormItem
                                  label="报价"
                                  name={`competitorQuoteParam.${index}.competitorsQuote`}
                                  component={SysField.CompetitorsQuote}

                                />
                              </RowStyleLayout>
                              <Divider dashed />
                            </ProCard>
                          );
                        })}
                        <Button
                          type="dashed"
                          style={{width: '100%'}}
                          icon={<PlusOutlined />}
                          onClick={onAdd}>增加报价</Button>
                      </div>
                    );
                  }}
                </FieldList>
              </ProCard>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );

};

export default forwardRef(CrmBusinessTrackEdit);
