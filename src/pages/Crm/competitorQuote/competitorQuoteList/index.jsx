/**
 * 竞争对手报价列表页
 *
 * @author
 * @Date 2021-09-06 16:08:01
 */

import React, {useRef, useState} from 'react';
import {Divider,Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import CompetitorTable from '@/pages/Crm/competitorQuote/components/competitorTable';


const CompetitorQuoteList = () => {

  const [status, setStatus] = useState();

  const Left = () => {
    return (
      <>
        <Tree
          onSelect={(value) => {
            setStatus(value);
          }}
          showLine
          defaultExpandedKeys={['']}
          treeData={[
            {
              title: '报价分类',
              key: '',
              children: [
                {
                  title: '我的报价',
                  key: '0',
                },
                {
                  title: '对手报价',
                  key: '1',
                },
              ],
            },
          ]}
        />
        <Divider />
      </>);
  };

  return (
    <ListLayout left={Left()}>
      <CompetitorTable status={status} />
    </ListLayout>
  );
};

export default CompetitorQuoteList;
