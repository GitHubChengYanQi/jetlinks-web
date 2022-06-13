import React from 'react';
import {Mentions} from 'antd';
import FileUpload from '@/components/FileUpload';
import {useRequest} from '@/util/Request';
import {userIdSelect} from '@/pages/Portal/remind/remindUrl';

const MentionsNote = ({
  getUsers = () => {
  },
  onChange = () => {
  },
  value,
  users,
  placeholder,
  getImgs = () => {
  }
}) => {

  const {data} = useRequest(userIdSelect);

  return <>
    <Mentions
      value={value}
      rows={4}
      placeholder={placeholder}
      style={{width: '100%'}}
      onChange={onChange}
      onSelect={(option) => {
        getUsers([...users, {name: option.value, id: option.key}]);
      }}
    >
      {
        data && data.map((item) => {
          return <Mentions.Option key={item.value} value={item.label}>{item.label}</Mentions.Option>;
        })
      }
    </Mentions>

    <div style={{marginTop: 16}}>
      <FileUpload
        title="上传图片"
        maxCount={10}
        onChange={(value) => {
          getImgs(value);
        }} />
    </div>

  </>;

};

export default MentionsNote;
