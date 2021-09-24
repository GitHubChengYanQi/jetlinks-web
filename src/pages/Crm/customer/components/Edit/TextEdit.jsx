import React, {useState} from 'react';
import Editor from '@/components/Editor';
import parse from 'html-react-parser';

const TextEdit = ({value, onChange}) => {

  const [visiable, setVisiable] = useState(true);
  const [change, setChange] = useState(value);

  return (
    <div onClick={() => {
      setVisiable(false);
    }} style={{cursor: visiable && 'pointer'}}>
      {visiable ? <div>{change ? parse(change) : '暂无'}</div> : <Editor value={change} onChange={(value) => {
        setChange(value);
        typeof onChange === 'function' && onChange(value);
        setVisiable(true);
      }} />}
    </div>

  );
};
export default TextEdit;
