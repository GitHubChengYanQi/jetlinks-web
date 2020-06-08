import React, {useEffect, useState} from 'react';
import {useRequest} from '@/Config/BaseRequest';
import {Form, Loading, Message} from '@alifd/next';


const FormItem = Form.Item;
let defaultValue = {};

const Editform = React.forwardRef(({fieldKey, id, onSuccess, onError, onViewError, constValue, onLoad, onSubmit, ApiConfig = {}, formItemLayout, children}, ref) => {

  const searchData = {};
  searchData[`${fieldKey}`] = id;

  const {Add, Save, View} = ApiConfig;

  const [formValue, setFormValue] = useState({...defaultValue});

  const {loading: addLoading, request: addRequest} = useRequest(Add);
  const add = async (data) => {
    const {error, response} = await addRequest({
      data
    });
    if (error) {
      typeof onError === 'function' && onError(error);
    } else {
      typeof onSuccess === 'function' && onSuccess(response);
    }
  }

  const {loading: saveLoading, request: saveRequest} = useRequest(Save);
  const save = async (data) => {
    const {error, response} = await saveRequest({
      data
    });
    if (error) {
      typeof onError === 'function' && onError(error);
    } else {
      typeof onSuccess === 'function' && onSuccess(response);
    }
  }

  const submit = async (value, errors) => {
    if (typeof onSubmit === 'function') {
      value = await onSubmit(value);
    }
    if (!errors) {
      if (id) {
        save({...value, ...searchData});
      } else {
        add(value);
      }
    }
  }

  const {loading: viewLoading, request: viewRequest} = useRequest(View);
  const view = async () => {
    const {error, response} = await viewRequest({
      data: {...searchData}
    });
    if (error) {
      typeof onViewError === 'function' && onViewError(error);
    } else {
      await clone(response.data);
      setFormValue({...defaultValue});
    }
  }

  useEffect(() => {
    if (id) {
      view();
    } else if (id === null) {
      defaultValue = {...constValue}
    }
  }, [id]);

  const clone = async (data) => {
    if (typeof onLoad === 'function') {
      data = await onLoad(data);
    }
    if (data !== undefined) {
      Object.keys(constValue).map((key) => {
        if (data[key]!=='') {
          defaultValue[key] = typeof data[key] === 'object' ? data[key] : `${data[key]}`;
        } else {
          defaultValue[key] = '';
        }
        return true;
      });
    }
  }

  return (
    <Form value={formValue} ref={ref}>
      <Loading visible={addLoading || saveLoading || viewLoading} shape="fusion-reactor" style={{width: '100%'}}>
        {children}
        <FormItem {...formItemLayout} label=" ">
          <Form.Submit type="primary" className="button-right-margin" onClick={submit} validate>保存</Form.Submit>
          <Form.Reset onClick={() => {
            setFormValue({...defaultValue});
          }}>重置</Form.Reset>
        </FormItem>
      </Loading>
    </Form>
  );
});

export default Editform;