/**
 * 报修字段配置页
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

import React, {useEffect, useState} from 'react';
import UpLoadImg from '@/components/Upload';
import {Input, InputNumber, Modal, Select as AntSelect, Upload} from 'antd';
import Select from '@/components/Select';
import DatePicker from '@/components/DatePicker';
import {useRequest} from '@/util/Request';
import {PlusOutlined} from '@ant-design/icons';
import TreeSelect from '@/components/TreeSelect';
import Cascader from '@/components/Cascader';
import * as apiUrl from '../repairUrl';

export const CompanyId = (props) => {
  return (<Select api={apiUrl.companyIdSelect} {...props} />);
};
export const ItemImgUrl = (props) => {

  const {banner} = props;

  const banners = banner && banner.length > 0 && banner.map((items, index) => {
    return {
      uid: -index,
      name: items.title || null,
      url: items.imgUrl || null,
      type:items.imgUrl && items.imgUrl.split('.')[items.imgUrl.split('.').length-1],
    };
  });

  console.log(banner);

  const {data, run} = useRequest({url: '/media/getToken', method: 'GET'}, {manual: true});

  const [oss, setOss] = useState({});

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const [state, setState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
      // {

      // },
    ],
  });

  const handleCancel = () => setState({previewVisible: false});

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };


  const {previewVisible, previewImage, fileList, previewTitle} = state;

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );


  return (
    <>
      <Upload
        data={oss}
        action={oss.host}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={async ({fileList}) => {
          const imgs = [];
          for (let i = 0; i < fileList.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            const ossToken = await run(
              {
                params: {
                  type: fileList[0].type && fileList[0].type.split('/')[1]
                }
              }
            );
            setOss({...ossToken});
            imgs.push({imgUrl: `${ossToken.host}/${ossToken.key}`, title: '报修设备照片'});
          }
          props.onChange(imgs);

          setState({fileList});
        }}
      >
        {state.fileList && state.fileList.length >= 3 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{width: '100%'}} src={previewImage} />
      </Modal>
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
  return (<Cascader api={apiUrl.commonArea} {...props} placeholder="请选择地区" />);
};
export const City = (props) => {
  return (<TreeSelect api={apiUrl.commonArea} {...props} />);
};
export const Area = (props) => {
  return (<TreeSelect api={apiUrl.commonArea} {...props} />);
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
