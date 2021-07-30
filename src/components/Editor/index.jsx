import React, {useEffect, useRef, useState} from 'react';
import ReactWEditor from 'wangeditor-for-react';
import {Button} from 'antd';
import Drawer from '@/components/Drawer';
import Index from '@/pages/Crm/template/TemplateEdit/components/Customer';

const Editor = ({onChange, onBlur, value, imgUploadProps, ...props}, ref) => {

  const editorRef = useRef(null);

  const re = useRef(null);

  const [state, setState] = useState();

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
  const insertName = (value) => {
    editorRef.current.editor.cmd.do('insertHTML', value);;
  };

  return (
    <>
      <Button onClick={() => insertHtmlInput()}> 文本框</Button>
      <Button onClick={() => insertHtmlNumber()}> 数字框</Button>
      <Button onClick={() => insertHtmlDate()}> 时间框</Button>
      <Button onClick={() =>  re.current.open(false)}> 选择客户</Button>
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
          console.log('插入视频内容', video);
        }}
        onChange={(html) => {
          console.log('onChange html:', html);
        }}
        onBlur={(html) => {
          console.log('onBlur html:', html);
          onChange(html);
        }}
        onFocus={(html) => {
          console.log('onFocus html:', html);
        }}
        {...props}
      />
      <Drawer width={1500} title="编辑" component={Index} onSuccess={() => {
        re.current.close();
      }} ref={re} check={(value)=>{
        insertName(value);}}/>
    </>
  );
};
export default React.forwardRef(Editor);
