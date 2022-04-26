import React, {useEffect, useRef, useState} from 'react';
import {config} from 'ice';
import {useRequest} from '@/util/Request';
import Import from '@/pages/Erp/sku/SkuTable/Import';
import Message from '@/components/Message';

const {baseURI} = config;

const SkuImport = ({
  tableRef,
  addRef,
  setEdit,
  successKey,
  setSuccessKey,
}) => {

  const ref = useRef();

  const [keys, setKeys] = useState([]);

  const {loading, run} = useRequest({url: '/sku/batchAdd', method: 'POST'}, {
    manual: true,
    onSuccess: () => {
      Message.success('保存成功！');
      tableRef.current.submit();
      ref.current.changeTable(keys);
    },
    onError: () => {
      Message.error('导入失败!');
    }
  });

  useEffect(() => {
    if (successKey !== null) {
      ref.current.changeTable([successKey]);
    }
  }, [successKey]);

  return <div>
    <Import
      onImport={() => {
        setSuccessKey(null);
      }}
      ref={ref}
      nextLoading={loading}
      checkbox
      url={`${baseURI}Excel/importSku`}
      title="导入物料"
      module="sku"
      onOk={() => {
        tableRef.current.submit();
      }}
      templateUrl={`${baseURI}api/SkuExcel`}
      onMerge={(data) => {

      }}
      onNext={(data) => {
        setKeys(data.map(item => item.key));
        run({
          data: {
            skuParams: data.map((item) => {
              const skuResult = item.simpleResult || {};
              const spuResult = skuResult.spuResult || {};
              const describe = item.describe || '';

              return {
                standard: item.standard,
                spuClass: skuResult.spuClass,
                spu: {id: skuResult.spuId, name: spuResult.name},
                skuName: skuResult.skuName,
                unitId: spuResult.unitId,
                batch: item.isNotBatch === '是' ? 1 : 0,
                specifications: item.specifications,
                sku: describe.split(',').map((item) => {
                  return {
                    label: item.split(':')[0],
                    value: item.split(':')[1],
                  };
                }),
              };
            })
          }
        });
      }}
      onAdd={(data) => {

      }}
    />
  </div>;
};

export default SkuImport;
