/**
 * sop主表字段配置页
 *
 * @author song
 * @Date 2022-02-10 09:21:35
 */

import React from 'react';
import {Input} from 'antd';
import FileUpload from '@/components/FileUpload';

export const Coding = (props) =>{
  return (<Input {...props}/>);
};
export const ShipSetpId = (props) =>{
  return (<Input {...props}/>);
};
export const Name = (props) =>{
  return (<Input {...props}/>);
};
export const VersionNumber = (props) =>{
  return (<Input {...props}/>);
};
export const CreateUser = (props) =>{
  return (<Input {...props}/>);
};
export const UpdateUser = (props) =>{
  return (<Input {...props}/>);
};

export const Image = (props) =>{
  return (<div style={{maxWidth:250}}><FileUpload title='上传示例图' maxCount={1} {...props}/></div>);
};

export const Instructions = (props) =>{
  return (<Input.TextArea rows={1} {...props}/>);
};

export const Note = (props) =>{
  return (<Input.TextArea rows={4} {...props}/>);
};

export const AlterWhy = (props) =>{
  return (<Input.TextArea rows={4} {...props}/>);
};

export const FinishedPicture = (props) =>{
  return (<FileUpload title='上传成品图' {...props}/>);
};
