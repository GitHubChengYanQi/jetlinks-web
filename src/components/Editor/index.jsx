import React, {useEffect, useRef, useState} from 'react';
import ReactWEditor from 'wangeditor-for-react';
import {Card} from 'antd';

const Editor = ({onChange, onBlur, value, template, placeholder, imgUploadProps, type, ...props}, ref) => {

  const editorRef = useRef(null);

  const [tagNumber, setTagNumber] = useState({});

  const CardGridStyle = () => {
    switch (type) {
      case 'PHYSICALDETAIL':
        return {
          cursor: 'pointer',
          padding: 8,
          width: '25%'
        };
      case 'inkindDetail':
        return {
          cursor: 'pointer',
          padding: 8,
          width: '25%'
        };
      case 'POSITIONS':
        return {
          cursor: 'pointer',
          padding: 8,
          width: '50%'
        };
      case 'contacts':
        return {
          cursor: 'pointer',
          padding: 8,
          width: '20%'
        };
      default:
        return null;
    }
  };

  const defaultNumbers = (text) => {
    const number = [];
    for (let i = 0; true; i++) {
      const index = value.indexOf(text, number[i - 1] + 1 || 0);
      if (index === -1) {
        break;
      }
      number.push(index);
    }
    return number.length;
  };


  useEffect(() => {
    if (template)
      setTagNumber({
        inp: defaultNumbers('class="inp"'),
        number: defaultNumbers('class="number"'),
      });
  }, []);

  const insertHtml = (type, number) => {
    switch (type) {
      case 'inp':
        return `<input class='inp' key=${number} placeholder="文本框" disabled />`;
      case 'number':
        return `<input class="number" key=${number} placeholder="数字框" disabled />`;
      case 'date':
        return `<input class="date" key=${number} placeholder="时间框" disabled/>`;
      case 'customer':
        return `<input class="customer" key=${number} placeholder="客户" disabled/>`;
      case 'sku':
        return `<input class="sku" key=${number} placeholder="物料"  disabled/>`;
      case 'Acontacts':
        // eslint-disable-next-line no-template-curly-in-string
        return '${{Acontacts}}';
      case 'Bcontacts':
        // eslint-disable-next-line no-template-curly-in-string
        return '${{Bcontacts}}';
      case 'AAddress':
        // eslint-disable-next-line no-template-curly-in-string
        return '${{AAddress}}';
      case 'BAddress':
        // eslint-disable-next-line no-template-curly-in-string
        return '${{BAddress}}';
      case 'APhone':
        // eslint-disable-next-line no-template-curly-in-string
        return '${{APhone}}';
      case 'BPhone':
        // eslint-disable-next-line no-template-curly-in-string
        return '${{BPhone}}';
      case 'ACustomer':
        // eslint-disable-next-line no-template-curly-in-string
        return '${{ACustomer}}';
      case 'BCustomer':
        // eslint-disable-next-line no-template-curly-in-string
        return '${{BCustomer}}';
      case 'package':
        return `<input class="package" key=${number} placeholder="套餐"  disabled/>`;
      default:
        break;
    }
  };

  const editorCmd = (type, number) => {
    editorRef.current.editor.cmd.do('insertHTML', insertHtml(type, number));
  };

  const tagClick = (type) => {
    let number = 0;
    switch (type) {
      case 'inp':
        if (tagNumber.inp !== undefined) {
          number = tagNumber.inp + 1;
        }
        setTagNumber({
          ...tagNumber,
          inp: number,
        });
        break;
      case 'number':
        if (tagNumber.number !== undefined) {
          number = tagNumber.number + 1;
        }
        setTagNumber({
          ...tagNumber,
          number,
        });
        break;
      case 'date':
        if (tagNumber.date !== undefined) {
          number = tagNumber.date + 1;
        }
        setTagNumber({
          ...tagNumber,
          date: number,
        });
        break;
      case 'customer':
        if (tagNumber.customer !== undefined) {
          number = tagNumber.customer + 1;
        }
        setTagNumber({
          ...tagNumber,
          customer: number,
        });
        break;
      case 'sku':
        if (tagNumber.sku !== undefined) {
          number = tagNumber.sku + 1;
        }
        setTagNumber({
          ...tagNumber,
          sku: number,
        });
        break;
      case 'package':
        if (tagNumber.package !== undefined) {
          number = tagNumber.package + 1;
        }
        setTagNumber({
          ...tagNumber,
          package: number,
        });
        break;
      default:
        break;
    }
    editorCmd(type, number);
  };

  const templateType = () => {
    switch (type) {
      case 'PHYSICALDETAIL':
        return <Card>
          <Card.Grid style={CardGridStyle()} onClick={() =>
            // eslint-disable-next-line no-template-curly-in-string
            editorRef.current.editor.cmd.do('insertHTML', '${name}')
          }>物料名称</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() =>
            // eslint-disable-next-line no-template-curly-in-string
            editorRef.current.editor.cmd.do('insertHTML', '${brand}')
          }>供应商(品牌)</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() =>
            // eslint-disable-next-line no-template-curly-in-string
            editorRef.current.editor.cmd.do('insertHTML', '${number}')
          }>数量</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() =>
            // eslint-disable-next-line no-template-curly-in-string
            editorRef.current.editor.cmd.do('insertHTML', '${qrCode}')
          }>二维码</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() =>
            // eslint-disable-next-line no-template-curly-in-string
            editorRef.current.editor.cmd.do('insertHTML', '${coding}')
          }>实物编码</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() =>
            // eslint-disable-next-line no-template-curly-in-string
            editorRef.current.editor.cmd.do('insertHTML', '${skuCoding}')
          }>物料编码</Card.Grid>
        </Card>;
      case 'POSITIONS':
        return <Card>
          <Card.Grid style={CardGridStyle()} onClick={() =>
            // eslint-disable-next-line no-template-curly-in-string
            editorRef.current.editor.cmd.do('insertHTML', '${name}')
          }>库位名称</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() =>
            // eslint-disable-next-line no-template-curly-in-string
            editorRef.current.editor.cmd.do('insertHTML', '${qrCode}')
          }>二维码</Card.Grid>
        </Card>;
      case 'contacts':
        return <Card>
          <Card.Grid style={CardGridStyle()} onClick={() => tagClick('inp')}>文本框</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() => tagClick('number')}>数字框</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() => tagClick('date')}>时间框</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() => tagClick('customer')}>客户</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() => tagClick('Acontacts')}>甲方联系人</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() => tagClick('Bcontacts')}>乙方联系人</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() => tagClick('AAddress')}>甲方地址</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() => tagClick('BAddress')}>乙方地址</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() => tagClick('APhone')}>甲方电话</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() => tagClick('BPhone')}>乙方电话</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() => tagClick('ACustomer')}>甲方客户</Card.Grid>
          <Card.Grid style={CardGridStyle()} onClick={() => tagClick('BCustomer')}>乙方客户</Card.Grid>
        </Card>;
      default:
        return null;
    }
  };

  return (
    <>
      {templateType()}
      <br />
      <ReactWEditor
        placeholder={placeholder}
        ref={editorRef}
        defaultValue={value}
        linkImgCallback={(src, alt, href) => {
          // 插入网络图片的回调事件
          console.log('图片 src ', src);
          console.log('图片文字说明', alt);
          console.log('跳转链接', href);
        }}
        onlineVideoCallback={(video) => {
          // 插入网络视频的回调事件
        }}
        onChange={(html) => {
          onChange(html);
        }}
        onBlur={(html) => {
          // onChange(html);
        }}
        onFocus={(html) => {
        }}
        {...props}
      />

    </>
  );
};
export default React.forwardRef(Editor);
