import React from 'react';
import Img from '@icedesign/img';

import {baseURI} from '@/Config/BaseRequest';
import style from './index.module.scss';

const UserInfo = ({userName, onClick, onMouseEnter, onMouseLeave}) => {
    // console.log(other);
    return (
        <div
            className={style.userInfo}
            onClick={() => {
                onClick && onClick();
                // console.log(onClick)
            }}
            onMouseEnter={() => {
                onMouseEnter && onMouseEnter();
            }}
            onMouseLeave={() => {
                onMouseLeave && onMouseLeave();
            }}
        >
            <Img
                shape="circle"
                src={`${baseURI}/system/previewAvatar`}
                width={32}
                height={32}
                className={style.thumb}/>
            {/* <span className={style.username}>{userName}</span> */}
        </div>
    );
};

export default UserInfo;
