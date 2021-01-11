import React from 'react';

import moment from 'moment';
import styles from './index.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.logo}>AtSoft</p>
      <p className={styles.copyright}>© 2019 - {moment().year()}</p>
    </div>
  );
}
