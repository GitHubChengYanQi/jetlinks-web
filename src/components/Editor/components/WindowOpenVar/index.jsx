import React, {useEffect, useState} from 'react';
import {message, Modal} from 'antd';
import {Contacts} from '@/components/Editor/components/Module';

const WindowOpenVar = () => {

  const [visible, setVisible] = useState();

  const [editorRef, setEditorRef] = useState();

  useEffect(() => {
    window.OpenVar = (editorRef) => {
      setEditorRef(editorRef);
      setVisible(true);
    };
  }, []);

  const [button, setButton] = useState('');

  const [defindInput, setDefinedInput] = useState('');

  const [table, setTable] = useState([]);

  const insertContent = (content) => {
    editorRef.insertContent(content);
  };

  const refresh = () => {
    setVisible(false);
    setButton(null);
    setDefinedInput(null);
  };


  const moduleOnoK = () => {
    let content = '';
    let labeltds = '';
    table.map((item) => {
      if (item.value) {
        labeltds += `<td>${item.label}</td>`;
      }
      return null;
    });
    let valuetds = '';
    table.map((item) => {
      if (item.value) {
        valuetds += `<td>$\{{${item.value}}}</td>`;
      }
      return null;
    });
    switch (button) {
      case 'defined':
        insertContent(defindInput);
        break;
      case 'defindSelect':
        insertContent(defindInput);
        break;
      case 'skuTable':
        content = `<table style="border-collapse: collapse;" border="1"><tr>${labeltds}</tr><tr data-group="sku">${valuetds}</tr></table>`;
        insertContent(content);
        break;
      case 'payTable':
        content = `<table style="border-collapse: collapse;" border="1"><tr>${labeltds}</tr><tr data-group="pay">${valuetds}</tr></table>`;
        insertContent(content);
        break;
      default:
        insertContent(`$\{{${button}}}`);
        break;
    }

  };

  return <>

    <Modal
      title="插入变量"
      destroyOnClose
      width={800}
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
      <div style={{maxHeight: 'calc(100vh - 110px)', overflowY: 'auto', overflowX: 'hidden'}}>
        <Contacts setButton={setButton} button={button} setDefinedInput={setDefinedInput} setTable={setTable} />
      </div>
    </Modal>
  </>;

};

export default WindowOpenVar;

