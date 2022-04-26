import React, {useState} from 'react';
import {config} from 'ice';
import {useRequest} from '@/util/Request';
import Import from '@/pages/Erp/sku/SkuTable/Import';
import Message from '@/components/Message';

const {baseURI} = config;


const SkuImport = ({
  tableRef,
  addRef
}) => {

  const [keys, setKeys] = useState([]);

  const {loading, run} = useRequest({url: '/sku/batchAdd', method: 'POST'}, {
    manual: true,
    onSuccess: () => {
      Message.success('导入成功！');
    },
    onError: () => {
      Message.error('导入失败!');
    }
  });

  return <div>
    <Import
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
        const skuData = data.simpleResult || {};

        const describe = [];
        data.describe.split(',').map((item) => {
          return describe.push({
            label: item.split(':')[0],
            value: item.split(':')[1],
          });
        });

        skuData.list.map((item) => {
          return describe.push({
            label: item.itemAttributeResult && item.itemAttributeResult.attribute,
            value: item.attributeValues,
          });
        });

        addRef.current.open({
          ...skuData,
          newCoding: data.standard,
          merge: true,
          defaultValue: {
            sku: describe
          }
        });
      }}
      onNext={(data) => {
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
        const describe = data.describe || '';
        addRef.current.open({
          defaultValue: {
            standard: data.standard,
            spu: {name: data.classItem},
            skuName: data.skuName,
            batch: data.isNotBatch === '是' ? 1 : 0,
            specifications: data.specifications,
            sku: describe.split(',').map((item) => {
              return {
                label: item.split(':')[0],
                value: item.split(':')[1],
              };
            }),
          }
        });
      }}
    />
  </div>;
};

export default SkuImport;
