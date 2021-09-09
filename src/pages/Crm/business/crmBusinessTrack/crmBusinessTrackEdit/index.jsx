/**
 * 商机跟踪表编辑页
 *
 * @author
 * @Date 2021-08-05 10:31:44
 */

import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import styled from 'styled-components';
import ProCard from '@ant-design/pro-card';
import {InternalFieldList as FieldList} from '@formily/antd';
import {Button} from 'antd';
import {Switch} from '@alifd/next';
import * as SysField from '../crmBusinessTrackField';
import {trackMessageAdd} from '@/pages/Crm/trackMessage/trackMessageUrl';
import Form from '@/components/Form';


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

  const formsRef = useRef();
  useImperativeHandle(ref, () => ({
    formsRef,
  }));

  const [hidden,setHidden] = useState(false);
  const [txHidden,setTxHidden] = useState(false);
  const height = () => {
    if (window.document.body.clientHeight < 1088) {
      return 'calc(100vh - 206px)';
    }
    return 750;
  };

  if (val){
    return (
      <div style={{height: height()}}>
        <Form
          {...props}
          NoButton={false}
          ref={formsRef}
          api={ApiConfig}
          fieldKey="trackMessageId"
        >
          <div style={{float: 'left', paddingRight: 10, height: height(), width: '45%', overflow: 'auto'}}>
            <ProCard style={{marginTop: 8}} title="基本信息" headerBordered>
              <FormItem label="商机" name="businessId" component={SysField.BusinessId} val={val}  />
              <FormItem label="跟踪内容" name="type" component={SysField.Type}  />
              <FormItem label="跟踪信息" name="note" component={SysField.Note}/>
              <FormItem label="图片" name="image" component={SysField.Image}  />
              <Switch
                size='small'
                style={{marginLeft: '6%', marginBottom: 20, width: 100}}
                checkedChildren="关闭提醒"
                unCheckedChildren="开启提醒"
                checked={txHidden}
                onChange={()=>{
                  setTxHidden(!txHidden);
                }}
              > </Switch>
              { txHidden ? <FormItem label="跟踪提醒时间" name="time" component={SysField.Time}  /> : null}
              { txHidden ? <FormItem label="提醒内容" name="message" component={SysField.Message}/> : null}
              <Switch
                size='small'
                style={{marginLeft: '6%', marginBottom: 20, width: 100}}
                checkedChildren="暂不报价"
                unCheckedChildren="马上报价"
                checked={hidden}
                onChange={()=>{
                  setHidden(!hidden);
                }}
              > </Switch>
              { hidden ? <FormItem label="报价金额" name="money" component={SysField.Money} /> : null}
            </ProCard>
          </div>
          <div style={{float: 'left', width: '55%', height: height(), overflow: 'auto'}}>

            <ProCard style={{marginTop: 8}} title="竞争对手报价" headerBordered>
              <FieldList
                name="competitorQuoteParam"
                initialValue={[
                  {competitorId: '', competitorsQuote: ''},
                ]}
              >
                {({state, mutators}) => {
                  const onAdd = () => mutators.push();
                  return (
                    <div >
                      {state.value.map((item, index) => {
                        const onRemove = index => mutators.remove(index);
                        return (
                          <div key={index} style={{borderBottom: 'solid #eee 1px', marginBottom: 20}}>
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
        </Form>
      </div>
    );
  }else {
    return null;
  }

};

export default forwardRef(CrmBusinessTrackEdit);
