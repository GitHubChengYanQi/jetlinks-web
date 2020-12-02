import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

const Editor = ({onChange,onBlur, value, ...props}) => {

  const state = BraftEditor.createEditorState(value);

  return (
    <BraftEditor
      className="my-editor"
      placeholder="请输入正文内容"
      value={state}
      onBlur={(content) => {
        onChange(content.toHTML());
      }}
      {...props}
    />
  );
};

export default Editor;
