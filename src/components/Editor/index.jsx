import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import tinymce from 'tinymce';
import {message, Modal} from 'antd';
import {Editor as TinymceEditor} from '@tinymce/tinymce-react';
import {Contacts, PHYSICALDETAIL, POSITIONS} from '@/components/Editor/components/Module';


const Editor = ({
  value,
  onChange = () => {
  },
  module,
}, ref) => {

  const editorRef = useRef(null);

  const [visible, setVisible] = useState();

  const [title, setTitle] = useState('');

  const [button, setButton] = useState('');

  const [table, setTable] = useState([]);

  const editorSave = () => {
    return editorRef.current.getContent();
  };

  useImperativeHandle(ref, () => ({
    editorSave,
  }));

  const insertContent = (content) => {
    editorRef.current.insertContent(content);
  };

  const moduleOnoK = () => {
    let content = '';
    let labeltds = '';
    table.map((item) => {
      return labeltds += `<td>${item.label}</td>`;
    });
    let valuetds = '';
    table.map((item) => {
      return valuetds += `<td>$\{{${item.value}}}</td>`;
    });
    switch (module) {
      case 'PHYSICALDETAIL':
        insertContent(`$\{${button}}`);
        break;
      case 'POSITIONS':
        insertContent(`$\{${button}}`);
        break;
      case 'contacts':
        switch (button) {
          case 'input':
            if (!title) {
              return message.warn('请输入标题！');
            }
            insertContent(`<input type='text' data-title=${title || '文本框'} />`);
            break;
          case 'number':
            if (!title) {
              return message.warn('请输入标题！');
            }
            insertContent(`<input type='number' data-title=${title || '数字框'} />`);
            break;
          case 'date':
            if (!title) {
              return message.warn('请输入标题！');
            }
            insertContent(`<input type='date' data-title=${title || '时间框'} />`);
            break;
          case 'skuTable':
            content = `<table style="border-collapse: collapse;" border="1"><tr data-group="sku">${labeltds}</tr><tr>${valuetds}</tr></table>`;
            insertContent(content);
            break;
          case 'payTable':
            content = `<table style="border-collapse: collapse;" border="1"><tr data-group="pay">${labeltds}</tr><tr>${valuetds}</tr></table>`;
            insertContent(content);
            break;
          default:
            insertContent(`$\{{${button}}}`);
            break;
        }
        break;
      default:
        break;
    }
  };

  const moduleModalContent = () => {
    switch (module) {
      case 'PHYSICALDETAIL':
        return <PHYSICALDETAIL button={button} setButton={setButton} />;
      case 'POSITIONS':
        return <POSITIONS button={button} setButton={setButton} />;
      case 'contacts':
        return <Contacts title={title} setButton={setButton} button={button} setTitle={setTitle} setTable={setTable} />;
      default:
        break;
    }
  };

  const refresh = () => {
    setVisible(false);
    setButton(null);
    setTitle(null);
  };

  useEffect(() => {
    window.editOpen = () => {
      setVisible(true);
    };
  }, []);

  const plugins = module ? ['editorPlugins'] : [];

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
            'insertdatetime', 'media', 'table', 'paste', 'code', 'help', 'wordcount', ...plugins],
          toolbar: 'undo redo | actions | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | table | ' +
            'removeformat | help | item',
          // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }' +
        }}
        onBlur={() => {
          if (!module) {
            onChange(editorRef.current.getContent());
          }
        }}
      />


      <Modal
        title="设置变量"
        destroyOnClose
        width={700}
        visible={visible}
        onOk={() => {
          if (!button) {
            return message.warn('请选择变量！');
          }
          moduleOnoK();
          refresh();
        }}
        onCancel={() => {
          refresh();
        }}>

        {moduleModalContent()}
      </Modal>

    </div>
  );
};

export default React.forwardRef(Editor);
