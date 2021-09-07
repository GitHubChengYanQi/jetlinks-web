/**
 * 商机跟踪表编辑页
 *
 * @author
 * @Date 2021-08-05 10:31:44
 */

import React, {useRef, useState} from 'react';
import {Button, Card, Col, Row, Input} from 'antd';
import Form from '@/components/Form';
import {crmBusinessTrackDetail, crmBusinessTrackAdd, crmBusinessTrackEdit} from '../crmBusinessTrackUrl';
import * as SysField from '../crmBusinessTrackField';
import CompetitorQuoteEdit from '@/pages/Crm/competitorQuote/competitorQuoteEdit';
import Drawer from '@/components/Drawer';
import styled from 'styled-components';
import CompetitorQuoteList from '@/pages/Crm/competitorQuote/competitorQuoteList';

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

const CrmBusinessTrackEdit = ({...props}) => {

  const {val} = props;
  const ref = useRef(null);

  const formRef = useRef();

  const [hidden,setHidden] = useState(false);

  const [competitorsQuoteId,setCompetitorsQuoteId] = useState();

  if (val){
    return (
      <Row >
        <Col span={16}>
          <Card title="添加跟踪" bordered={false}  >
          {/*  extra={<Button type='link' onClick={()=>{*/}
          {/*  ref.current.open(competitorsQuoteId ? competitorsQuoteId.competitorsQuoteId : false);*/}
          {/*}}>竞争对手报价</Button>}*/}
            <Form
              {...props}
              ref={formRef}
              api={ApiConfig}
              fieldKey="trackId"
            >
              <FormItem label="商机" name="businessId" component={SysField.BusinessId} val={val}  />
              <FormItem label="跟踪类型" name="type" component={SysField.Type}  />
              <FormItem label="下次跟踪提醒时间" name="time" component={SysField.Time}  />
              <FormItem label="是否报价" name="offer" component={SysField.Offer} visi={(visi)=>{
                setHidden(visi);
              }} />
              { hidden ? <FormItem label="报价金额" name="money" component={SysField.Money} val={val}  /> : null}
              <FormItem display={false} name="competitorsQuoteId" component={SysField.CompetitorsQuoteId} competitorsQuoteId={competitorsQuoteId && competitorsQuoteId.competitorsQuoteId || null} />
              <FormItem label="备注" name="note" component={SysField.Note}/>

            </Form>
            {/*<Drawer title='竞争对手报价' onSuccess={()=>{ref.current.close();}} component={CompetitorQuoteEdit} ref={ref} val={val} competitorsQuoteId={(res)=>{setCompetitorsQuoteId(res);}}  />*/}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="竞争对手报价" bordered={false}>
            <CompetitorQuoteList value={competitorsQuoteId ? competitorsQuoteId.competitorsQuoteId : false} />
          </Card>
        </Col>
      </Row>


    );
  }


};

export default CrmBusinessTrackEdit;
