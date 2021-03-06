import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import fallenNotExistPic from '../../icons/fallenNotExistPic.jpg';

const useStyles = makeStyles({
    avatar: {
        height: 167,
        width: 132,
    }
});

const MeetingFallen = ({ fallen: { name, falling_date, heb_falling_date, image_link }, LanguageStore }) => {
    const { avatar } = useStyles();
    const [imgCorrect, setImgCorrect] = useState();

    return (
        <div className={LanguageStore.lang !== 'heb' ? "meetingFallen fdrr" : "meetingFallen"}>
            <img onError={() => setImgCorrect(fallenNotExistPic)} src={imgCorrect ? imgCorrect : (image_link || fallenNotExistPic)} className={avatar} style={!imgCorrect && image_link ? { filter: "grayscale(1)" } : {}} variant="square" />
            <div className={LanguageStore.lang !== 'heb' ? "meetingFallenDescription tal" : "meetingFallenDescription tar"}>
                <img alt="alt" src="./images/lightBlueCandleIcon.svg" className="fallenCandle" />
                <div className="fallenName">{`${name || ''}`}</div>
                <div className="fallenDate">{falling_date.split("T")[0].split('-')[2]}.{falling_date.split("T")[0].split('-')[1]}.{falling_date.split("T")[0].split('-')[0]} | {heb_falling_date}</div>
            </div>
        </div>
    );
}

export default inject('LanguageStore')(observer(MeetingFallen));
