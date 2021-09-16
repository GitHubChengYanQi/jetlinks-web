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
import {Button, Col, Divider, Row} from 'antd';
import {Switch} from '@alifd/next';
import {trackMessageAdd} from '@/pages/Crm/trackMessage/trackMessageUrl';
import Form from '@/components/Form';
import * as SysField from '../crmBusinessTrackField';
import Title from '@/components/Title';


const {FormItem} = Form;

const ApiConfig = {
  add: trackMessageAdd
};


const RowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    margin-right: 16px;
  }

  .ant-form-item {
    display: inline-flex;
    width: 70%;
  }
`;

const CrmBusinessTrackEdit = ({...props}, ref) => {

  const {val} = props;

  const formRef = useRef();
  useImperativeHandle(ref, () => ({
    formRef,
  }));

  const [hidden, setHidden] = useState(false);
  const [txHidden, setTxHidden] = useState(false);
  const height = () => {
    if (window.document.body.clientHeight < 1088) {
      return 'calc(100vh - 206px)';
    }
    return 750;
  };

  if (val) {
    return (
      <div style={{height: height()}}>
        <Form
          {...props}
          NoButton={false}
          ref={formRef}
          api={ApiConfig}
          fieldKey="trackMessageId"
        >
          <Row gutter={24}>
            <Col span={14}>
              <div style={{paddingRight: 10, height: height(), overflow: 'auto'}}>
                <ProCard style={{marginTop: 8}} title={<Title title="基本信息" level={4} />} headerBordered>
                  <FormItem label="项目" name="businessId" component={SysField.BusinessId} val={val} />
                  <FormItem label="跟单内容" name="type" component={SysField.Type} />
                  <FormItem label="跟单信息" name="note" component={SysField.Note} />
                  <FormItem label="图片" name="image" component={SysField.Image} />
                  <Switch
                    size="small"
                    style={{marginLeft: '6%', marginBottom: 20, width: 100}}
                    checkedChildren="关闭提醒"
                    unCheckedChildren="开启提醒"
                    checked={txHidden}
                    onChange={() => {
                      setTxHidden(!txHidden);
                    }}
                  > </Switch>
                  {txHidden ? <FormItem label="跟单提醒时间" name="time" component={SysField.Time} /> : null}
                  {txHidden ? <FormItem label="提醒内容" name="message" component={SysField.Message} /> : null}
                  <Switch
                    size="small"
                    style={{marginLeft: '6%', marginBottom: 20, width: 100}}
                    checkedChildren="暂不报价"
                    unCheckedChildren="马上报价"
                    checked={hidden}
                    onChange={() => {
                      setHidden(!hidden);
                    }}
                  > </Switch>
                  {hidden ? <FormItem label="报价金额" name="money" component={SysField.Money} /> : null}
                </ProCard>
              </div>
            </Col>
            <Col span={10}>
              <div style={{height: height(), overflow: 'auto'}}>

                <ProCard style={{marginTop: 8}} title={<Title title="竞争对手报价" level={4} />} headerBordered>
                  <FieldList
                    name="competitorQuoteParam"
                    initialValue={[
                      {competitorId: '', competitorsQuote: ''},
                    ]}
                  >
                    {({state, mutators}) => {
                      const onAdd = () => mutators.push();
                      return (
                        <div>
                          {state.value.map((item, index) => {
                            const onRemove = index => mutators.remove(index);
                            return (
                              <div key={index}>
                                <RowStyleLayout key={index}>
                                  <FormItem
                                    label="竞争对手"
                                    name={`competitorQuoteParam.${index}.competitorId`}
                                    component={SysField.CompetitorId}

                                  />
                                  <FormItem
                                    label="报价"
                                    name={`competitorQuoteParam.${index}.competitorsQuote`}
                                    component={SysField.CompetitorsQuote}

                                  />
                                  <Button
                                    type="link" style={{float: 'right'}}
                                    onClick={() => {
                                      onRemove(index);
                                    }}>删除报价</Button>
                                </RowStyleLayout>
                                <Divider dashed />
                              </div>
                            );
                          })}
                          <Button type="link" style={{float: 'right'}} onClick={onAdd}>增加对手报价</Button>
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
  } else {
    return null;
  }

};

export default forwardRef(CrmBusinessTrackEdit);
