import React, {useRef} from 'react';
import {menuAdd, menuSave, menuTree, menuView} from '@/Config/ApiUrl/system/menu';
import Form from '@/components/Form';
import {Input, Radio as AntRadio} from 'antd';
import Cascader from '@/components/Cascader';
import SelectIcon from '@/components/SelectIcon';
import Radio from '@/components/Radio';
import {dictByCode, dictRadioByCode} from "@/Config/ApiUrl/system/dict";

const {FormItem} = Form;

const ApiConfig = {
  view: menuView,
  add: menuAdd,
  save: menuSave
};

const MenuEdit = ({id, ...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      id={id}
      fieldKey="menuId"
      onSubmit={(values) => {
        console.log(values);
        if (Array.isArray(values.pids) && values.pids.length > 0) {
          values.pid = values.pids[values.pids.length - 1];
        } else {
          // values.pid = 0;
        }
        return values;
      }}
    >
      <FormItem label="名称" name="name" component={Input}/>
      <FormItem label="分类" name="systemType" component={Radio} api={dictRadioByCode} options={{
        defaultParams: {
          data: {
            dictTypeCode: 'SYSTEM_TYPE'
          }
        }
      }}/>
      <FormItem label="编码" name="code" component={Input}/>
      <FormItem label="上级" name="pids" component={Cascader} allowClear={false} api={menuTree}/>
      <FormItem label="菜单" name="menuFlag" component={AntRadio.Group}
                options={[{label: '是', value: 'Y'}, {label: '否', value: 'N'}]}/>
      <FormItem label="图标" name="icon" component={SelectIcon}/>
      <FormItem label="请求地址" name="url" component={Input}/>
      <FormItem label="排序" name="sort" component={Input}/>
    </Form>
  );
};

export default MenuEdit;
