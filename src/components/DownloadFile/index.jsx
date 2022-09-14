import React, {useState} from 'react';
import {Button} from 'antd';
import {config} from 'ice';
import {useRequest} from '@/util/Request';

export const filePreview = '/system/filePreview';
export const preview = {url: '/rest/system/preview', method: 'GET'};

const {baseURI} = config;

const DownloadFile = (
  {
    fileId,
    fileName,
  }
) => {

  const [file,setFile] = useState();
  console.log(file);
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const {run} = useRequest(preview, {
    manual: true,
    onSuccess: async (res) => {
      const img = await getBase64(new Blob([res]));
      setFile(img);
      // const eleLink = document.createElement('a');
      // eleLink.download = fileName;
      // eleLink.style.display = 'none';
      // // 字符内容转变成blob地址
      // const blob = new Blob([res]);
      // eleLink.href = URL.createObjectURL(blob);
      // // 自动触发点击
      // document.body.appendChild(eleLink);
      // eleLink.click();
      // // 然后移除
      // document.body.removeChild(eleLink);

    }
  });


  return <>
    <Button className="blue" type="link" onClick={() => {
      if (fileId) {
        run({params: {fileId}});
      }
    }}>
      查看
    </Button>
  </>;
};

export default DownloadFile;
