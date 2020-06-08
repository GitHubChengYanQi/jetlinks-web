import React, {useState, useEffect} from 'react';
import {Card, Form, Input, Message, Loading} from '@alifd/next';
import {useRequest} from '@/Config/BaseRequest';
import {positionAdd, positionSave, positionView} from '@/Config/ApiUrl/system/position';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18}
};

const constValue = {
  name: '',
  code: '',
  remark: '',
  sort: ''
};

let defaultValue = {...constValue};

const PositionForm = ({id, onSuccess, onError}) => {

  const [formValue, setFormValue] = useState({...defaultValue});

  const {loading: addLoading, request: addRequest} = useRequest(positionAdd);
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

  const {loading: saveLoading, request: saveRequest} = useRequest(positionSave);
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
        save({...value, positionId: id});
      } else {
        add(value);
      }
    }
  }

  const {loading: viewLoading, request: viewRequest} = useRequest(positionView);
  const view = async () => {
    const {error, response} = await viewRequest({
      data: {positionId:id}
    });
    if (error) {
      typeof onError === 'function' && onError(error);
    } else {
      defaultValue = {
        name: response.data.name,
        code: response.data.code,
        remark: response.data.remark,
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
            <FormItem {...formItemLayout} label="职位名称" required requiredMessage="请输入职位名称">
              <Input placeholder="请输入职位名称" name="name"/>
            </FormItem>
            <FormItem {...formItemLayout} label="职位编码" required requiredMessage="请输入职位编码">
              <Input placeholder="请输入职位编码" name="code"/>
            </FormItem>
            <FormItem {...formItemLayout} label="备注">
              <Input placeholder="请输备注" name="remark"/>
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

export default PositionForm;