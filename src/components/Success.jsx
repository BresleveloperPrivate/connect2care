import React, { useState, useEffect, useRef } from 'react';
import '../styles/success.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageOfFallen from './ImageOfFallen';
import annonymousPerson from '../icons/Asset 7@3x11.png';
import Sharing from './Sharing.jsx';
import candle from '../icons/candle-white.svg';
import Auth from '../modules/auth/Auth'
// import Divider from '@material-ui/core/Divider';

function Success(props) {

    const [meeting, setMeeting] = useState(false)

    useEffect(() => {
       
        (async () => {
            setMeeting(props.meeting)
        })()
    }, []);

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
    //     const relation = "אח";
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
                            <div className="sucessHeadline">מצויין יצרת מפגש</div>
                            <div className="sucessHeadline2">מתחברים וזוכרים יחד</div>
                            <div className="sucessInfo">
                                <div className="flexImage">
                                    <div><ImageOfFallen width='11em' height='14em' array={meeting.fallens_meetings} /></div>
                                    <div className="isMeetingOpen">{meeting.isOpen === true ? <span id="meetingStatus">מפגש פתוח</span> : <span id="meetingStatus">מפגש סגור</span>}</div>
                                </div>
                                <div className="meetingInfo">
                                    <div className="fallenName">
                                        <div style={{width: '1.1em' , height:'1.1em' , display:'flex'}}><img alt="alt" className="whiteCandle" src={candle} height="100%" width="100%" /></div>
                                        <div>{meeting.fallens_meetings.map((fallen, index) => {
                                            if (index === 0) {
                                                return (
                                                    <span key={index}>לזכר {fallen.fallens.name} ז"ל</span>
                                                )
                                            }

                                            else if (index === meeting.fallens_meetings.length - 1) {
                                                return (
                                                    <span key={index}> ו{fallen.fallens.name} ז"ל</span>
                                                )
                                            }

                                            else {
                                                return (
                                                    <span key={index}>, {fallen.fallens.name} ז"ל</span>
                                                )

                                            }
                                        })}</div>                                            
                                    </div>
                                    <div className="meetingDate">
                                        <FontAwesomeIcon icon="clock" color="#ffffff" />
                                        <span className="exactDate">{meeting.date} | {meeting.time}</span>
                                    </div>
                                    <div className="relationDiv">
                                    <div style={{width: '0.8em' , height:'1.1em' , display:'flex' , marginLeft:'0.5em'}}><img alt="alt" className="annonymousPerson" src={annonymousPerson} height="100%" width="100%" /></div>
                                        <span className="relationInfo"> מנחה: {meeting.meetingOwner && meeting.meetingOwner.name}</span>
                                    </div>
                                    <div className="detailsInfo">{meeting.description}</div>
                                    {/* </div> */}
                                </div>
                            </div>
                            <div className="shareWith">שתף את החברים, הצוות או המשפחה</div>
                        </div>
                    </div>
                    <div className="sharingComponent">
                        <Sharing 
                        containImageClassName={'containSharingImage'}
                        myId={'sharingBox'}
                        data={meeting}
                        meetingId={meeting.id}
                        styleObject={{buttonWidth: 'fit-content'}}
                    />
                    </div>
                    <div className="whiteFutter">
                        <div className="additionalInfo">
                            <div>*קישור למפגש מחכה לך בתיבת המייל</div>
                            <div>*הזמנה לסדנת הכנה מקדימה עם כלים פרקטים וטכניים לניהול המפגש ממתינה במייל שלך</div>
                        </div>
                    </div>
                </div>
        </div> : null)
    
}

export default Success;