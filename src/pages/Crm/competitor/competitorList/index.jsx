import React, {useState} from 'react';
import {Divider, Spin, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import CompetitorTable from '@/pages/Crm/competitor/components/CompetitorTable';


const CompetitorList = () => {




  const [competitionLevel, setCompetitionLevel] = useState();


  const Left = () => {
    return (
      <>
        <Tree
          onSelect={(value) => {
            setCompetitionLevel(value);
          }}
          showLine
          // switcherIcon={<DownOutlined />}
          defaultExpandedKeys={[' ']}
          // onSelect={this.onSelect}
          treeData={[
            {
              title: '所有竞争级别',
              key: ' ',
              children: [
                {
                  title: '低',
                  key: '1',
                },
                {
                  title: '中',
                  key: '2',
                },
                {
                  title: '高',
                  key: '3',
                },
              ],
            },
          ]}
        />
        <Divider />
      </>);
  };
  return (
    <ListLayout >
      <CompetitorTable left={Left()} competitionLevel={competitionLevel}  />
    </ListLayout>
  );
};
export default CompetitorList;
