import React, {useEffect, useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import tinymce from 'tinymce';
import {Input, Modal} from 'antd';

const App = () => {

  const editorRef = useRef(null);

  const [visible, setVisible] = useState();

  const [title, setTitle] = useState('');

  useEffect(() => {

    tinymce.PluginManager.add('example', function (editor, url) {
      // 注册一个工具栏按钮名称
      editor.ui.registry.addButton('example', {
        text: '文本框',
        onAction() {
          setVisible('input');
        }
      });

      editor.ui.registry.addButton('number', {
        text: '数字框',
        onAction() {
          setVisible('number');
        }
      });

      editor.ui.registry.addButton('date', {
        text: '时间框',
        onAction() {
          setVisible('date');
        }
      });

      return {
        getMetadata() {
          return {
            // 插件名和链接会显示在“帮助”→“插件”→“已安装的插件”中
            name: 'Example plugin',// 插件名称
            url: 'http://exampleplugindocsurl.com', // 作者网址
          };
        }
      };
    });
  }, []);

  const insertContent = (content) => {
    editorRef.current.insertContent(content);
  };

  return (
    <div>
      <Editor
        // id='editor'
        apiKey="no-api-key"
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          language: 'zh_CN',
          // skin: 'oxide-dark',
          height: 500,
          menubar: false,
          plugins: [
            'example advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | table | ' +
            'removeformat | help | example | number | menu | date',
          // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }' +
        }}
        onChange={(value) => {
          console.log('onChange=>', value.level.content);
        }}
      />


      <Modal
        title="设置标题"
        visible={visible}
        onOk={() => {
          switch (visible) {
            case 'input':
              insertContent(`<input type='text' data-title=${title || '文本框'} />`);
              break;
            case 'number':
              insertContent(`<input type='number' data-title=${title || '数字框'} />`);
              break;
            case 'date':
              insertContent(`<input type='date' data-title=${title || '时间框'} />`);
              break;
            default:
              break;
          }
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}>
        <Input placeholder="请输入标题..." onChange={(value) => {
          setTitle(value.target.value);
        }} />
      </Modal>

    </div>
  );
};

export default App;
