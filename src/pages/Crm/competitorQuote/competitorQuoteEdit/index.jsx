/**
 * 竞争对手报价编辑页
 *
 * @author
 * @Date 2021-09-06 16:08:01
 */

import React, {useRef} from 'react';
import {Input} from 'antd';
import Form from '@/components/Form';
import {competitorQuoteDetail, competitorQuoteAdd, competitorQuoteEdit} from '../competitorQuoteUrl';
import * as SysField from '../competitorQuoteField';

const {FormItem} = Form;

const ApiConfig = {
  view: competitorQuoteDetail,
  add: competitorQuoteAdd,
  save: competitorQuoteEdit
};

const CompetitorQuoteEdit = ({...props}) => {

  const {competitorsQuoteId} = props;

  const {val} = props;

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="competitorsQuoteId"
      res={(res)=>{
        if (res){
          competitorsQuoteId(res.data);
        }
      }}
    >
      <FormItem label="竞争对手" name="competitorId" component={SysField.CompetitorId} val={val || null} required/>
      <FormItem label="竞争对手报价" name="competitorsQuote" component={SysField.CompetitorsQuote} required/>
    </Form>
  );
};

export default CompetitorQuoteEdit;
