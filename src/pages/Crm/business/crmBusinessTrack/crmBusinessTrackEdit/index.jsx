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
import Checkbox from 'antd/es/checkbox/Checkbox';
import Form from '@/components/Form';
import * as SysField from '../crmBusinessTrackField';
import {crmBusinessTrackDetail, crmBusinessTrackAdd, crmBusinessTrackEdit} from '../crmBusinessTrackUrl';
import CreateNewCustomer from '@/pages/Crm/customer/components/CreateNewCustomer';
import {Image, Longitude} from '../crmBusinessTrackField';

const {FormItem} = Form;

const ApiConfig = {
  view: crmBusinessTrackDetail,
  add: crmBusinessTrackAdd,
  save: crmBusinessTrackEdit
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

  const [hidden,setHidden] = useState(false);
  const [txHidden,setTxHidden] = useState(false);
  const height = () => {
    if (window.document.body.clientHeight < 1088) {
      return 'calc(100vh - 206px)';
    }
    return 930;
  };

  if (val){
    return (
      <div style={{height: height()}}>
        <Form
          NoButton={false}
          {...props}
          ref={formRef}
          api={ApiConfig}
          fieldKey="trackId"
        >
          <div style={{float: 'left', paddingRight: 10, height: height(), width: '45%', overflow: 'auto'}}>
            <ProCard style={{marginTop: 8}} title="基本信息" headerBordered>
              <FormItem label="商机" name="businessId" component={SysField.BusinessId} val={val}  />
              <FormItem label="跟踪类型" name="type" component={SysField.Type}  />
              <Checkbox
                style={{marginLeft: '20%', marginBottom: 20}}
                checked={txHidden}
                onChange={()=>{
                  setTxHidden(!txHidden);
                }}
              >
                是否设置提醒：
              </Checkbox>
              { txHidden ? <FormItem label="跟踪提醒时间" name="time" component={SysField.Time}  /> : null}
              { txHidden ? <FormItem label="提醒内容" name="tixing" component={SysField.Note}/> : null}
              <Checkbox
                style={{marginLeft: '20%', marginBottom: 20}}
                checked={hidden}
                onChange={()=>{
                  setHidden(!hidden);
                }}
              >
                是否报价：
              </Checkbox>
              { hidden ? <FormItem label="报价金额" name="money" component={SysField.Money} /> : null}
              <FormItem label="经度" name="longitude" component={SysField.Longitude}  />
              <FormItem label="纬度" name="latitude" component={SysField.Latitude}  />
              <FormItem label="图片" name="image" component={SysField.Image}  />
              <FormItem label="备注" name="node" component={SysField.Note}/>
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
                    <div>
                      {state.value.map((item, index) => {
                        const onRemove = index => mutators.remove(index);
                        return (
                          <>
                            <div style={{borderBottom: 'solid #eee 1px', marginBottom: 20}}>
                              <RowStyleLayout key={index}>
                                <FormItem
                                  label="竞争对手"
                                  name={`competitorQuoteParam.${index}.competitorId`}
                                  component={SysField.CompetitorId}
                                  required
                                />
                                <FormItem
                                  label="报价"
                                  name={`competitorQuoteParam.${index}.competitorsQuote`}
                                  component={SysField.CompetitorsQuote}
                                  required
                                />
                                <Button
                                  type="link" style={{float: 'right'}}
                                  onClick={() => {
                                    onRemove(index);
                                  }}>删除报价</Button>
                              </RowStyleLayout>
                            </div>
                          </>
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
