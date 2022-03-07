import React, {useEffect, useRef} from 'react';
import {Sortable} from '@/components/Table/components/DndKit/Sortable';
import {Editor} from '@tinymce/tinymce-react';
import tinymce from 'tinymce';

const App = () => {

  const editorRef = useRef(null);
  useEffect(() => {

    tinymce.PluginManager.add('example', function (editor, url) {
      const openDialog = function () {
        return editor.windowManager.open({
          title: '这里是弹窗标题',
          body: {
            type: 'panel',
            items: [
              {
                type: 'input',
                name: 'title',
                label: 'Title'
              }
            ]
          },
          buttons: [
            {
              type: 'cancel',
              text: 'Close'
            },
            {
              type: 'submit',
              text: 'Save',
              primary: true
            }
          ],
          onSubmit: function (api) {
            const data = api.getData();
            // 将输入框内容插入到内容区光标位置
            editor.insertContent('插入的文字是: ' + data.title);
            api.close();
          }
        });
      };
      // 注册一个工具栏按钮名称
      editor.ui.registry.addButton('example', {
        text: '工具栏按钮名',
        onAction: function () {
          openDialog();
        }
      });

      // 注册一个菜单项名称 menu/menubar
      editor.ui.registry.addMenuItem('example', {
        text: 'Example菜单名',
        onAction: function () {
          openDialog();
        }
      });

      return {
        getMetadata: function () {
          return {
            //插件名和链接会显示在“帮助”→“插件”→“已安装的插件”中
            name: 'Example plugin',//插件名称
            url: 'http://exampleplugindocsurl.com', //作者网址
          };
        }
      };
    });
  }, []);

  return (
    <div>
      <Editor
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
            'removeformat | help | example',
          // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }' +
        }}
      />
      <Sortable handle items={[
        {
          title: '字段1',
          key: 'key1',
          visible: true,
          checked: true,
        }, {
          title: '字段2',
          key: 'key2',
          visible: false,
          checked: true,
        }, {
          title: '字段3',
          key: 'key3',
          visible: false,
          checked: true,
        }, {
          title: '字段4',
          key: 'key4',
          visible: false,
          checked: true,
        }, {
          title: '字段5',
          key: 'key5',
          visible: false,
          checked: true,
        }
      ]} />
    </div>
  );
};

export default App;
