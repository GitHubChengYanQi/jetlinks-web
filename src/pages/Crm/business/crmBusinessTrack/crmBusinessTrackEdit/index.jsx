/**
 * 商机跟踪表编辑页
 *
 * @author
 * @Date 2021-08-05 10:31:44
 */

import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Button, Card, Col, Row, Input} from 'antd';
import Form from '@/components/Form';
import {crmBusinessTrackDetail, crmBusinessTrackAdd, crmBusinessTrackEdit} from '../crmBusinessTrackUrl';
import * as SysField from '../crmBusinessTrackField';
import styled from 'styled-components';
import CompetitorQuoteTable from '@/pages/Crm/business/crmBusinessTrack/components/CompetitorQuoteTable';
import ProCard from '@ant-design/pro-card';
import {InternalFieldList as FieldList} from '@formily/antd';
import {CompetitorsQuote} from '../crmBusinessTrackField';
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
    margin-right: 16px;
    //width: 42%;
  }
`;

const CrmBusinessTrackEdit = ({...props}, ref) => {

  const {val} = props;

  const formRef = useRef();

  useImperativeHandle(ref, () => ({
    formRef,
  }));

  const [hidden,setHidden] = useState(false);

  const [competitorsQuoteId,setCompetitorsQuoteId] = useState();

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
          <div style={{float: 'left', paddingRight: 20, height: height(), width: '50%', overflow: 'auto'}}>
            <ProCard style={{marginTop: 8}} title="基本信息" headerBordered>
              <FormItem label="商机" name="businessId" component={SysField.BusinessId} val={val}  />
              <FormItem label="跟踪类型" name="type" component={SysField.Type}  />
              <FormItem label="下次跟踪提醒时间" name="time" component={SysField.Time}  />
              <FormItem label="是否报价" name="offer" component={SysField.Offer} visi={(visi)=>{
                setHidden(visi);
              }} />
              { hidden ? <FormItem label="报价金额" name="money" component={SysField.Money} val={val}  /> : null}
              <FormItem display={false} name="competitorsQuoteId" component={SysField.CompetitorsQuoteId} competitorsQuoteId={competitorsQuoteId && competitorsQuoteId.competitorsQuoteId || null} />
              <FormItem label="备注" name="note" component={SysField.Note}/>
            </ProCard>
          </div>
          <div style={{float: 'left', width: '50%', height: height(), overflow: 'auto'}}>

            <ProCard style={{marginTop: 8}} title="竞争对手报价" headerBordered>
              <FieldList
                name="adressParams"
                initialValue={[
                  {location: ''},
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
                                  name={`adressParams.${index}.longitude`}
                                  component={SysField.CompetitorId}
                                  required
                                />
                                <FormItem
                                  label="报价"
                                  name={`adressParams.${index}.latitude`}
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
