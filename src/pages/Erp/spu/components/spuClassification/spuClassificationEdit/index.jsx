/**
 * SPU分类编辑页
 *
 * @author song
 * @Date 2021-10-25 17:52:03
 */

import React, {useRef} from 'react';
import {Popover, Space} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import Form from '@/components/Form';
import {spuClassificationDetail, spuClassificationAdd, spuClassificationEdit} from '../spuClassificationUrl';
import * as SysField from '../spuClassificationField';

const {FormItem} = Form;

const ApiConfig = {
  view: spuClassificationDetail,
  add: spuClassificationAdd,
  save: spuClassificationEdit
};

const SpuClassificationEdit = ({...props}) => {

  const {type, ...other} = props;

  const formRef = useRef();

  return (
    <Form
      {...other}
      ref={formRef}
      api={ApiConfig}
      fieldKey="spuClassificationId"
      onSubmit={(value) => {
        return {...value, type: type ? 1 : 2};
      }}
    >
      <FormItem
        label={type !== 1 ? '分类名称' : '上级分类'}
        name="pid"
        component={SysField.Pid}
        defaultParams={{data: {isNotproduct: 1}}}
        top={type === 1}
        required />
      <FormItem label="分类名称" name="name" component={SysField.Name} required />
      <FormItem
        label={<Space>{type !== 1 ? '产品码' : '分类码'} <Popover content={`${type !== 1 ? '产品码' : '分类码'}仅用于配置“编码规则”时使用`}>
          <QuestionCircleOutlined style={{cursor: 'pointer'}} />
        </Popover></Space>}
        name="codingClass"
        component={SysField.CodingClass}
        rules={[{
          pattern: '^[A-Z\\d\\+\\-\\*\\/\\(\\)\\%（）]+$',
          message: '只能输入大写字母或数字！'
        }]} />
      <FormItem label="排序" name="sort" component={SysField.Sort} />
    </Form>
  );
};

export default SpuClassificationEdit;
