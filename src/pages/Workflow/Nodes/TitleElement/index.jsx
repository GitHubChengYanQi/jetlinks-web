import React, {useState, useEffect, useRef} from 'react';
import Icon from '@/components/Icon';

function TitleElement(props) {
  const [title, setTitle] = useState('');
  const [editable, setEditable] = useState(false);
  const input = useRef(null);
  useEffect(() => {
    setTitle(props.nodeName);
  }, []);

  function onFocus(e) {
    e.currentTarget.select();
  }

  function onBlur() {
    setEditable(false);
    if (!title) {
      setTitle(props.placeholder);
    }
  }

  function onClick() {
    setEditable(true);
  }

  useEffect(() => {
    if (editable) {
      input.current.focus();
    }
  }, [editable]);

  function onChange(e) {
    const val = e.target.value;
    props.onTitleChange && props.onTitleChange(val);
    setTitle(val);
  }

  return (<React.Fragment>
    {props.icon && <span className="iconfont">{props.icon}</span>}
    {
      editable ? <input
          ref={input}
          type="text"
          className="ant-input editable-title-input"
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          value={title}
          placeholder={props.placeholder} />
        :
        <span className="editable-title" onClick={onClick}>{title}</span>}
    <Icon type="icon-close" className="close" onClick={props.delNode} />
  </React.Fragment>);
}

export default TitleElement;
