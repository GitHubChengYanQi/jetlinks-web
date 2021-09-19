import React from 'react';
import style from './index.module.less';

const Title = ({level, title}) => {

  const titles = () => {
    if (typeof level === 'number' && level) {
      switch (level) {
        case 1:
          return <h1 className={style.titleH}>{title}</h1>;
        case 2:
          return <h2 className={style.titleH}>{title}</h2>;
        case 3:
          return <h3 className={style.titleH}>{title}</h3>;
        case 4:
          return <div className={style.titleH4}>{title}</div>;
        case 5:
          return <div className={style.titleH5}>{title}</div>;
        case 6:
          return <h6 className={style.titleH}>{title}</h6>;
        default:
          break;
      }
    }

  };

  return (
    <>
      {
        titles()
      }
    </>
  );
};

export default Title;
