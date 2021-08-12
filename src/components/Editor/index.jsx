import React, {useEffect, useRef, useState} from 'react';
import ReactWEditor from 'wangeditor-for-react';
import {Button} from 'antd';

const Editor = ({onChange, onBlur, value, imgUploadProps, ...props}, ref) => {

  const editorRef = useRef(null);




  useEffect(() => {
    if (editorRef.current) {
      console.log(editorRef.current);
      editorRef.current.editor.txt.html(value);

    }

  }, [value]);

  const insertHtmlInput = () => {
    editorRef.current.editor.cmd.do('insertHTML', '<strong class="inp">文本框</strong>');
  };
  const insertHtmlNumber = () => {
    editorRef.current.editor.cmd.do('insertHTML', '<strong class="number">数字框</strong>');
  };
  const insertHtmlDate = () => {
    editorRef.current.editor.cmd.do('insertHTML', '<strong class="date">时间框</strong>');
  };
  const insertCustomer = () => {
    editorRef.current.editor.cmd.do('insertHTML', '<strong class="but">选择客户</strong>');;
  };
  const insertItems = () => {
    editorRef.current.editor.cmd.do('insertHTML', '<strong class="items">选择产品</strong>');;
  };
  const insertAcontacts = () => {
    editorRef.current.editor.cmd.do('insertHTML', '<strong class="insertAcontacts">选择甲方联系人</strong>');;
  };

  const insertBcontacts = () => {
    editorRef.current.editor.cmd.do('insertHTML', '<strong class="insertBcontacts">选择乙方联系人</strong>');;
  };

  const insertAAdress = () => {
    editorRef.current.editor.cmd.do('insertHTML', '<strong class="insertAAdress">选择甲方地址</strong>');;
  };

  const insertBAdress = () => {
    editorRef.current.editor.cmd.do('insertHTML', '<strong class="insertBAdress">选择乙方地址</strong>');;
  };

  const insertAPhone = () => {
    editorRef.current.editor.cmd.do('insertHTML', '<strong class="insertAPhone">选择甲方电话</strong>');;
  };

  const insertBPhone = () => {
    editorRef.current.editor.cmd.do('insertHTML', '<strong class="insertBPhone">选择乙方电话</strong>');;
  };

  const insertACustomer = () => {
    editorRef.current.editor.cmd.do('insertHTML', '<strong class="insertACustomer">选择甲方客户</strong>');;
  };

  const insertBCustomer = () => {
    editorRef.current.editor.cmd.do('insertHTML', '<strong class="insertBCustomer">选择乙方客户</strong>');;
  };
  const insertPackage = () => {
    editorRef.current.editor.cmd.do('insertHTML', '<strong class="insertPackage">选择套餐</strong>');;
  };

  return (
    <>
      <Button onClick={() => insertHtmlInput()}> 文本框</Button>
      <Button onClick={() => insertHtmlNumber()}> 数字框</Button>
      <Button onClick={() => insertHtmlDate()}> 时间框</Button>
      <Button onClick={() => insertCustomer()}> 选择客户</Button>
      <Button onClick={() => insertItems()}> 选择产品</Button>
      <Button onClick={() => insertPackage()}> 选择套餐</Button>

      <Button onClick={() => insertAcontacts()}> 选择甲方联系人</Button>
      <Button onClick={() => insertBcontacts()}> 选择乙方联系人</Button>
      <Button onClick={() => insertAAdress()}> 选择甲方地址</Button>
      <Button onClick={() => insertBAdress()}> 选择乙方地址</Button>
      <Button onClick={() => insertAPhone()}> 选择甲方电话</Button>
      <Button onClick={() => insertBPhone()}> 选择乙方电话</Button>
      <Button onClick={() => insertACustomer()}> 选择甲方客户</Button>
      <Button onClick={() => insertBCustomer()}> 选择套乙方客户</Button>
      <ReactWEditor
        placeholder="自定义 placeholder"
        ref={editorRef}
        defaultValue={value}
        linkImgCallback={(src, alt, href) => {
          // 插入网络图片的回调事件
          console.log('图片 src ', src);
          console.log('图片文字说明', alt);
          console.log('跳转链接', href);
        }}
        onlineVideoCallback={(video) => {
          // 插入网络视频的回调事件
        }}
        onChange={(html) => {
        }}
        onBlur={(html) => {
          onChange(html);
        }}
        onFocus={(html) => {
        }}
        {...props}
      />

    </>
  );
};
export default React.forwardRef(Editor);
