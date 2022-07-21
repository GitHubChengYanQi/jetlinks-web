/**
 * 注意事项编辑页
 *
 * @author song
 * @Date 2022-05-27 13:45:48
 */

import React, {useRef} from 'react';
import Form from '@/components/Form';
import {announcementsDetail, announcementsAdd, announcementsEdit} from '../announcementsUrl';
import * as SysField from '../announcementsField';

const {FormItem} = Form;

const ApiConfig = {
  view: announcementsDetail,
  add: announcementsAdd,
  save: announcementsEdit
};

const AnnouncementsEdit = ({...props}) => {

  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="noticeId"
    >
      <FormItem label="内容" name="content" component={SysField.Content} required/>
    </Form>
  );
};

export default AnnouncementsEdit;
