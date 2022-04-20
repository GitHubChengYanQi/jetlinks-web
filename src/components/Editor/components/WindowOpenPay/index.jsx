import React, {useEffect, useState} from 'react';
import {Modal} from 'antd';
import {PayVar, SkuVar} from '@/components/Editor/components/Module';

const WindowOpenPay = () => {

  const [visible, setVisible] = useState();

  const [editorRef, setEditorRef] = useState();

  const insertContent = (content) => {
    editorRef.insertContent(content);
  };

  useEffect(() => {
    window.OpenPay = (editorRef) => {
      setEditorRef(editorRef);
      setVisible(true);
    };
  }, []);

  const [button, setButton] = useState('');

  const [table, setTable] = useState([]);

  const refresh = () => {
    setVisible(false);
    setButton(null);
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
        valuetds += `<td>$\{${item.value}}</td>`;
      }
      return null;
    });

    if (button){
      insertContent(`$\{${button}}`);
    }else {
      content = `<table style="border-collapse: collapse;" border="1"><tr>${labeltds}</tr><tr data-group="pay">${valuetds}</tr></table>`;
      insertContent(content);
    }

  };

  return <>
    <Modal
      title="插入变量"
      destroyOnClose
      width={800}
      visible={visible}
      onOk={() => {
        moduleOnoK();
        refresh();
      }}
      onCancel={() => {
        refresh();
      }}>
      <div style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto', overflowX: 'hidden'}}>
        <PayVar setButton={setButton} setTable={setTable} />
      </div>
    </Modal>
  </>;

};

export default WindowOpenPay;

