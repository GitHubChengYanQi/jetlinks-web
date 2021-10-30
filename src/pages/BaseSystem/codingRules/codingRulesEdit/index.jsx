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
            <li> {'${YYYY} 年（四位数）'} </li>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'${YY} 年（两位数）'} </li>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'${MM} 月'}</li>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'${dd} 日'}</li>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'${randomInt} 随机数'}  </li>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'${week} 当前日期所属年份的第几周'}</li>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'${randomString} 随机字符串'} </li>
            {/* eslint-disable-next-line no-template-curly-in-string */}
            <li> {'${quarter} 当前季度'}</li>
          </ul>
          <p style={{"color":"red"}}>请严谨设置编码规则，避免生成编码重复！！！</p>
        </Collapse.Panel>
      </Collapse>
    </Form>
  );
};

export default CodingRulesEdit;
