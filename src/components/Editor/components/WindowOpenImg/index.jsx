import React, {useEffect, useState} from 'react';
import {Modal} from 'antd';
import CommonMediaList from '@/pages/Erp/commonMedia/commonMediaList';

const WindowOpenImg = () => {
  const [visible, setVisible] = useState();

  const [editorRef, setEditorRef] = useState();

  useEffect(() => {
    window.OpenImg = (editorRef) => {
      setEditorRef(editorRef);
      setVisible(true);
    };
  }, []);

  const insertContent = (content) => {
    editorRef.insertContent(content);
  };
  return <>
    <Modal
      title="插入变量"
      destroyOnClose
      width={800}
      visible={visible}
      onOk={() => {
        setVisible(false);
      }}
      onCancel={() => {
        setVisible(false);
      }}>

      <CommonMediaList />
    </Modal>
  </>;
};

export default WindowOpenImg;
