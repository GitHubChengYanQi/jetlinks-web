import React, {useEffect, useImperativeHandle, useState} from 'react';
import BraftEditor from 'braft-editor';
import {ContentUtils} from 'braft-utils';
import {Button, Upload} from 'antd';
import {
  FileImageOutlined
} from '@ant-design/icons';
import 'braft-editor/dist/index.css';

const Editor = ({onChange, onBlur, value, imgUploadProps, ...props}, ref) => {

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
  const insertSelect = () => {
    const tmpState = ContentUtils.insertHTML(state, '<strong class="123">|下拉列表...|</strong>');
    onChange(tmpState.toHTML());
    setState(
      state
    );
  };
  const insertInput = () => {
    const tmpState = ContentUtils.insertHTML(state, '<em>|文本框...|</em>');
    onChange(tmpState.toHTML());
    setState(
      state
    );
  };
  const insertNumber = () => {
    const tmpState = ContentUtils.insertHTML(state, '<sub>|数字输入框...|</sub>');
    onChange(tmpState.toHTML());
    setState(
      state
    );
  };
  const insertDate = () => {
    const tmpState = ContentUtils.insertHTML(state, '<sup>|时间框...|</sup>');
    onChange(tmpState.toHTML());
    setState(
      state
    );
  };




  const extendControls = [
    {
      key: 'my-input', // 控件唯一标识，必传
      type: 'button',
      title: '文字输入框', // 指定鼠标悬停提示文案
      className: 'my-button', // 指定按钮的样式名
      text: '文字输入框', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
      onClick:()=>insertInput()
    },
    {
      key: 'my-date', // 控件唯一标识，必传
      type: 'button',
      title: '时间框', // 指定鼠标悬停提示文案
      className: 'my-button', // 指定按钮的样式名
      text: '时间框', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
      onClick:()=>insertDate()
    },
    {
      key: 'my-number', // 控件唯一标识，必传
      type: 'button',
      title: '数字框', // 指定鼠标悬停提示文案
      className: 'my-button', // 指定按钮的样式名
      text: '数字框', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
      onClick:()=>insertNumber()
    },
    {
      key: 'my-select', // 控件唯一标识，必传
      type: 'button',
      title: '下拉列表', // 指定鼠标悬停提示文案
      className: 'my-button', // 指定按钮的样式名
      text: '下拉列表', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
      onClick:()=>insertSelect()
    }
  ];
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
          <Button type="text" icon={<FileImageOutlined />}>
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

    />
  );
};

export default React.forwardRef(Editor);
