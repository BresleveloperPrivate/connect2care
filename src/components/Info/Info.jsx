import React from 'react';

import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { inject, observer } from 'mobx-react';

import InfoCard from './InfoCard';

const Info = (props) => {
    const arrayQuestion = [
        "initiateMeetingQ",
        "createdMeetingQ",
        "inviteToMeetingQ",
        "registrationForMyMeetingQ",
        "openMeetingQ",
        "closedMeetingQ",
        "couldNotSignUpQ",
        "emailFromZoomQ",
        "doNotSeeTheMeetingQ",
        "additionalLanguagesQ",
        "moreThanOneMeetingQ",
        // "אנחנו קבוצה של אנשים שרוצים לפתוח מפגש ואין מי שיספר, מה עושים?",
        "joinMeetingQ",
        "maxAndMinParticipantsQ",
        "fewFallenQ",
        "guidanceZoom&buildTheNightQ",
        "successfulMeetingQ",
        "behindTheProjectQ",
        "allAgesQ",
        "meetingCanceledQ",
        "playVideoQ",
        "differentMeetingsQ"
    ]

    const arrayAnswers = [
        "initiateMeetingA",
        "",
        "inviteToMeetingA",
        "",
        "openMeetingA",
        "closedMeetingA",
        "",
        "",
        "doNotSeeTheMeetingA",
        "additionalLanguagesA",
        "moreThanOneMeetingA",
        // "",//not have an answer
        "joinMeetingA",
        "maxAndMinParticipantsA",
        "fewFallenA",
        "",
        "",
        "",
        "allAgesA",
        "meetingCanceledA",
        "",
        "differentMeetingsA",
    ]

    return (
        <div id="infoPage" style={props.LanguageStore.lang === "heb" ? { textAlign: "right" } : { textAlign: "left" }}>
            <div className="createMeetingHeadLine margin-right-text" style={{ marginTop: "12vh" }}>{props.LanguageStore.lang === "heb" ? "שאלות ותשובות" : "Questions and Answers"}</div>
            <div className="createMeetingSecondSentence margin-right-text">{props.LanguageStore.lang === "heb" ? "שאלות ותשובות ששאלתם אותנו" : "Questions and Answers you asked us"}</div>
            {arrayQuestion.map((_, index) => {

                if (arrayQuestion[index] === "createdMeetingQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>{
                        props.LanguageStore.lang === "heb" ? <div>
                            קודם כל, תודה! בזכותך, אנשים רבים יציינו את יום הזיכרון ויגדילו את מגדל ההנצחה. כל שעליך לעשות הוא להתחבר למפגש דרך המייל שקיבלת מזום ולעקוב אחר ההנחיות שנשלחו אליך במייל המצורף.
                            חשוב מאוד לשתף את המפגש ברשתות החברתיות, בין החברים האישיים שלך על מנת להזמין כמה שיותר משתתפים.
                         מלבד זאת, על מנת לייצר מפגש מוצלח - חשוב להירשם ל<a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">סדנאות ההכנה</a> שיצרנו עבורך ולקרוא את <a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">תיק התוכן</a> המכיל את כל המידע לקראת המפגש. לבסוף, חשוב להזמין בני משפחה וחברים - שיהוו עבורך קהל אוהד במפגש.
                         </div> :
                            <div>
                                First of all, thank you! Thanks to you, many people will mark Memorial Day and enlarge the commemorative tower. All you have to do is log in to the email through the email you received and follow the instructions sent to you in the email attached.
                                It is very important to share the meeting on social networks, among your personal friends, to invite as many participants as possible.
                            In addition, in order to produce a successful meeting - it is important to sign up for <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">the preparation workshops</a> we have created for you and read the <a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">content portfolio</a> containing all the information for the meeting.
                            Finally, it's important to invite family and friends - who will be a sympathetic audience for you.
                        </div>}

                    </InfoCard>

                else if (arrayQuestion[index] === "registrationForMyMeetingQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            במפגש סגור - לאחר יצירת המפגש תקבל מאיתנו שני מיילים. מייל אחד מאיתנו ומייל שני מזום. למייל שאנחנו שולחים יצטרף קוד מפגש. כשאתה מזמין אתה האנשים למפגש חשוב שתשלח להם את הקישור ואת הקוד הצטרפות. כל ההרשמות מתבצעות דרך האתר ותוכל להתעדכן און ליין בכמות המשתתפים.
                        <br />
                        במפגש פתוח - כל אדם שיכנס למפגש שיצרת יוכל לבצע הליך של הרשמה ולקבל קישור למפגש שלך. המשתתפים יהיו חלקם מהקהל הרחב וחלקם מוכרים לך, כי הזמנת אותם דרך האמצעים השונים. תוכל להתעדכן בכמות המשתתפים בכניסה למפגש שלך.
                        </div> :

                            <div>
                                Closed meeting - After the meeting you will receive two emails from us. One mile from us and two miles from Zoom. The email we send will include a meeting code. When you invite, you are the people to an important meeting that you send them the link and the code for joining. All subscriptions are made through the site and you can catch up on the number of participants online.
                            <br />
                            Closed meeting - After the meeting you will receive two emails from us. One mile from us and two miles from Zoom. The email we send will include a meeting code. When you invite, you are the people to an important meeting that you send them the link and the code for joining. All subscriptions are made through the site and you can catch up on the number of participants online.                        </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "couldNotSignUpQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            חשוב לנסות להבין מה סוג הבעיה בהרשמה, <a target="_blank" href="https://ourbrothers.co.il/contact?referer=connect-2-care">ותפנה אלינו</a> - כך נוכל לסייע לך, אנא כתוב בצורה מפורטת מה הבעיה ונשמח לסייע.
                            </div> :
                            <div>
                                It is important to try to understand what the problem is with enrollment, and <a target="_blank" href="https://ourbrothers.co.il/contact?referer=connect-2-care">contact us</a> - so that we can assist you, please write down in detail what the problem is and we will be happy to assist.
                            </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "emailFromZoomQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            במייל שקיבל יש חשבון יעודי למפגש שיצרת.<br />
                        יתכן וכבר יש לך חשבון בזום, אבל בכדי להנחות מפגש יש להתחבר בנפרד לחשבון זמני. איך תעשו זאת?<br />
                        א. לחיצה על הקישור של הפעלת החשבון תפתח דף באתר של זום בו תתבקש להירשם<br />
                        ב. יש לבחור באופציה להירשם עם שם משתמש וסיסמא (ולא דרך גוגל או פייסבוק)<br />
                        ג. לאחר בחירת הרשמה עם שם משתמש, תתבקש להזין את שמך הפרטי ושם משפחה, וכן סיסמא. הזן את שמך האמיתי. השתמש בסיסמא OurBrothers2020<br />
                        איך יוצרים מפגש?<br />
                        בימים הקרובים, אחרי ביצוע האקטיבציה, אנו נשלח לך <strong>אימייל נוסף</strong>, שיכיל קישור והוראות מדויקות לפתיחת מפגש הזום אותו אתה תנחה. <br />
                        בכדי להתחבר ביום המפגש, יהיה עליך להשתמש בפרטים הבאים שקיבלת במייל מאיתנו. אנא שמור אותם במקום נגיש.
                        </div> :
                            <div>
                                The email he received has a dedicated account for the meeting you created.<br />
                            You may already have a zoom account, but in order to guide a meeting you need to log in separately to a temporary account. How do you do it<br />
                            A. Clicking the account activation link will open a page on the Zoom site where you will be asked to sign up<br />
                            B. The option to register with a username and password (not via Google or Facebook) must be chosen.<br />
                            C. After selecting a user name registration, you will be asked to enter your first and last name, and a password. Enter your real name. Use our OurBrothers2020 password<br />
                            How do you create a meeting?<br />
                            In the coming days, after activation, we will send you a message <strong>another email</strong>, Which will contain precise links and instructions for opening the zoom meeting you will be guiding.<br />
                            In order to connect on the day of the meeting, you will need to use the following details that you received by email from us. Please keep them accessible.</div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "guidanceZoom&buildTheNightQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            בהחלט! צוות ההדרכה שלנו עמל רבות והכין עבורך סדנה וירטואלית לניהול המפגש.<br />
                        הסדנה תועבר בזמן אמת אונליין בzoom על ידי מרצים מומחים בתחומי התוכן והדיגיטל. ניתן להשתבץ לאחד או יותר מהמועדים לבחירתך. ההרשמה ממש <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">כאן</a>.
                        </div> :
                            <div>
                                Definitely! Our training team has worked hard and prepared a virtual workshop for you to manage the meeting.<br />
                                The workshop will be delivered online in real-time in zoom by expert lecturers in content and digital. You can go to one or more of your chosen dates. Sign up <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">right here</a>.

                            </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "successfulMeetingQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            חשוב שיהיה לצידך "מארח", שידאג לכל הצד הטכני, שהזום עובד, המצלמה תקינה, ואם יש צורך אז גם להשתיק קולות מפריעים. כמו כן, חשוב להגיע עם מסרים שאותם רוצים להעביר.<br />
                            <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">בסדנאות ההכנה</a> ניתן להיעזר ו<a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">בערכת ההדרכה</a>.
                        </div> :
                            <div>
                                It is important that you have a "host" on your side, who will take care of all the technical side, that the zoom is working, the camera is working properly, and if necessary then also silence interfering sounds. It is also important to come up with messages that you want to convey.<br />
                                You can use<a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">the preparation workshops</a> and <a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">and training kit</a>.
                                </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "behindTheProjectQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            מאחורי המיזם עומדת עמותת 'האחים שלנו' אשר הוקמה במטרה לבנות - לראשונה בישראל - קהילה תומכת ומעצימה עבור האחים השכולים במדינה.
                        העמותה הוקמה בשנת 2017 על ידי אחים שכולים ומתנדבים מכלל החברה הישראלית בכדי לתת בפעם הראשונה מקום לכאב, להתמודדות ולסיפור הייחודי שלנו, האחים השכולים. ניתן לקרוא עלינו עוד <a target="_blank" href="https://ourbrothers.co.il/about">כאן</a>.
                        </div> :
                            <div>
                                Behind the venture stands the 'Our Brothers' association, which was established with the aim of building - for the first time in Israel - a supportive and empowering community for the bereaved brothers in the country.
                                The association was founded in 2017 by bereaved brothers and volunteers from all of Israeli society to give, for the first time, room for our pain, coping and unique story, the bereaved brothers. You can read more about us <a target="_blank" href="https://ourbrothers.co.il/about">here</a>.
                            </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "playVideoQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            ניתן לעשות זאת באמצעים של תכנת ZOOM , בה מתקיימים המפגשים בדרך וירטואלית.<br />
                        ניתן לקרוא עוד ב<a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">ערכת הדרכה</a> שהכנו עבורך ולהצטרף לאחד <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">ממפגשי ההכנה</a>.
                        </div> :
                            <div>
                                This can be done by means of ZOOM software, where the sessions are held in a virtual way.<br />
                                You can read more in <a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">the tutorial</a> we have prepared for you and join one of <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">the preparation sessions</a>.

                            </div>}
                    </InfoCard>


                else return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                    {props.t(arrayAnswers[index])}
                </InfoCard>
            })}
        </div>
    );
}

const theme = createMuiTheme({ direction: "rtl", palette: { primary: { main: "#082551" }, secondary: { main: "#19A099" } } });

export default inject('LanguageStore')(observer(props => (
    <ThemeProvider theme={theme}>
        <Info {...props} />
    </ThemeProvider>
)));