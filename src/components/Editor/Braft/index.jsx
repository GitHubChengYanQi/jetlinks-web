import React, {useEffect, useImperativeHandle, useState} from 'react';
import BraftEditor from 'braft-editor';
import {ContentUtils} from 'braft-utils';
import {Button, Upload} from 'antd';
import {
  FileImageOutlined
} from '@ant-design/icons';
import 'braft-editor/dist/index.css';

const Braft = ({onChange, onBlur, value, imgUploadProps, ...props}, ref) => {

  const [state, setState] = useState(BraftEditor.createEditorState(""));

  const imgUploadHandler = (object) => {
    console.log(object);
    if (!object.file) {
      return false;
    }
    const {status, response} = object.file;
    if (status === 'done') {
      // message.success(`${object.file.name} 图片上传成功.`);
      setState(
        ContentUtils.insertMedias(state, [{
          type: 'IMAGE',
          url: response.data.fileSavePath
        }])
      );
      // ContentUtils.focus();
      // console.log(state.toHTML());
      onChange(state.toHTML());
    } else if (status === 'error') {
      // message.error(`${object.file.name} 图片上传失败.`);
      console.log('图片上传失败');
    }
  };

  const extendControls = [];
  if (imgUploadProps) {
    extendControls.push({
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload
          accept="image/*"
          showUploadList={false}
          {...imgUploadProps}
          onChange={imgUploadHandler}
          // customRequest={imgUploadHandler}
        >
          <Button type="text" icon={<FileImageOutlined/>}>
            插入图片
          </Button>
        </Upload>
      )
    });
  }

  useEffect(() => {
    // setState(BraftEditor.createEditorState(value));
    // console.log(props)
    if (value !== state.toHTML()) {
      setState(BraftEditor.createEditorState(value));
    }
  }, [value]);


  return (
    <BraftEditor
      className="my-editor"
      placeholder="请输入正文内容"
      value={state}
      onBlur={(content) => {
        onChange(content.toHTML());
      }}
      onChange={(editorState) => {

        setState(editorState);
      }}
      extendControls={extendControls}
      {...props}
    />
  );
};

export default React.forwardRef(Braft);
