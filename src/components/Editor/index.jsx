import React, {useImperativeHandle, useRef} from 'react';
import {Editor as TinymceEditor} from '@tinymce/tinymce-react';


const Editor = ({
  value,
  onChange = () => {
  },
  module,
}, ref) => {

  const editorRef = useRef(null);

  const editorSave = () => {
    return editorRef.current.getContent();
  };

  useImperativeHandle(ref, () => ({
    editorSave,
  }));

  const toobar = () => {
    switch (module) {
      case 'PHYSICALDETAIL':
        return ['actionsSku'];
      case 'POSITIONS':
        return ['actionsPosition'];
      case 'contacts':
        return ['actions'];
      default:
        return [];
    }
  };

  return (
    <div>
      <TinymceEditor
        apiKey="no-api-key"
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={value}
        init={{
          language: 'zh_CN',
          // skin: 'oxide-dark',
          height: 500,
          menubar: false,
          plugins: ['advlist', 'autolink', 'autolink'
            , 'lists', 'link', 'image', 'charmap', 'print', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'paste', 'code', 'help', 'wordcount', 'editorPlugins'],
          toolbar: ['undo redo',...toobar(), 'formatselect', 'bold italic backcolor', 'alignleft aligncenter', 'alignright alignjustify', 'bullist numlist outdent indent', 'table', 'removeformat', 'help', 'actionsImg'].join(' | ')
        }}
        onBlur={() => {
          if (!module) {
            onChange(editorRef.current.getContent());
          }
        }}
      />


    </div>
  );
};

export default React.forwardRef(Editor);
