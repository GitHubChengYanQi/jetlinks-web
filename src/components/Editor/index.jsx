import React, {useEffect, useImperativeHandle, useState} from 'react';
import BraftEditor from 'braft-editor';
import {ContentUtils} from 'braft-utils'
import {Button, Upload} from 'antd';
import {
  FileImageOutlined
} from '@ant-design/icons';
import 'braft-editor/dist/index.css';

const Editor = ({onChange, onBlur, value, imgUploadProps, ...props}, ref) => {

  const [state, setState] = useState(null);

  const imgUploadHandler = (object) => {
    setState(
      ContentUtils.insertMedias(state, [{
        type: 'IMAGE',
        url: URL.createObjectURL
      }])
    );
  }

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
        >
          <Button type="text" icon={<FileImageOutlined/>}>
            插入图片
          </Button>
        </Upload>
      )
    });
  }

  useEffect(() => {
    BraftEditor.createEditorState(value);
  }, [value]);

  useImperativeHandle(ref, () => ({
      getState: () => {
        return state;
      },
      ...ContentUtils
    })
  );

  return (
    <BraftEditor
      className="my-editor"
      placeholder="请输入正文内容"
      value={state}
      onBlur={(content) => {
        onChange(content.toHTML());
      }}
      extendControls={extendControls}
      {...props}
    />
  );
};

export default React.forwardRef(Editor);
