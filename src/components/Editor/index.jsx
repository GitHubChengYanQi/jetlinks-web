import React, {useEffect, useRef} from 'react';
import ReactWEditor from 'wangeditor-for-react';

const Editor = ({onChange, onBlur, value, imgUploadProps, ...props}, ref) => {

  const editorRef = useRef(null);

  useEffect(() => {
    if(editorRef.current){
      console.log(editorRef.current);
      editorRef.current.editor.txt.html(value);
    }

  }, [value]);

  return (
    <ReactWEditor
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
  );
};
export default React.forwardRef(Editor);
