import React, {useState, useEffect} from 'react';
import {Card, Form, Input, Message, Loading} from '@alifd/next';
import ItemWapper from '@/components/ItemWapper';
import RoleSelect from '@/pages/setting/system/role/RoleSelect';
import {useRequest} from '@/Config/BaseRequest';
import {roleAdd, roleSave, roleView} from '@/Config/ApiUrl/system/role';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18}
};

const constValue = {
  name: '',
  pid: '',
  description: '',
  sort: ''
};

let defaultValue = {...constValue};

const RoleEditForm = ({id, onSuccess, onError}) => {

  const [formValue, setFormValue] = useState({...defaultValue});

  const {loading: addLoading, request: addRequest} = useRequest(roleAdd);
  const add = async (data) => {
    const {error, response} = await addRequest({
      data
    });
    if (error) {
      Message.error(error.message);
    } else {
      typeof onSuccess === 'function' && onSuccess(response);
    }
  }

  const {loading: saveLoading, request: saveRequest} = useRequest(roleSave);
  const save = async (data) => {
    const {error, response} = await saveRequest({
      data
    });
    // console.log(response);
    if (error) {
      Message.error(error.message);
    } else {
      typeof onSuccess === 'function' && onSuccess(response);
    }
  }

  const submit = (value, errors) => {
    if (!errors) {
      if (id) {
        save({...value, roleId: id});
      } else {
        add(value);
      }
    }
  }

  const {loading: viewLoading, request: viewRequest} = useRequest(roleView);
  const view = async () => {
    const {error, response} = await viewRequest({
      path: id
    });
    if (error) {
      typeof onError === 'function' && onError(error);
    } else {
      defaultValue = {
        name: response.data.name,
        pid: `${response.data.pid}`,
        description: response.data.description,
        sort: response.data.sort
      };
      setFormValue({...defaultValue});
    }
  }

  useEffect(() => {
    if (id) {
      view();
    }else if(id===null){
      defaultValue = {...constValue}
    }
  }, [id]);

  return (

    <Form value={formValue}>
      <Loading visible={addLoading || saveLoading || viewLoading} shape="fusion-reactor" style={{width:'100%'}}>
        <Card contentHeight='auto' className='edit-block'>
          <Card.Content>
            <FormItem {...formItemLayout} label="名称" required requiredMessage="请输入名称">
              <Input placeholder="请输入名称" name="name"/>
            </FormItem>
            <FormItem {...formItemLayout} label="上级角色" required requiredMessage="请选择上级角色">
              <ItemWapper placeholder="请选择上级角色" name="pid" ItemNode={RoleSelect}/>
            </FormItem>
            <FormItem {...formItemLayout} label="别名" required requiredMessage="请输入别名">
              <Input placeholder="请输入别名" name="description"/>
            </FormItem>
            <FormItem {...formItemLayout} wrapperCol={{span: 5}} label="排序">
              <Input placeholder="排序" name="sort"/>
            </FormItem>
          </Card.Content>
        </Card>
        <FormItem {...formItemLayout} label=" ">
          <Form.Submit type="primary" className="button-right-margin" onClick={submit} validate>保存</Form.Submit>
          <Form.Reset onClick={() => {
            setFormValue({...defaultValue});
          }}>重置</Form.Reset>
        </FormItem>
      </Loading>
    </Form>

  );
}

export default RoleEditForm;