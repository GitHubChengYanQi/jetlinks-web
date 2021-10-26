/**
 * 编码规则编辑页
 *
 * @author song
 * @Date 2021-10-22 17:20:05
 */

import React, {useRef} from 'react';
import {Collapse, Input} from 'antd';
import Form from '@/components/Form';
import {codingRulesDetail, codingRulesAdd, codingRulesEdit} from '../codingRulesUrl';
import * as SysField from '../codingRulesField';
import styles from '@/pages/Portal/remind/components/TemplateTable/index.module.scss';

const {FormItem} = Form;

const ApiConfig = {
  view: codingRulesDetail,
  add: codingRulesAdd,
  save: codingRulesEdit
};

const CodingRulesEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="codingRulesId"
    >
      <FormItem label="编码规则名称" name="name" component={SysField.Name} required />
      <FormItem
        label="编码规则分类"
        name="codingRulesClassificationId"
        component={SysField.CodingRulesClassificationId}
        required />
      <FormItem label="编码规则" name="codingRules" component={SysField.CodingRules} required />
      <Collapse style={{marginLeft: 72}} defaultActiveKey={['1']} ghost>
        <Collapse.Panel header="规则变量" key="1">
          <ul className={styles.var}>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'年（四位数）：${YYYY}'} </li>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'年（两位数）：${YY}'} </li>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'月：${MM}'}</li>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'日：${dd}'}</li>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'随机数：${randomInt}'}  </li>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'随机字符串：${randomString}'} </li>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'当前日期所属年份的第几周：${week}'}</li>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'随机字符串：${randomString}'} </li>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'当前季度：${quarter}'}</li>
          </ul>
        </Collapse.Panel>
      </Collapse>
    </Form>
  );
};

export default CodingRulesEdit;
