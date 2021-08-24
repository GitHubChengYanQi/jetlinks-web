/**
 * 报修字段配置页
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

import React, {useEffect, useState} from 'react';
import UpLoadImg from '@/components/Upload';
import {Input, InputNumber, Select as AntSelect, Upload} from 'antd';
import Select from '@/components/Select';
import DatePicker from '@/components/DatePicker';
import {useRequest} from '@/util/Request';
import * as apiUrl from '../repairUrl';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';

export const CompanyId = (props) => {
  return (<Select api={apiUrl.companyIdSelect} {...props} />);
};
export const ItemImgUrl = (props) => {

  const [loading, setLoading] = useState(false); // loading 状态
  const [oss, setOss] = useState({}); // OSS上传所需参数
  const [imageUrl ,setImageUrl ] = useState([]); // 图片地址



  const [fileList, setFileList] = useState([]);


  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };


  // 上传前获取上传OSS所需参数 - 传入上传文件类型："png", "jpg", "gif", "mp4", "mp3","flac"
  const beforUpLoad = (imgType) => {
    setLoading(true);
    return new Promise((resolve) => {
      getOssObj({params: {type: imgType}}).then(res => {
        resolve();
      });
    });
  };

  const getSTSToken = {
    url: '/media/getToken', // 获取OSS凭证接口
    data: {}
  };

  // 获取OSS配置
  const {run: getOssObj} = useRequest(getSTSToken, {
    manual: true,
    formatResult: (e) => {
      return e;
    },
    onSuccess: (res) => {
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

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };


  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        data={oss}
        multiple
        maxCount={3}
        action={oss.host}
        onPreview={onPreview}
        beforeUpload={(file) => {
          return beforUpLoad(file.type.split('/')[1]);
        }
        }
        onChange={(event) => {
          onChange(event);
          setImageUrl(`${oss.host}/${oss.key}`);
        }
        }
      >
        {fileList.length < 3 && uploadButton}
      </Upload>
    </>
  );
};
export const Items = (props) => {
  return (<Select api={apiUrl.itemIdSelect} {...props} />);
};
export const ItemId = (props) => {

  const {repair, state} = props;


  const delivery = repair ? repair.map((value, index) => {
    return {
      label: value.itemsResult.name,
      value: value.deliveryDetailsId
    };
  }) : null;

  if (state) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      props.onChange(null);
    }, [repair]);
  }


  return (<AntSelect options={delivery}  {...props} />);
};
export const ServiceType = (props) => {
  return (<AntSelect style={{width: 200}} options={[{label: '设备项修', value: '设备项修'}]} {...props} />);
};
export const ExpectTime = (props) => {
  return (<DatePicker {...props} />);
};
export const Comment = (props) => {
  return (<Input.TextArea {...props} />);
};

export const Money = (props) => {
  return (<InputNumber {...props} />);
};
export const QualityType = (props) => {
  return (<AntSelect
    style={{width: 200}}
    options={[{label: '质保内', value: '质保内'}, {label: '质保外', value: '质保外'}]}  {...props} />);
};
export const ContractType = (props) => {
  return (<AntSelect
    style={{width: 200}}
    options={[{label: '合同内', value: '合同内'}, {label: '合同外', value: '合同外'}]} {...props} />);
};

export const CustomerId = (props) => {

  const {customerId, onChange} = props;


  const {loading, data, run} = useRequest({
    ...apiUrl.delivery,
    data: {}
  });


  const delivery = data ? data.map((value, index) => {
    return {
      label: value.customerResult.customerName,
      value: value.customerId
    };
  }) : null;


  return (<AntSelect options={delivery} loading={loading} {...props} onChange={(value) => {
    onChange(value);
    customerId(value);
  }} />);

};
export const ImgUrl = (props) => {
  return (<UpLoadImg {...props} />);
};
export const Province = (props) => {
  return (<Input {...props} />);
};
export const City = (props) => {
  return (<Input {...props} />);
};
export const Area = (props) => {
  return (<Input {...props} />);
};
export const Address = (props) => {
  return (<Input {...props} />);
};
export const People = (props) => {
  return (<Input {...props} />);
};
export const Position = (props) => {
  return (<Input {...props} />);
};
export const Telephone = (props) => {
  return (<Input {...props} />);
};
