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
import {createFormActions, FormEffectHooks} from '@formily/antd';

const {FormItem} = Form;

const ApiConfig = {
  view: competitorQuoteDetail,
  add: competitorQuoteAdd,
  save: competitorQuoteEdit
};
const {onFieldValueChange$} = FormEffectHooks;
const CompetitorQuoteEdit = ({...props}) => {


  const {businessId,competitorId} = props;

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="quoteId"
      effects={() => {
        const {setFieldState} = createFormActions();
        onFieldValueChange$('campType').subscribe(({value}) => {
          setFieldState('quoteStatus', state => {
            state.visible = value;
          });
        });
      }}
    >
      <FormItem label="关联商机"  name="businessId" component={SysField.BusinessId} businessId={businessId || null} required/>
      <FormItem label="报价区分" name="campType" component={SysField.CampType} required/>
      <FormItem label="竞争对手"  name="competitorId" component={SysField.CompetitorId} competitorId={competitorId || null} />
      <FormItem label="报价状态"  name="quoteStatus" component={SysField.QuoteStatus} />
      <FormItem label="报价"  name="competitorsQuote" component={SysField.CompetitorsQuote} />

    </Form>
  );
};

export default CompetitorQuoteEdit;
