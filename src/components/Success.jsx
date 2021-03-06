import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageOfFallen from './ImageOfFallen';
import { meetingDate } from '../consts/Meetings.consts';
import annonymousPerson from '../icons/Asset 7@3x11.png';
import candle from '../icons/candle-white.svg';
import '../styles/success.scss';

function Success(props) {
    const [meeting, setMeeting] = useState(false)

    useEffect(() => {
        (async () => {
            setMeeting(props.meeting)
        })()
    }, []);

    let pageBack = () => {
        props.history.goBack();
    }

    return (
        meeting
        ? <div className="navBarMargin">
            <div style={{display:'flex' , flexDirection:'column'}}>
                <div className="sucessPage">
                    <div className="bigContainer">
                        <div className="backArrow"><FontAwesomeIcon className='pointer' icon="arrow-right" color="#ffffff" onClick={pageBack} /></div>
                        <div
                            style={props.LanguageStore.width > 550 ? props.LanguageStore.lang !== 'heb' ? {textAlign:'left'} : {textAlign:'right'}:{textAlign:'center'}}
                            className="sucessHeadline">
                            {props.t('Great, youve created a meeting')}
                            </div>
                        <div 
                            style={props.LanguageStore.width > 550 ? props.LanguageStore.lang !== 'heb' ? {textAlign:'left'} : {textAlign:'right'}:{textAlign:'center'}}
                            className="sucessHeadline2">
                            {props.t('Connect and remember together')}
                        </div>
                        <div className="sucessInfo">
                            <div className="flexImage">
                                <div><ImageOfFallen width='11em' height='14em' array={meeting.fallens_meetings} /></div>
                                <div className="isMeetingOpen">{meeting.isOpen === true ? <span id="meetingStatus">{props.t("meetingIsOpen")}</span> : <span id="meetingStatus">{props.t("meetingIsClosed")}</span>}</div>
                            </div>
                            <div className="meetingInfo">
                                <div className="fallenName">
                                    <div style={
                                        props.LanguageStore.lang !== 'heb'
                                            ? {width: '0.8em' , height:'1.1em' , display:'flex' , marginRight:'0.4em'}
                                            : {width: '0.8em' , height:'1.1em' , display:'flex', marginLeft:'0.4em'}
                                    }>
                                        <img alt="alt" src={candle} height="100%" width="100%" />
                                    </div>
                                    <div>{meeting.fallens_meetings.map((fallen, index) => {
                                        if (index === 0) {
                                            if (props.LanguageStore.lang !== 'heb') {
                                                return (
                                                    <span key={index}>In memory of {fallen.fallens.name}</span>
                                                )
                                            } else {
                                                return (
                                                    <span key={index}>לזכר {fallen.fallens.name} ז"ל</span>
                                                )
                                            }
                                        } else if (index === meeting.fallens_meetings.length - 1) {
                                            if (props.LanguageStore.lang !== 'heb') {
                                                return (
                                                    <span key={index}> and {fallen.fallens.name}</span>
                                                )
                                            } else {
                                                return (
                                                    <span key={index}> ו{fallen.fallens.name} ז"ל</span>
                                                )
                                            }
                                        } else {
                                            if (props.LanguageStore.lang !== 'heb') {
                                                return (
                                                    <span key={index}>, {fallen.fallens.name}</span>
                                                )
                                            } else {
                                                return (
                                                    <span key={index}>, {fallen.fallens.name} ז"ל</span>
                                                )
                                            }
                                        }
                                    })}</div>
                                </div>
                                <div className="meetingDateSuccess">
                                <div style={
                                    props.LanguageStore.lang !== 'heb' ?
                                    {width: '0.8em' , height:'1.1em' , display:'flex' , marginRight:'0.5em'}
                                    :
                                    {width: '0.8em' , height:'1.1em' , display:'flex' , marginLeft:'0.5em'}
                                }>
                                    <FontAwesomeIcon icon="clock" color="#ffffff" />
                                </div>
                                <span className="exactDate">
                                    {props.t(meetingDate(props).find(val=> val.data === meeting.date).option)} | {meeting.time}
                                </span>
                            </div>
                            <div className="relationDiv">
                                <div style={
                                    props.LanguageStore.lang !== 'heb' ?
                                    {width: '0.8em' , height:'1.1em' , display:'flex' , marginRight:'0.5em'}
                                    :
                                    {width: '0.8em' , height:'1.1em' , display:'flex' , marginLeft:'0.5em'}
                                }>
                                    <img alt="alt" className="annonymousPerson" src={annonymousPerson} height="100%" width="100%" />
                                </div>
                                <span className="relationInfo">
                                    {props.t('host')}: {meeting.meetingOwner && meeting.meetingOwner.name}
                                </span>
                            </div>
                            <div style={props.LanguageStore.lang !== 'heb' ? {textAlign:'left'} : {textAlign:'right'}}
                                className="detailsInfo">{meeting.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style={{backgroundColor:'#0A2D63'}} className="shareWith">
            <strong> {props.t('safety-1')}</strong><br/>
            {props.t('safety-2')}
        </div>
        <div className="whiteFutter">
            <div
                style={props.LanguageStore.lang !== 'heb' ? {textAlign:'left'} : {textAlign:'right'}}
                className="additionalInfo">
                <div>*{props.t('whiteFutter')} </div>
                    {props.LanguageStore.lang !== 'heb'
                        ? <div>
                            *To download a short, detailed and user-friendly pack for successful meet-ups <span className='contentClick' onClick={() => { window.open(`https://bit.ly/connect2care`) }}> click here </span>.
                        </div>
                        : <div>
                            *להורדת ערכה מקיפה, קצרה, ושימושית לקיום מפגשים מוצלחים <span className='contentClick' onClick={() => { window.open(`https://bit.ly/connect2care`) }}> לחצו כאן </span>.
                        </div>}
                </div>
            </div>
        </div>
        : null)
}

export default inject('LanguageStore')(observer(Success));
