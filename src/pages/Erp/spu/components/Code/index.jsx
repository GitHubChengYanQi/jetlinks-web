import React, {useEffect, useState} from 'react';
import {Button, Image, Modal, Space} from 'antd';
import {useRequest} from '@/util/Request';
import jrQrcode from 'jr-qrcode';
import {config} from 'ice';
import {BarcodeOutlined, QrcodeOutlined} from '@ant-design/icons';
import AcBarcode from 'ac-barcode';


const Code = ({source, id, style, value, image,codeWidth}) => {

  const {wxCp} = config;

  const [show, setShow] = useState();


  const [codes, setCodes] = useState(value);

  const {run} = useRequest(
    {
      url: '/orCode/backCode',
      method: 'POST',
    },
    {
      manual: true,
      onSuccess: (res) => {
        setCodes(res);
      }
    });

  useEffect(()=>{
    if (image){
      run({
        data: {
          source,
          id,
        }
      });
    }
  },[]);

  const img = () => {
    return <>
      <div style={{margin: 'auto', maxWidth: 256}}>
        <Image src={jrQrcode.getQrBase64(value ||  `${wxCp}OrCode?id=${codes}`)} preview={false} />
      </div>
      <div style={{textAlign: 'center'}}>
        {(value || codes) && <AcBarcode value={value || codes} />}
      </div>
    </>;
  };

  return (
    <>
      {image ? <div style={{margin: 'auto', maxWidth: codeWidth}}>
        <Image src={jrQrcode.getQrBase64(value || `${wxCp}OrCode?id=${codes}`)} preview={false} />
      </div> : <Space>
        <Button
          type="link"
          style={style}
          onClick={() => {
            if (!value) {
              run({
                data: {
                  source,
                  id,
                }
              });
            }
            setShow(true);
          }}
          icon={
            <QrcodeOutlined />
          }
        />
      </Space>}
      <Modal
        title="查看二维码"
        visible={show}
        destroyOnClose
        keyboard
        centered
        footer={null}
        onCancel={() => {
          setShow(false);
        }}
      >
        {img()}
      </Modal>
    </>
  );
};

export default Code;
