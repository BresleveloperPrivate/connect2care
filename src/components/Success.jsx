import React, { useState, useEffect } from 'react';
import '../styles/success.scss';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageOfFallen from './ImageOfFallen';
import annonymousPerson from '../icons/Asset 7@3x11.png';
// import Sharing from './Sharing.jsx';
import candle from '../icons/candle-white.svg';
// import Auth from '../modules/auth/Auth'
// import Divider from '@material-ui/core/Divider';

function Success(props) {
    const meetingDate = [
        { option: props.t('all'), data: false },
        { option: props.t('sunday'), data: 'יום ראשון, ב באייר, 26.04' },
        { option: props.t('monday'), data: 'יום שני, ג באייר, 27.04' },
        { option: props.t('tuesday'), data: 'יום שלישי, ד באייר, 28.04' },
        { option: props.t('wednesday'), data: 'יום רביעי, ה באייר, 29.04' },
    ]
    const [meeting, setMeeting] = useState(false)

    useEffect(() => {
       
        (async () => {
            // let ex={
            //     approved: false,
            //     code: 169808,
            //     date: "יום שלישי, ד באייר, 28.04",
            //     description: "jgdlofg",
            //     fallens_meetings:[
            //     {
            //     fallen: 20224,
            //     fallens: {id: 20224, name: "מעיין לוי", falling_date: "1994-10-10T00:00:00.000Z", heb_falling_date: "ה' בחשון  תשנה", image_link: "https://izkorcdn.azureedge.net/Data/korot/Image/514122.jpg"},
            //     meeting: 15,
            //     relationship: "אח/ות"}],
            //     id: 15,
            //     isOpen: false,
            //     language: "עברית",
            //     max_participants: 300,
            //     meetingOwner: {id: 7, name: "מעיין לוי", email: "maayan45633@gmail.com", phone: "0524773888"},
            //     name: "hghghg",
            //     owner: 7,
            //     participants_num: 0,
            //     time: "20:30",
            //     zoomId: ""
            // }
            // setMeeting(ex)
            setMeeting(props.meeting)
        })()
    }, []);

    // let dataToProps = {
    //     "date": meeting.date,
    //     "time":meeting.time,
    //     "fallens":[],
    //     "meetingId":meeting.id
    // }

    
    let pageBack = () => {
        props.history.goBack();
    }

        return (
        meeting ?
        <div className="navBarMargin">
                <div style={{display:'flex' , flexDirection:'column'}}>
                {/* <div>{props.t("sunday")}</div> */}
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
                            className="sucessHeadline2">{props.t('Connect and remember together')}</div>
                            <div className="sucessInfo">
                                <div className="flexImage">
                                    <div><ImageOfFallen width='11em' height='14em' array={meeting.fallens_meetings} /></div>
                                    <div className="isMeetingOpen">{meeting.isOpen === true ? <span id="meetingStatus">{props.t("meetingIsOpen")}</span> : <span id="meetingStatus">{props.t("meetingIsClosed")}</span>}</div>
                                </div>
                                <div className="meetingInfo">
                                    <div className="fallenName">
                                        <div style={
                                            props.LanguageStore.lang !== 'heb' ? 
                                            {width: '0.8em' , height:'1.1em' , display:'flex' , marginRight:'0.4em'}
                                            :           
                                            {width: '0.8em' , height:'1.1em' , display:'flex', marginLeft:'0.4em'}

                                            }><img alt="alt" src={candle} height="100%" width="100%" /></div>
                                        <div>{meeting.fallens_meetings.map((fallen, index) => {
                                            // dataToProps.fallens.push({"name":fallen.fallens.name })
                                            if (index === 0) {
                                                if(props.LanguageStore.lang !== 'heb'){
                                                    return (
                                                        <span key={index}>In memory of {fallen.fallens.name}</span>
                                                    )
                                                }else{
                                                return (
                                                    <span key={index}>לזכר {fallen.fallens.name} ז"ל</span>
                                                )
                                            }
                                            }
                                            else if (index === meeting.fallens_meetings.length - 1) {
                                                if(props.LanguageStore.lang !== 'heb'){
                                                return (
                                                    <span key={index}> and {fallen.fallens.name}</span>
                                                )}else{
                                                    return (
                                                        <span key={index}> ו{fallen.fallens.name} ז"ל</span>
                                                    )
                                                }
                                            }
                                            else {
                                                if(props.LanguageStore.lang !== 'heb'){
                                                    return(
                                                        <span key={index}>, {fallen.fallens.name}</span>
                                                    )
                                                }else{
                                                return (
                                                    <span key={index}>, {fallen.fallens.name} ז"ל</span>
                                                )}
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
                                        {props.t(meetingDate.find(val=> val.data === meeting.date).option)} | {meeting.time}
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
                                        <span className="relationInfo"> {props.t('host')}: {meeting.meetingOwner && meeting.meetingOwner.name}</span>
                                    </div>
                                    <div style={props.LanguageStore.lang !== 'heb' ? {textAlign:'left'} : {textAlign:'right'}}
                                    className="detailsInfo">{meeting.description}</div>
                                    {/* </div> */}
                                </div>
                            </div>
                            {/* <div 
                            style={props.LanguageStore.width > 550 ? props.LanguageStore.lang !== 'heb' ? {textAlign:'left'} : {textAlign:'right'}:{textAlign:'center'}}
                                    className="shareWith">{props.t('Share with your friends colleagues or family')}</div>
                        </div> */}
                        
                    </div>
                    </div>
                    {/* <div 
                    style={{direction:'rtl'}}
                    className="sharingComponent">
                        <Sharing 
                        containImageClassName={'containSharingImage'}
                        myId={'sharingBox'}
                        // data={meeting}
                        data={dataToProps}
                        t={props.t}
                        // meetingId={meeting.id}
                        styleObject={{buttonWidth: 'fit-content'}}
                    />
                    </div> */}

                    
                    
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
                            {props.LanguageStore.lang !== 'heb' ?
                            <div>
                           *To download a short, detailed and user-friendly pack for successful meet-ups <span className='contentClick' onClick={() => { window.open(`https://bit.ly/connect2care`) }}> click here </span>.
                           </div>
                            :
                            <div>
                             *להורדת ערכה מקיפה, קצרה, ושימושית לקיום מפגשים מוצלחים <span className='contentClick' onClick={() => { window.open(`https://bit.ly/connect2care`) }}> לחצו כאן </span>.
                        </div>}
                            {/* <div>*{props.t('InvitationIsWaiting')}</div> */}
                        </div>
                    </div>
        </div>
         : null)
    
}

export default inject('LanguageStore')(observer(Success));
