/**
 * 合同模板字段配置页
 *
 * @author
 * @Date 2021-07-21 08:22:02
 */

import React from 'react';
import {Input} from 'antd';
import Editor from '@/components/Editor';
import Select from '@/components/Select';
import {contractClassListSelect} from '@/pages/Crm/contract/components/contractClass/contractClassUrl';
import FileUpload from '@/components/FileUpload';

export const Name = (props) => {
  return (<Input   {...props} />);
};
export const Content = (props) => {
  return (<Editor module="contacts" placeholder="输入合同模板.."  {...props} />);
};

export const ContractClassId = (props) => {
  return (<Select api={contractClassListSelect} {...props} />);
};

export const UploadWord = (props) => {
  return (<FileUpload fileUpload title='上传合同' {...props} imageType={['DOC', 'DOCX', 'doc', 'docx']} prompt='支持格式：DOCX/DOC' />);
};
