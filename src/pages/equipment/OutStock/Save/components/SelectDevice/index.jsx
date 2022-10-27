import React, {useEffect, useRef, useState} from 'react';
import Modal from '@/components/Modal';
import InStock from '@/pages/equipment/InStock';
import Save from '@/pages/equipment/OutStock/Save';

const SelectDevice = ({
  visible,
  success = () => {
  },
  close = () => {
  },
}) => {

  const ref = useRef();

  const [saveVisible, setSaveVisible] = useState(null);

  useEffect(() => {
    if (visible) {
      ref.current.open(false);
    } else {
      ref.current.close();
    }
  }, [visible]);

  return <>
    <Modal
      onClose={close}
      width={1200}
      headTitle="选择设备"
      ref={ref}
    >
      <InStock select onChange={(devices) => {
        setSaveVisible(devices);
      }}/>
    </Modal>

    <Save
      visible={saveVisible}
      close={() => setSaveVisible(null)}
      data={saveVisible || {}}
      success={() => {
        setSaveVisible(null);
        success();
      }}
    />
  </>;
};

export default SelectDevice;
