import React, {useState} from 'react';
import {Button, Image, Modal} from 'antd';
import {useRequest} from '@/util/Request';
import jrQrcode from 'jr-qrcode';
import {config} from 'ice';
import {QrcodeOutlined} from '@ant-design/icons';


const Code = ({type, id}) => {

  const {code} = config;

  const [show, setShow] = useState();

  const [codes, setCodes] = useState();

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
      <Button type="link" onClick={() => {
        run({
          params: {
            type,
            id,
          }
        });
        setShow(true);
      }}
      icon={<QrcodeOutlined />}
      />
      <Modal
        visible={show}
        style={{maxWidth:270}}
        destroyOnClose
        keyboard
        centered
        closable={false}
        footer={null}
        onCancel={() => {
          setShow(false);
        }}
      >
        <div style={{margin:'auto',maxWidth:256}}>
          <Image src={jrQrcode.getQrBase64(`${code}?codes=${codes}`)} preview={false} />
        </div>
      </Modal>
    </>
  );
};

export default Code;
