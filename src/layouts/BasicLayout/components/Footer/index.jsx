import React from 'react';
import { config } from 'ice';
import moment from 'moment';
import styles from './index.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.logo}>{config.projectName}</p>
      <p className={styles.copyright}>© 2020 - {moment().year()}</p>
    </div>
  );
}
