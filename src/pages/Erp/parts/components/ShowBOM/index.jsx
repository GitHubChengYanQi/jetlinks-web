import React, {useEffect, useState} from 'react';
import {Button, Card, Space, Spin} from 'antd';
import {getSearchParams, useHistory} from 'ice';
import WorkFlow from '@/pages/Erp/parts/components/ShowBOM/WorkFlow';
import {useRequest} from '@/util/Request';
import {partsGetBom} from '@/pages/Erp/parts/PartsUrl';
import Breadcrumb from '@/components/Breadcrumb';

const ShowBOM = ({value:partsId}) => {

  const params = getSearchParams();

  const [value, onChange] = useState();

  const history = useHistory();

  const getParts = (data) => {
    if (!Array.isArray(data)) {
      return null;
    }
    if (data.length > 1) {
      return {
        childNode: {
          type: '4',
          conditionNodeList: data.map((item) => {
            return {
              type: '3',
              sku: {
                skuResult: item.skuResult,
                number:item.number,
                note:item.note,
              },
              ...getParts(item.partsResult.parts)
            };
          })
        }
      };
    } else if (data.length === 1) {
      return {
        childNode: {
          type: '1',
          sku: {
            skuResult: data[0].skuResult,
            number:data[0].number,
            note:data[0].note,
          },
          ...getParts(data[0].partsResult.parts)
        }
      };
    }
  };

  const getBom = (data) => {
    const config = {
      'pkId': 'start',
      nodeName: '物料主体',
      'startSku': {
        skuResult: data.skuResult
      },
      'type': '0',
      ...getParts(data.parts),
    };

    onChange(config);

  };

  const {loading, run} = useRequest(partsGetBom, {
    manual: true,
    onSuccess: (res) => {
      getBom(res);
    }
  });

  useEffect(() => {
    if (params.id || partsId) {
      run({
        params: {
          partId: params.id || partsId,
          type:params.type,
        }
      });
    }
  }, []);

  return <>
    <Card
      title={<Breadcrumb title='物料BOM' />}
      headStyle={{display:partsId && 'none'}}
      bodyStyle={{padding: 0}}
      extra={<Space>
        <Button onClick={() => {
          history.push('/SPU/parts');
        }}>返回</Button>
      </Space>}
    />
    <Card
      style={{height: '90vh', overflowY: 'auto'}}
    >
      {
        loading ?
          <div style={{textAlign: 'center'}}>
            <Spin size="large" />
          </div>
          :
          <WorkFlow value={value} />
      }
    </Card>
  </>;
};

export default ShowBOM;
