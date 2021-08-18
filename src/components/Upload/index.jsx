import React, {useState,useEffect} from 'react';
import { Upload, message } from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {useRequest} from '@/util/Request';


const  UpLoadImg = (props)=>{
  const {value,onChange,bannerSrc} = props;
  const [loading,setLoading] = useState(false); // loading 状态
  const [imageUrl ,setImageUrl ] = useState(''); // 图片地址
  const [oss,setOss] = useState({}); // OSS上传所需参数

  useEffect(()=>{
    console.log('picId', value);
    if(value){
      // getImgDetail({data:{bannerId:value}});
      setImageUrl(value);
    }else{
      setImageUrl('');
    }
  },[value]);

  // 上传前获取上传OSS所需参数 - 传入上传文件类型："png", "jpg", "gif", "mp4", "mp3","flac"
  const beforUpLoad = (imgType) =>{
    setLoading(true);
    return new Promise((resolve)=>{
      getOssObj({params:{type:imgType}}).then(res=>{
        resolve();
      });
    });
  };

  const getSTSToken = {
    url: '/media/getToken', // 获取OSS凭证接口
    data:{}
  };

  const getImg = {
    url: '/banner/detail', // 根据ID获取图片
    method:'POST',
    data:{}
  };

  // 获取OSS配置
  const {run:getOssObj} = useRequest(getSTSToken,{
    manual:true,
    formatResult: (e) => {
      return e;
    },
    onSuccess: (res) => {
      console.log(res);
      if (res.errCode === 0) {
        oss.key = res.data.key;
        oss.host = res.data.host;
        oss.policy = res.data.policy;
        oss.Signature = res.data.Signature;
        oss.mediaId = res.data.mediaId;
        oss.OSSAccessKeyId = res.data.OSSAccessKeyId;
        setOss({...oss});
      }
      setLoading(false);
    }
  });

  // // 获取图片
  // const {run:getImgDetail} = useRequest(getImg,{
  //   manual:true,
  //   formatResult: (e) => {
  //     return e;
  //   },
  //   onSuccess: (res) => {
  //     console.log(res,'eee');
  //     if (res.errCode === 0) {
  //       setTimeout(()=>{
  //         setImageUrl(res.data.picUrl);
  //       },500);
  //     }
  //   }
  // });

  // 按钮
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return(
    // name 为发送到后台的文件名
    <Upload
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      data={oss}
      action={oss.host}
      beforeUpload={(file)=>{
        return beforUpLoad(file.type.split('/')[1]);
      }
      }
      onChange={({event})=>{
        if (event && event.percent >= 100) {
          setImageUrl(`${oss.host}/${oss.key}`);
          typeof onChange ==='function' && onChange(`${oss.host}/${oss.key}`);
        }
      }
      }
    >
      {imageUrl ? <img src={imageUrl} alt="" style={{ width: '100%', height:'100%' }} /> : uploadButton}
    </Upload>
  );
};

export default UpLoadImg;