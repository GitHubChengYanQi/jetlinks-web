import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Modal as AntdModal} from 'antd';

const Modal = (
  {
    title,
    modal,
    component: Component,
    width,
    className,
    destroyOnClose = true,
    headTitle,
    loading = () => {
    },
    afterClose = () => {
    },
    footer,
    padding = 0,
    onSuccess = () => {
    },
    onClose = () => {
    },
    compoentRef,
    children,
    zIndex,
    wrapClassName = '',
    ...props
  }, ref) => {

  const [value, show] = useState(null);

  if (modal !== undefined) {
    show(false);
  }

  const open = (value) => {
    show(value);
  };

  const close = () => {
    show(null);
  };

  useImperativeHandle(ref, () => ({
    open,
    close
  }));


  const visible = value !== null && value !== undefined;

  const [simpleClass] = useState(Math.random()
    .toString(36)
    .substring(2));


  let modalContent;
  let sumX = 0;
  let sumY = 0;
  let deltaX = 0;
  let deltaY = 0;
  let mouseDownX = 0;
  let mouseDownY = 0;
  // const [sumX,setSumX] = useState(0);

  const initialEvent = (visible) => {
    setTimeout(() => {
      window.removeEventListener('mouseup', removeUp, false);

      const contain = document.getElementsByClassName(simpleClass)[0];
      if (!contain) {
        return;
      }
      const header = contain.getElementsByClassName('ant-modal-header')[0];
      if (
        header
      ) {
        modalContent = contain.getElementsByClassName('ant-modal-content')[0];

        header.style.cursor = 'all-scroll';
        header.onmousedown = (e) => {
          mouseDownX = e.pageX;
          mouseDownY = e.pageY;
          document.body.onselectstart = () => false;
          window.addEventListener('mousemove', handleMove, false);
        };

        window.addEventListener('mouseup', removeUp, false);
      }

    }, 0);
  };

  const handleMove = (event) => {
    deltaX = event.pageX - mouseDownX;
    deltaY = event.pageY - mouseDownY;
    // if ((deltaY + sumY) <= 0) {
    //   return;
    // }
    modalContent.style.transform = `translate(${deltaX + sumX}px, ${deltaY + sumY}px)`;
  };

  const removeMove = () => {
    window.removeEventListener('mousemove', handleMove, false);
  };

  const removeUp = () => {
    document.body.onselectstart = () => true;

    sumX = sumX + deltaX;
    sumY = sumY + deltaY;
    deltaX = 0;
    deltaY = 0;

    removeMove();
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        initialEvent(true);
      }, 0);

    }
  }, [visible]);

  const wrapModalClassName = wrapClassName ? `${wrapClassName} ${simpleClass}` : `${simpleClass}`;

  return (
    <AntdModal
      className={className}
      open={visible}
      afterClose={afterClose}
      footer={footer || null}
      centered
      maskClosable={false}
      onCancel={() => {
        show(null);
        onClose();
      }}
      bodyStyle={{padding: 0}}
      width={width}
      zIndex={zIndex}
      title={headTitle || (title && (value ? `编辑${title}` : `添加${title}`))}
      destroyOnClose={destroyOnClose}
      wrapClassName={wrapModalClassName}
    >
      <div style={{
        maxHeight: footer ? 'calc(100vh - 110px)' : 'calc(100vh - 55px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding
      }}>
        {Component ? <Component
          {...props}
          ref={compoentRef}
          value={value}
          loading={(load) => {
            loading(load);
          }}
          onSuccess={(response, action) => {
            onSuccess(response, action);
          }}
          onError={() => {
          }}
        /> : children}
      </div>
    </AntdModal>
  );
};


export default forwardRef(Modal);
