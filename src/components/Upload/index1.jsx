import React, {useState} from 'react';
import {Upload as UploadS, message, Modal} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {useRequest} from '@/util/Request';
import {useRequest as aUseRequest} from 'ahooks';
import axios from 'axios';

const Upload = (props) => {

  const {value,onChange} = props;

  const {data,run} = useRequest({url:'/media/getToken?type=jpeg',method:'GET'},{manual:true});


  const {data:da,run:upload} = aUseRequest(axios,{manual:true});


  const getBase64 = (img, callback) =>  {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = async (file) =>{
    const response = await run();
    const res = await upload({
      withCredentials:false,
      url:response.host.replace('https','http'),
      method:'POST',
      data:{
        ...response,
        file
      }
    });
    console.log(res);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const [loading, setLoging] = useState(false);
  const [imageUrl, setImgurl] = useState(value);

  onChange(imageUrl);

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoging(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
         setImgurl(imageUrl);
         setLoging(false);
        }
      );
    }
  };


  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );

  return (
    <>
      <UploadS
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        // action={
        //   (file)=>upload({
        //     url:data.host,
        //     method:'POST',
        //     data:{
        //       ...data,
        //       file
        //     }
        //   })
        // }
        method='GET'
        beforeUpload={beforeUpload}
        onChange={(value)=>handleChange(value)}
      >
        {imageUrl ? <img  src={imageUrl} alt="avatar" style={{width: '100%'}} /> : uploadButton}
      </UploadS>
    </>
  );
};

export default Upload;
