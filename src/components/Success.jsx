import React, { useState, useEffect, useRef } from 'react';
import '../styles/success.scss';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageOfFallen from './ImageOfFallen';
import annonymousPerson from '../icons/Asset 7@3x11.png';
import Sharing from './Sharing.jsx';
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
            setMeeting(props.meeting)
        })()
    }, []);

    let dataToProps = {
        "date": meeting.date,
        "time":meeting.time,
        "fallens":[],
        "meetingId":meeting.id
    }
    // let meeting = props.meeting
            // meetingId : null,
            // image: null,
            // dateOfDeath: null,
            // fallens: null,
            // relation: null,
            // meetingStarter: null,
            // meetingStory: null,
            // meetingDate: null,
            // meetingHour: null,
            // isMeetingOpen: null
        
    
    //READ ME!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //הקומפוננטה כרגע בנויה עם קומפוננט דיד מאונט שמעביר לסטייט מידע
    //לכן ברנדר יש שאילתה - אם הקומפוננטה רק התחילה והכל בסטייט הוא נאל
    //תציג טוען ואם לא, תציג את המידע
    //כשכבר יהיה פרופס מוכנים - יש להעביר את כל מה שיהיה רשום ברנדר
    //לפרופס ולהוריד את השאילתה מהרנדר
    //כמו כן להחליף את fallenImage במשהו מהפרופס

    // getPlaceholderInfo = () => {
    //     const meetingId = 2
    //     const dateOfDeath = "מרץ 07 צנחנים";
    //     const relation = "אח/ות";
    //     const meetingStarter = "משה לוי"
    //     const meetingStory = "אנחנו הולכים להיפגש, אבל קצת אחרת. נפגשים בבית, על הספה, לבד אבל ביחד, עם מצלמה דולקת ולב פתוח וחיבוק כל כך חזק שירגישו אותו גם מבעד למסך";
    //     const meetingDate = "יום שני | ג' באייר | 27 באפריל";
    //     const meetingHour = "20:30"
    //     const isMeetingOpen = true;
    //     const fallens =[{name: 'דוד'} , {name: 'משה'}, {name: 'ישראל'}]
    //     this.setState({
    //         dateOfDeath, relation, meetingDate, meetingHour, meetingStarter,
    //         meetingStory, isMeetingOpen, fallens , meetingId
    //     })
    // }

    let pageBack = () => {
        props.history.goBack();
    }

    // componentDidMount = () => {
    //     this.getPlaceholderInfo();
    // }


        return (
        meeting ?
        <div className="navBarMargin">
                <div style={{height:'90vh' , display:'flex' , flexDirection:'column'}}>
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
                                            dataToProps.fallens.push({"name":fallen.fallens.name })
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
                            <div 
                            style={props.LanguageStore.width > 550 ? props.LanguageStore.lang !== 'heb' ? {textAlign:'left'} : {textAlign:'right'}:{textAlign:'center'}}
                                    className="shareWith">{props.t('Share with your friends colleagues or family')}</div>
                        </div>
                    </div>
                    <div 
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
                    </div>
                    <div className="whiteFutter">
                        <div
                        style={props.LanguageStore.lang !== 'heb' ? {textAlign:'left'} : {textAlign:'right'}}
                        className="additionalInfo">
                            <div>*{props.t('A link to the meeting is waiting for you in the email box')}</div>
                            <div>*{props.t('InvitationIsWaiting')}</div>
                        </div>
                    </div>
                </div>
        </div> : null)
    
}

export default inject('LanguageStore')(observer(Success));
