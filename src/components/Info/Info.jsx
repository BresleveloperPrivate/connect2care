import React from 'react';

import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import translationHEB from '../../i18nreact/translation/heb/translationHEB.heb';

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
        "doNotSeeTheMeetingQ",
        "additionalLanguagesQ",
        "moreThanOneMeetingQ",
        // "אנחנו קבוצה של אנשים שרוצים לפתוח מפגש ואין מי שיספר, מה עושים?",
        "joinMeetingQ",
        "maxAndMinParticipantsQ",
        "fewFallenQ",
        "getZoomLinkQ",
        "zoomTimeLimitQ",
        "guidanceZoom&buildTheNightQ",
        "successfulMeetingQ",
        "behindTheProjectQ",
        "supportTheProjectQ",
        "allAgesQ",
        "meetingCanceledQ",
        "isMeetingRecorededQ",
        "playVideoQ",
        "meetingParticepantsQ",
        "hostNotHostQ"
    ]

    const arrayAnswers = [
        "initiateMeetingA",
        "inviteToMeetingA",
        "openMeetingA",
        "closedMeetingA",
        "doNotSeeTheMeetingA",
        "additionalLanguagesA",
        "moreThanOneMeetingA",
        // "",//not have an answer
        "joinMeetingA",
        "maxAndMinParticipantsA",
        "fewFallenA",
        "getZoomLinkA",
        "allAgesA",
        "meetingCanceledA"
    ]

    return (
        <div id="infoPage" style={props.LanguageStore.lang === "heb" ? { textAlign: "right" } : { textAlign: "left" }}>
            <div className="createMeetingHeadLine margin-right-text headlineCM" >{props.LanguageStore.lang === "heb" ? "שאלות ותשובות" : "Questions and Answers"}</div>
            <div className="createMeetingSecondSentence margin-right-text">{props.LanguageStore.lang === "heb" ? "שאלות ותשובות ששאלתם אותנו" : "Questions and Answers you asked us"}</div>
            {arrayQuestion.map((_, index) => {

                if (arrayQuestion[index] === "initiateMeetingQ") {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>{translationHEB.initiateMeetingA}</div>
                    </InfoCard>
                }

                else if (arrayQuestion[index] === "createdMeetingQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>{
                        props.LanguageStore.lang === "heb" ? <div>
                            קודם כל, תודה! בזכותך אנשים רבים יציינו את יום הזיכרון ויתחברו אליו ממקום אישי. לאחר אישור המפגש על ידינו, יישלח אלייך מייל עם כל הפרטים שאתה צריך - שם משתמש וסיסמה, 
                            <a target="blank" href="https://connect2care.ourbrothers.co.il/static/media/ercatMovil.9a402ee4.pdf" > ערכת ההדרכה </a>
                            המכילה את כל המידע לקראת המפגש. על מנת לייצר מפגש מוצלח חשוב מאוד הרשם
                            <a target="blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdysCMih5-VnB241KuP9zFbLyju9NqShDwntZHpBcUsGntqLg/viewform?gxids=7628"> לסדנאות ההכנה </a>
                            שיצרנו עבורך. בנוסף, יש לפרסם את המפגש שיצרת ברשתות החברתיות ולחברים על מנת להזמין כמה שיותר משתתפים וליצור קהל אוהד במפגש. כמה שעות לפני המפגש, תקבלו מאיתנו מייל עם הקישור לזום. יש לשים לב, אתם תקבלו מאיתנו שם משתמש וסיסמה ויש להתחבר עם חשבון המשתמש שיצרנו עבורך ולא עם המשתמש האישי שלך.
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
                            לאחר הרישום באתר, יישלח אלייך מייל מהאתר 'מתחברים וזוכרים' שמאשר את ההרשמה ושהמפגש יאושר ב- 48 השעות הקרובות. לאחר אישור המפגש, יישלח אלייך מייל נוסף שההרשמה אושרה ותקבל לינק לעמוד המפגש שלך, אותו תוכל לשלוח לחברים ולבני משפחה.
                            <br />
                            במפגש סגור- בנוסף ללינק, יופיע גם קוד ההצטרפות למפגש. כשאתה מזמין אנשים למפגש חשוב שתשלח להם את הקישור ואת הקוד הצטרפות.

                        <br />
                        במפגש פתוח- כל אחד שיכנס למפגש שיצרת יוכל לבצע הליך של הרשמה כמשתתף ולקבל קישור למפגש שלך. המשתתפים יהיו חלקם מהקהל הרחב וחלקם מוכרים לך, כי הזמנת אותם דרך האמצעים השונים.
                        </div> :

                            <div>
                                In a closed meet-up - after creating the meet-up you will receive two emails; one from us and one from Zoom. In the email you receive from us there will be a meet-up code. When you invite participants to your meet-up, you must provide the meet-up link and code. All registration is through our website and you can update the number of participants online.
                                <br />
                                In an open meet-up - anyone who enters your meet-up can register for it online, and can receive a link for the open meet-up. Participants will be partly general public and partly people that you know, since you already invited them. You can see the updated number of participants on your meet-up page.
                            </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === 'openMeetingQ') {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>{translationHEB.openMeetingA}</div>
                    </InfoCard>
                }

                else if (arrayQuestion[index] === 'closedMeetingQ') {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>{translationHEB.closedMeetingA}</div>
                    </InfoCard>
                }

                else if (arrayQuestion[index] === "couldNotSignUpQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            חשוב לנסות להבין מה סוג הבעיה בהרשמה, <a target="_blank" href="https://connect2care.ourbrothers.co.il/#/contact">ותפנה אלינו</a> - כך נוכל לסייע לך, אנא כתוב בצורה מפורטת מה הבעיה ונשמח לסייע.
                            </div> :
                            <div>
                                Please <a target="_blank" href="https://connect2care.ourbrothers.co.il/#/contact">contact us</a>  with the problem - so that we can assist you, please describe the problem in detail and we will be happy to help.
                            </div>}
                    </InfoCard>


                else if (arrayQuestion[index] === "guidanceZoom&buildTheNightQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            בהחלט! צוות ההדרכה שלנו עמל רבות והכין עבורך סדנה וירטואלית לניהול המפגש.<br />
                        הסדנה תועבר בזמן אמת אונליין בzoom על ידי מרצים מומחים בתחומי התוכן והדיגיטל. ניתן להשתבץ לאחד או יותר מהמועדים לבחירתך. ההרשמה ממש <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdysCMih5-VnB241KuP9zFbLyju9NqShDwntZHpBcUsGntqLg/viewform"> כאן ערכת תוכן</a>.
                        </div> :
                            <div>
                                Definitely! Our team has been working hard to prepare a virtual workshop for running sessions.<br />
                                This workshop will be run online through Zoom, by public speaking experts and digital content experts. You can sign up for one or more of the sessions <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdysCMih5-VnB241KuP9zFbLyju9NqShDwntZHpBcUsGntqLg/viewform">here</a>.

                            </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "successfulMeetingQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            שוב שיהיה לצידך חבר/ בן משפחה שידאג לכל הצד הטכני - שהזום עובד, המצלמה תקינה, ואם יש צורך אז גם להשתיק קולות מפריעים. כמו כן, חשוב להגיע עם מסרים שאותם רוצים להעביר.
                            השתתפות ב
                            <a target="_blank" href="https://connect2care.ourbrothers.co.il/static/media/ercatMovil.9a402ee4.pdf">בערכת ההדרכה</a>.
                            יתרמו לך רבות.
                        </div> :
                            <div>
                                Ensure that you have a “host” close by, who will be your technical support, that the Zoom and camera are working, and if you must then to mute background noise. You should arrive with the message that you would like to pass on.<br />
                                You can always refer to the <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">preparatory workshop</a> and <a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">content pack</a>.
                                </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "behindTheProjectQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            מאחורי המיזם עומדת עמותת
                            <a target="blank" href="https://ourbrothers.co.il/home"> האחים שלנו </a>
                            אשר הוקמה במטרה לבנות - לראשונה בישראל - קהילה תומכת ומעצימה עבור האחים השכולים במדינה. העמותה הוקמה בשנת 2017 על ידי אחים שכולים ומתנדבים מכלל החברה הישראלית בכדי לתת בפעם הראשונה מקום לכאב, להתמודדות ולסיפור הייחודי שלנו, האחים השכולים. ניתן לקרוא אלינו עוד
                            <a target="blank" href="https://ourbrothers.co.il/home"> כאן </a>
                        </div> :
                            <div>
                                Behind the scenes is the “Our Brothers” Project that was founded in order to create - for the first time in Israel - a supportive and empowering peer community for bereaved brothers and sisters in the country. <br />
                                This non-profit was founded in 2017 by bereaved siblings and volunteers in order to provide a space for pain, coping and our unique stories, the bereaved siblings. You can read more about us <a target="_blank" href="https://ourbrothers.co.il/about">here</a>.
                            </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "supportTheProjectQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            פרויקט 'מתחברים וזוכרים' הוקם ע"י עמותת 'האחים שלנו' והוא וולנטרי, ללא מטרות רווח במטרה להעצים את יום הזיכרון לחללי ישראל ונפגעי פעולות האיבה.
                            ניתן לתרום לפרויקט ולעמותת 'האחים שלנו' בלחיצה על לשונית
                            <a target="blank" href="https://ourbrothers.co.il/donate"> תרומה לפרוייקט </a>
                        </div> :
                            <div>
                            </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "playVideoQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            ניתן לעשות זאת באמצעים של תוכנת ZOOM, בה מתקיימים המפגשים בדרך וירטואלית. למידע נוסף ניתן לקרוא ב
                            <a target="blank" href="https://connect2care.ourbrothers.co.il/static/media/ercatMovil.9a402ee4.pdf">ערכת ההדרכה </a>
                            שהכנו עבורך ולהצטרף לאחד
                            <a target="blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdysCMih5-VnB241KuP9zFbLyju9NqShDwntZHpBcUsGntqLg/viewform"> מסדנאות ההכנה </a>
                        </div> :
                            <div>
                                Through Zoom, the program that is hosting our virtual meet-ups. <br />
                                You can read more in our <a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">hosting pack</a> or join the <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">preparatory workshop</a>.

                            </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "inviteToMeetingQ")
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        {props.LanguageStore.lang === "heb" ?
                            <div>
                                בכדי להזמין משתתפים נוספים למפגש שלך, כל שעליך לעשות הוא להכנס
                                <a target="blank" href="https://connect2care.ourbrothers.co.il/#/meetings"> למפגש שיצרת באתר </a>
                                וללחוץ על כפתור 'הזמינו למפגש' - העתיקו את הקישור ופרסמו בקבוצות הוואטסאפ שלכם, בקיר הפייסבוק ובמייל - והזמינו את בני המשפחה והחברים. או לחילופין, להעתיק את הלינק של עמוד המפגש ולשלוח אנשים להכנס פנימה ולהרשם כמשתתפים.

                            </div> :
                            <div>
                                Through Zoom, the program that is hosting our virtual meet-ups. <br />
                                You can read more in our <a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">hosting pack</a> or join the <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">preparatory workshop</a>.

                            </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === 'doNotSeeTheMeetingQ') {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>{translationHEB.doNotSeeTheMeetingA}</div>
                    </InfoCard>
                }

                else if (arrayQuestion[index] === 'additionalLanguagesQ') {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>{translationHEB.additionalLanguagesA}</div>
                    </InfoCard>
                }

                else if (arrayQuestion[index] === 'moreThanOneMeetingQ') {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>{translationHEB.moreThanOneMeetingA}</div>
                    </InfoCard>
                }

                else if (arrayQuestion[index] === 'joinMeetingQ') {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>ניתן לבחור בעמוד
                            <a href="https://connect2commemorate.ourbrothers.co.il/#/meetings"> רשימת המפגשים </a>
                            את המפגש הנכון עבורך. בסרגל כלים העליון יש אופציות סינון לפי סוג המפגש, תאריכים, שעות, כמות משתתפים וחיפוש חופשי. הקלקה על מפגש ספציפי יפתח חלונית בו יש פירוט על המפגש.
                            לאחר שבחרת את המפגש אליו אתה רוצה להצטרף, יש למלא פרטים ולחכות למייל.
                            למפגשים סגורים יש צורך בקוד מפגש שניתן לך ע"י מוביל המפגש.
                        </div>
                    </InfoCard>
                }

                else if (arrayQuestion[index] === 'maxAndMinParticipantsQ') {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>{translationHEB.maxAndMinParticipantsA}</div>
                    </InfoCard>
                }

                else if (arrayQuestion[index] === 'fewFallenQ') {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>{translationHEB.fewFallenA}</div>
                    </InfoCard>
                }

                else if (arrayQuestion[index] === 'getZoomLinkQ') {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>{translationHEB.getZoomLinkA}</div>
                    </InfoCard>
                }

                else if (arrayQuestion[index] === 'zoomTimeLimitQ') {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>{translationHEB.zoomTimeLimitA}</div>
                    </InfoCard>
                }

                else if (arrayQuestion[index] === 'allAgesQ') {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>{translationHEB.allAgesA}</div>
                    </InfoCard>
                }

                else if (arrayQuestion[index] === 'meetingCanceledQ') {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>{translationHEB.meetingCanceledA}</div>
                    </InfoCard>
                }

                else if (arrayQuestion[index] === 'isMeetingRecorededQ') {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>{translationHEB.isMeetingRecorededA}</div>
                    </InfoCard>
                }

                else if (arrayQuestion[index] === 'meetingParticepantsQ') {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>{translationHEB.meetingParticepantsA}</div>
                    </InfoCard>
                }


                else if (arrayQuestion[index] === 'hostNotHostQ') {
                    return <InfoCard key={index} title={props.t(arrayQuestion[index])}>
                        <div>{translationHEB.hostNotHostA}</div>
                    </InfoCard>
                }


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