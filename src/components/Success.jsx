import React, { Component } from 'react';
import '../styles/success.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fallenImage from '../icons/515374.png';
import annonymousPerson from '../icons/Asset 7@3x11.png';
import Sharing from './Sharing.jsx';


class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            dateOfDeath: null,
            name: null,
            relation: null,
            meetingStarter: null,
            meetingStory: null,
            meetingDate: null,
            meetingHour: null,
            isMeetingOpen: null
        }
    }
    //READ ME!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //הקומפוננטה כרגע בנויה עם קומפוננט דיד מאונט שמעביר לסטייט מידע
    //לכן ברנדר יש שאילתה - אם הקומפוננטה רק התחילה והכל בסטייט הוא נאל
    //תציג טוען ואם לא, תציג את המידע
    //כשכבר יהיה פרופס מוכנים - יש להעביר את כל מה שיהיה רשום ברנדר
    //לפרופס ולהוריד את השאילתה מהרנדר
    //כמו כן להחליף את fallenImage במשהו מהפרופס

    getPlaceholderInfo = () => {
        const dateOfDeath = "מרץ 07 צנחנים";
        const relation = "אח";
        const meetingStarter = "משה לוי"
        const meetingStory = "אנחנו הולכים להיפגש, אבל קצת אחרת. נפגשים בבית, על הספה, לבד אבל ביחד, עם מצלמה דולקת ולב פתוח וחיבוק כל כך חזק שירגישו אותו גם מבעד למסך";
        const meetingDate = "יום שני | ג' באייר | 27 באפריל";
        const meetingHour = "20:30"
        const isMeetingOpen = true;
        this.setState({
            dateOfDeath, relation, meetingDate, meetingHour, meetingStarter,
            meetingStory, isMeetingOpen
        })
    }

    pageBack = () => {
        this.props.history.goBack();
    }

    componentDidMount = () => {
        this.getPlaceholderInfo();
    }

    render() {
        return (<div>
            {this.state.isMeetingOpen !== null ?
                <div>
                    <div className="sucessPage">
                        <div className="bigContainer">
                            <div className="backArrow"><FontAwesomeIcon icon="arrow-right" color="#ffffff" onClick={this.pageBack} /></div>
                            <div className="sucessHeadline">מצויין יצרת מפגש</div>
                            <div className="sucessHeadline2">מתחברים וזוכרים יחד</div>
                            <div className="sucessInfo">
                                <img className="fallenImage" src={fallenImage} width="93px" height="123px" />
                                <div className="meetingInfo">
                                    <div className="deathTime">{this.state.dateOfDeath}</div>
                                    {/* <div className="relationInfo"> */}
                                    <div className="relationDiv">
                                        <img className="annonymousPerson" src={annonymousPerson} height="15px" width="10px" />
                                        <span className="relationInfo">{this.state.meetingStarter}, {this.state.relation}</span>
                                    </div>
                                    <div className="detailsInfo">{this.state.meetingStory}</div>
                                    {/* </div> */}
                                    <div className="meetingDate">
                                        <FontAwesomeIcon icon="clock" color="#ffffff" />
                                        <span className="exactDate">{this.state.meetingDate} {this.state.meetingHour}</span>
                                    </div>
                                    <div className="isMeetingOpen">{this.state.isMeetingOpen === true ? <span id="meetingStatus">מפגש פתוח</span> : <span id="meetingStatus">מפגש סגור</span>}</div>
                                </div>
                            </div>
                            <div className="shareWith">שתף את החברים, הצוות או המשפחה</div>
                        </div>
                    </div>
                    <div className="sharingComponent"><Sharing /></div>
                    <div className="whiteFutter">
                        <div className="additionalInfo">
                        <div>*קישור למפגש מחכה לך בתיבת המייל</div>
                        <div>*הזמנה לסדנת הכנה מקדימה עם כלים פרקטים וטכניים לניהול המפגש ממתינה במייל שלך</div>
                        </div>
                    </div>
                </div> : <div>טוען...</div>}
        </div>);
    }
}

export default Success;