/**
 * 工具表编辑页
 *
 * @author song
 * @Date 2021-10-23 10:40:17
 */

import React, {useRef} from 'react';
import Form from '@/components/Form';
import {toolDetail, toolAdd, toolEdit} from '../toolUrl';
import * as SysField from '../toolField';
import {useRequest} from '@/util/Request';
import ProSkeleton from '@ant-design/pro-skeleton';
import {rulesRelationList} from '@/pages/BaseSystem/codingRules/components/rulesRelation/rulesRelationUrl';

const {FormItem} = Form;

const ApiConfig = {
  view: toolDetail,
  add: toolAdd,
  save: toolEdit
};

const ToolEdit = ({...props}) => {

  const formRef = useRef();

  const {loading, data} = useRequest(rulesRelationList, {
    defaultParams: {
      data: {
        moduleId: 1
      }
    }
  });

  if (loading) {
    return (<ProSkeleton type="descriptions" />);
  }

  return (
    <div style={{padding: 16}}>
      <Form
        {...props}
        ref={formRef}
        api={ApiConfig}
        fieldKey="toolId"
      >
        <FormItem
          label="工具编号"
          name="coding"
          component={SysField.Codings}
          codingId={data && data[0] ? data[0].codingRulesId : null}
          rules={[{required:true,message: data && data.length>0 ? '该字段是必填字段' : '请先设置编码！' }]}
        />
        <FormItem label="工具名称" name="name" component={SysField.Name} required />
        <FormItem label="单位" name="unitId" component={SysField.UnitId} required />
        <FormItem label="工具分类" name="toolClassificationId" component={SysField.ToolClassificationId} required />
        <FormItem label="工具状态" name="state" value={0} component={SysField.State} required />
        <FormItem label="备注说明" name="note" component={SysField.Note}  />
        <FormItem label="工具说明书" name="attachment" component={SysField.Attachment}  />
        <FormItem label="工具操作规范" name="norm" component={SysField.Tool} />
      </Form>
    </div>
  );
};

export default ToolEdit;
