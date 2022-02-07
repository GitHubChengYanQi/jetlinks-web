import React, {useState} from 'react';
import {Input} from 'antd';
import {getLastMeasureIndex} from './LastMention';
import FileUpload from '@/components/FileUpload';

const MentionsNote = ({
  getUserIds = () => {
  }, onChange = () => {
  }, value, placeholder, getImgs = () => {
  }
}) => {

  const [users, setUsers] = useState([]);

  const onKeyUp = (even) => {
    const {location: measureIndex, prefix: measurePrefix} = getLastMeasureIndex(
      value,
      '@',
    );
    if (measureIndex !== -1) {
      if (even.key === measurePrefix || even.key === 'Shift') {
        console.log(111);
      }

    }
  };

  return <>
    <Input.TextArea
      rows={3}
      value={value}
      placeholder={placeholder}
      onChange={(value) => {
        const user = users.filter((items) => {
          return value.target.value.indexOf(items.label) !== -1;
        });
        setUsers(user);
        getUserIds(user);
        onChange(value.target.value);
      }}
      onKeyUp={(e) => {
        onKeyUp(e);
      }}
    />

    <div style={{marginTop: 16}}>
      <FileUpload
        title="上传图片"
        maxCount={10}
        onChange={(value) => {
          getImgs([value]);
        }} />
    </div>

  </>;

};

export default MentionsNote;
