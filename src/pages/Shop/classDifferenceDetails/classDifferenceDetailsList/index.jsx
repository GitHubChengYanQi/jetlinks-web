import React, {useEffect, useRef, useState} from 'react';
import {Button, Divider, Tree} from 'antd';
import ListLayout from '@/layouts/ListLayout';
import {useRequest} from '@/util/Request';
import BannerTable from '@/pages/Portal/banner/components/BannerTable';
import Select from '@/components/Select';
import {
  classDifferenceListSelect,
  daoxinPortalClass
} from '@/pages/Shop/classDifferenceDetails/classDifferenceDetailsUrl';
import ClassDifferenceDatailsTable from '@/pages/Shop/classDifferenceDetails/components/ClassDifferenceDatailsTable';
import Modal from '@/components/Modal';
import ClassDifferenceList from '@/pages/Shop/classDifference/classDifferenceList';
import {useParams} from 'ice';
import ProSkeleton from '@ant-design/pro-skeleton';


const ClassDifferenceDetailsList = () => {

  const ref = useRef(null);

  const params = useParams();
  const {loading, data: classData, run: classRun, refresh} = useRequest(daoxinPortalClass, {
    defaultParams: {
      data: {
        classId: params.cid
      }
    }
  });
  const {loading: loag, data, run} = useRequest({
    url: '/classDifference/list',
    method: 'POST',
    rowKey: 'classDifferenceId',
    data: {classId: params.cid}
  });

  const classDifference = data ? data.map((values) => {
    return {
      title: values.title,
      key: values.classDifferenceId,
    };
  }) : [];

  const [classDifferenceId, setClassDifferenceId] = useState();


  if (loading || loag) {
    return (<ProSkeleton type="descriptions" />);
  }

  if (!loag && classDifferenceId === undefined) {
    setClassDifferenceId(classDifference.length > 0 ? classDifference[0].key : '000');
  }

  const Left = () => {
    return (
      <>
        <Button style={{width: '100%', marginBottom: 20}} onClick={() => {
          ref.current.open(params.cid);
        }}>
          编辑标题
        </Button>
        <Modal component={ClassDifferenceList} width={800} ref={ref} onClose={() => {
          run();
        }} />
        <Tree
          onSelect={(value) => {
            setClassDifferenceId(value[0]);
          }}
          showLine
          defaultSelectedKeys={[classDifference.length > 0 ? classDifference[0].key : ' ']}
          treeData={classDifference}
        />
        <Divider />
      </>);
  };
  return (
    <ListLayout left={Left()}>
      <ClassDifferenceDatailsTable classDifferenceId={classDifferenceId} />
    </ListLayout>
  );
};
export default ClassDifferenceDetailsList;
