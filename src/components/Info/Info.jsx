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
            <div className="createMeetingHeadLine margin-right-text headlineCM" >{props.LanguageStore.lang === "heb" ? "שאלות ותשובות" : "Questions and Answers"}</div>
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
                                First of all, thank you! Thanks to you, many people will commemorate Yom Hazikaron this year and will enlarge the circle of memory. All you have to do now, is to connect to the meet-up through the email you received from Zoom, and follow the instructions that were sent in the email. It is very important to share the meeting on social networks, among your personal friends, to invite as many participants as possible.
                                It is crucial to share the meet-up on social media and with your friends so that we can reach as many participants as possible. In addition, in order to create a successful meet-up, it is important to sign up for the <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">preparatory workshop</a> that we created for you, and to read the <a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">content pack</a>hat includes all relevant information for the meet-up.
                                 And lastly, invite your friends and family, to ensure that you will have friendly and encouraging faces in the meet-up
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
                                In a closed meet-up - after creating the meet-up you will receive two emails; one from us and one from Zoom. In the email you receive from us there will be a meet-up code. When you invite participants to your meet-up, you must provide the meet-up link and code. All registration is through our website and you can update the number of participants online.
                                <br />
                                In an open meet-up - anyone who enters your meet-up can register for it online, and can receive a link for the open meet-up. Participants will be partly general public and partly people that you know, since you already invited them. You can see the updated number of participants on your meet-up page.
                            </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "couldNotSignUpQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            חשוב לנסות להבין מה סוג הבעיה בהרשמה, <a target="_blank" href="https://ourbrothers.co.il/contact?referer=connect-2-care">ותפנה אלינו</a> - כך נוכל לסייע לך, אנא כתוב בצורה מפורטת מה הבעיה ונשמח לסייע.
                            </div> :
                            <div>
                                Please <a target="_blank" href="https://ourbrothers.co.il/contact?referer=connect-2-care">contact us</a>  with the problem - so that we can assist you, please describe the problem in detail and we will be happy to help.
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
                                In the email you will see that an account has been created specifically for your meet-up. You may already have a Zoom account, but in order to host the meet-up, please connect to this temporary account. How do you do this?
                            1. Click the “activate account” button and you will be routed to a Zoom sign-up page<br />
                            2. Choose the option for signing in with user name and password (not through Google or Facebook)<br />
                            3. After choosing this option, you are asked to input your first and last name and password. Please input your <u>real name</u>. The password is OurBrothers2020<br />
                            How do I create a meet-up?<br />
                            Within a few days of activating your Zoom account, you will receive an email that will include a specific meet-up link and detailed instructions for opening the meet-up that you will be hosting.<br />
                            In order to connect on the day of the meeting, you will need to input your name and password as instructed on the email you received from us. Please save this information.</div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "guidanceZoom&buildTheNightQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            בהחלט! צוות ההדרכה שלנו עמל רבות והכין עבורך סדנה וירטואלית לניהול המפגש.<br />
                        הסדנה תועבר בזמן אמת אונליין בzoom על ידי מרצים מומחים בתחומי התוכן והדיגיטל. ניתן להשתבץ לאחד או יותר מהמועדים לבחירתך. ההרשמה ממש <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">כאן</a>.
                        </div> :
                            <div>
                                Definitely! Our team has been working hard to prepare a virtual workshop for running sessions.<br />
                                This workshop will be run online through Zoom, by public speaking experts and digital content experts. You can sign up for one or more of the sessions <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">here</a>.

                            </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "successfulMeetingQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            חשוב שיהיה לצידך "מארח", שידאג לכל הצד הטכני, שהזום עובד, המצלמה תקינה, ואם יש צורך אז גם להשתיק קולות מפריעים. כמו כן, חשוב להגיע עם מסרים שאותם רוצים להעביר.<br />
                            <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">בסדנאות ההכנה</a> ניתן להיעזר ו<a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">בערכת ההדרכה</a>.
                        </div> :
                            <div>
                                Ensure that you have a “host” close by, who will be your technical support, that the Zoom and camera are working, and if you must then to mute background noise. You should arrive with the message that you would like to pass on.<br />
                                You can always refer to the <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">preparatory workshop</a> and <a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">content pack</a>.
                                </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "behindTheProjectQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            מאחורי המיזם עומדת עמותת 'האחים שלנו' אשר הוקמה במטרה לבנות - לראשונה בישראל - קהילה תומכת ומעצימה עבור האחים השכולים במדינה.
                        העמותה הוקמה בשנת 2017 על ידי אחים שכולים ומתנדבים מכלל החברה הישראלית בכדי לתת בפעם הראשונה מקום לכאב, להתמודדות ולסיפור הייחודי שלנו, האחים השכולים. ניתן לקרוא עלינו עוד <a target="_blank" href="https://ourbrothers.co.il/about">כאן</a>.
                        </div> :
                            <div>
                                Behind the scenes is the “Our Brothers” Project that was founded in order to create - for the first time in Israel - a supportive and empowering peer community for bereaved brothers and sisters in the country. <br />
                                 This non-profit was founded in 2017 by bereaved siblings and volunteers in order to provide a space for pain, coping and our unique stories, the bereaved siblings. You can read more about us <a target="_blank" href="https://ourbrothers.co.il/about">here</a>.
                            </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "playVideoQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            ניתן לעשות זאת באמצעים של תכנת ZOOM , בה מתקיימים המפגשים בדרך וירטואלית.<br />
                        ניתן לקרוא עוד ב<a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">ערכת הדרכה</a> שהכנו עבורך ולהצטרף לאחד <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">ממפגשי ההכנה</a>.
                        </div> :
                            <div>
                                Through Zoom, the program that is hosting our virtual meet-ups. <br />
                                You can read more in our <a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">hosting pack</a> or join the <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">preparatory workshop</a>.

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