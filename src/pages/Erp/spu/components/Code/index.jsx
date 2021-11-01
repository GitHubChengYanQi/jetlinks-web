import React, {useState} from 'react';
import {Button, Image, Modal, Space} from 'antd';
import {useRequest} from '@/util/Request';
import jrQrcode from 'jr-qrcode';
import {config} from 'ice';
import {BarcodeOutlined, QrcodeOutlined} from '@ant-design/icons';
import AcBarcode from 'ac-barcode';


const Code = ({source, id,value}) => {

  const {code} = config;

  const [show, setShow] = useState();

  const [visible, setVisible] = useState();

  const [codes, setCodes] = useState(value);

  const {run} = useRequest(
    {
      url: '/orCode/backCode',
      method: 'GET',
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
          onClick={() => {
            if (!value){
              run({
                params: {
                  source,
                  id,
                }
              });
            }
            setShow(true);
          }}
          icon={
            <>
              <BarcodeOutlined />
              <QrcodeOutlined />
            </>
          }
        />
      </Space>
      <Modal
        visible={show}
        destroyOnClose
        keyboard
        centered
        closable={false}
        footer={null}
        onCancel={() => {
          setShow(false);
        }}
      >
        <div style={{margin: 'auto', maxWidth: 256}}>
          <Image src={jrQrcode.getQrBase64(`${code}?codes=${value || codes}`)} preview={false} />
        </div>
        <div style={{textAlign:'center'}}>
          {value || codes && <AcBarcode value={value || codes} />}
        </div>
      </Modal>
    </>
  );
};

export default Code;
