import React, {useState} from 'react';
import {Button, Image, Modal, Space} from 'antd';
import {useRequest} from '@/util/Request';
import jrQrcode from 'jr-qrcode';
import {config} from 'ice';
import {BarcodeOutlined, QrcodeOutlined} from '@ant-design/icons';
import AcBarcode from 'ac-barcode';


const Code = ({source, id,style, value}) => {

  const {code} = config;

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

  return (
    <>
      <Space>
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
      </Space>
      <Modal
        title='查看二维码'
        visible={show}
        destroyOnClose
        keyboard
        centered
        footer={null}
        onCancel={() => {
          setShow(false);
        }}
      >
        <div style={{margin: 'auto', maxWidth: 256}}>
          <Image src={jrQrcode.getQrBase64(value || `${code}?id=${codes}`)} preview={false} />
        </div>
        <div style={{textAlign: 'center'}}>
          {(value || codes) && <AcBarcode value={value || codes} />}
        </div>
      </Modal>
    </>
  );
};

export default Code;
