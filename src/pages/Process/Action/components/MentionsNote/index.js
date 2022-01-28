import React, { useRef, useState } from 'react';
import {Collapse, Input} from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { getLastMeasureIndex } from './LastMention';

const MentionsNote = ({ getUserIds, onChange, value, placeholder, getImgs }) => {

  const [users, setUsers] = useState([]);

  const [imgs, setImgs] = useState([]);

  const ref = useRef();

  const onKeyUp = (even) => {
    const { location: measureIndex, prefix: measurePrefix } = getLastMeasureIndex(
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
        typeof getUserIds === 'function' && getUserIds(user);
        typeof onChange === 'function' && onChange(value.target.value);
      }}
      onKeyUp={(e) => {
        onKeyUp(e);
      }}
    />

    {/*<Collapse>*/}
    {/*  <Collapse.Panel key='1' title={<>上传  <PaperClipOutlined /></>}>*/}

    {/*  </Collapse.Panel>*/}
    {/*</Collapse>*/}

  </>;

};

export default MentionsNote;
