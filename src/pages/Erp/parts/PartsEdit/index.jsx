/**
 * 清单编辑页
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

import React, {useRef, useState} from 'react';
import Form from '@/components/Form';
import {Button, Steps} from 'antd';
import FormIndex from '@/components/Form/FormIndex';
import {partsDetail, partsAdd, partsEdit} from '../PartsUrl';
import * as SysField from '../PartsField';

const {FormItem} = Form;

const {Step} = Steps;

const ApiConfig = {
  view: partsDetail,
  add: partsAdd,
  save: partsEdit
};

const PartsEdit = ({...props}) => {

  const {value} = props;

  const [result, setResult] = useState(value ? value.partsId : value );


  const formRef = useRef(null);

  return (
    <>
      <div style={{margin: '50px 150px'}}>
        <Form
          {...props}
          value={result}
          ref={formRef}
          api={ApiConfig}
          fieldKey="partsId"
        >
          <FormItem style={{'display': 'none'}}  name="itemId" value={props.itemsId} required/>
          <FormItem label="零件" name="items" val={value ? value.itemsResult.name : null} component={SysField.Item} />
          <FormItem label="零件数量" name="number" component={SysField.Number} />
        </Form>
      </div>
    </>
  );
};

export default PartsEdit;
