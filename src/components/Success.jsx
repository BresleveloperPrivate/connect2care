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
            let [meeting, err] = await Auth.superAuthFetch('/api/meetings?filter={"where": {"id": 1} , "include": [{ "relation": "meetingOwner"},{"relation": "fallens_meetings" , "scope": { "include" : [{"relation" : "fallens"}]}}]}', {
                method: 'GET'
            })
            console.log(meeting)
            console.log(err)
            setMeeting(meeting[0])
        
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
                <div>
                    <div className="sucessPage">
                        <div className="bigContainer">
                            <div className="backArrow"><FontAwesomeIcon icon="arrow-right" color="#ffffff" onClick={pageBack} /></div>
                            <div className="sucessHeadline">מצויין יצרת מפגש</div>
                            <div className="sucessHeadline2">מתחברים וזוכרים יחד</div>
                            <div className="sucessInfo">
                                <div className="flexImage">
                                    <ImageOfFallen array={meeting.fallens_meetings} />
                                    <div className="isMeetingOpen">{meeting.isOpen === true ? <span id="meetingStatus">מפגש פתוח</span> : <span id="meetingStatus">מפגש סגור</span>}</div>
                                </div>
                                <div className="meetingInfo">
                                    <div className="fallenName">
                                        <img alt="alt" className="whiteCandle" src={candle} height="15px" width="10px" />
                                        <span className="exactDate">
                                        <span>{meeting.fallens_meetings.map((fallen, index) => {
                                            if (index === 0) {
                                                return (
                                                    <span>לזכר {fallen.fallens.name} ז"ל</span>
                                                )
                                            }

                                            else if (index === meeting.fallens_meetings.length - 1) {
                                                return (
                                                    <span> ו{fallen.fallens.name} ז"ל</span>
                                                )
                                            }

                                            else {
                                                return (
                                                    <span>, {fallen.fallens.name} ז"ל</span>
                                                )

                                            }
                                        })}</span>                                            
                                            
                                            </span>
                                    </div>
                                    <div className="meetingDate">
                                        <FontAwesomeIcon icon="clock" color="#ffffff" />
                                        <span className="exactDate">{meeting.date} | {meeting.time}</span>
                                    </div>
                                    <div className="relationDiv">
                                        <img alt="alt" className="annonymousPerson" src={annonymousPerson} height="15px" width="10px" />
                                        <span className="relationInfo"> מנחה: {meeting.meetingOwner.name}</span>
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
                    data={meeting}
                    styleObject={{buttonWidth: 'fit-content', fontSize:'1.3em', imageWidth: '30px', imageHeight: '30px'}}
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