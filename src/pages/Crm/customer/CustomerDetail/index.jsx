import React from 'react';
import {Card} from 'antd';
import Breadcrumb from '@/components/Breadcrumb';

import styles from './index.module.scss';

const CustomerDetail = () => {
  return (
    <div className={styles.detail}>
      <Card>
        <Breadcrumb />
      </Card>
    </div>

  );
};

export default CustomerDetail;
