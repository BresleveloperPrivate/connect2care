import React from 'react';

import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { inject, observer } from 'mobx-react';

import InfoCard from './InfoCard';

const Info = (props) => {
    const arrayQuestion = [
        "מה זה אומר ליזום מפגש?",
        "יצרתי מפגש, מה עכשיו?",
        "איך אני מזמין אנשים למפגש?",
        "איך ההרשמה למפגש שלי מתקיימת?",
        "מה זה אומר מפגש פתוח?",
        "מה זה אומר מפגש סגור?",
        "לא הצלחתי להירשם, מה לעשות?",
        "קיבלתי מייל מזום, מה לעשות?",
        "יצרתי מפגש אבל אני לא רואה אותו ברשימת מפגשים, למה?",
        "האם אני יכול לדבר בשפות נוספות?",
        "האם אני יכולה לקיים מעל מפגש אחד?",
        // "אנחנו קבוצה של אנשים שרוצים לפתוח מפגש ואין מי שיספר, מה עושים?",
        "איך אני מצטרף למפגש?",
        "מה המקסימום והמינימום של משתתפים במפגש?",
        "האם אני יכולה לקיים מפגש של כמה נופלים?",
        "מעולם לא העברתי מפגש מקוון, האם יש לכם הדרכה על השימוש בזום ובניית הערב?",
        "מה צריך להכין למפגש מוצלח?",
        "מי אתם? מי עומד מאחורי המיזם?",
        "האם המיזם מתאים לכל גיל?",
        "המפגש שלי בוטל, מה אני עושה?",
        "אני רוצה להקרין סרטון במהלך המפגש, איך אני עושה את זה?",
        "מה זה מפגשי האחים שלנו? מפגשי בית אביחי?"
    ]
    const arrayAnswers = [
        "אדם קרוב לנופל/ים (למשל, בני משפחה או חבר לצוות) האחראי לתכנון המפגש, הכנת התוכן והזמנת המשתתפים.",
        "",
        "בכדי להזמין משתתפים נוספים למפגש שלך, כל שעליך לעשות הוא להיכנס למפגש שלך - וללחוץ על כפתור 'הזמינו למפגש' - זהו, עכשיו העתיקו את הקישור לקבוצות הווטסאפ שלכם, לקיר בפייסבוק וגם למייל - והזמינו את בני המשפחה והחברים.",
        "",
        "מפגש הפתוח לכל אחד, בכל מקום.",
        "מפגש אשר מתוכנן למעגל סגור של משתתפים (למשל, בני משפחה או כיתה).",
        "",
        "",
        "כדי לשמור על אבטחת מידע, אנחנו בודקים כל מפגש. אנחנו ניצור איתך קשר לאחר פתיחת המפגש על מנת לאשר את הפרטים. אם הכל תקין, המפגש יואשר ותוכל לראות אותו ברשימת המפגשים כמפגש חדש שנוסף.",
        "כמובן, ואף רצוי. ניתן לייצר מספר מפגשים במספר שפות שונות - יש לך אפשרות לדבר בכל שפה בה אתה שולט.",
        "כמובן, ואף רצוי. ניתן לייצר מס' מפגשים ובהם ניתן לדבר מול קהלי יעד שונים ושפות שונות.",
        // "",//not have an answer
        `ניתן לבחור בעמוד 'רשימת המפגשים' את המפגש הנכון עבורך. המפגשים הראשונים, הם האחרונים שנוצרו. ניתן לסנן את סוג המפגש, שעות, תאריכים וחיפוש חופשי. ניתן לקרוא על הסיפור האישי בהקלקה על המפגש. לאחר שבחרת את המפגש אליו אתה רוצה להצטרף, יש למלא פרטים ולחכות למייל. למפגשים סגורים יש צורך בקוד מפגש שניתן לך ע"י מארגן המפגש.`,
        "ניתן לקיים מפגש שמתאים לעד 500 משתתפים, המינימום תלוי בך. ניתן לקבוע כמות משתתפים במפגש בתוך העמוד של יצירת מפגש חדש.",
        "בהחלט! בעת ההרשמה למפגש תוכל למלא את שמם של מספר נופלים שקרובים לליבך ולספר עליהם. ניתן לספר על עד 10 נופלים בשיחה אחת.",
        "",
        "",
        "",
        "בהחלט כן. שימו לב שאם מדובר באוכלוסייה צעירה יותר, יש לכוון את המפגש לכך.",
        "יכול להיות מצב בו יוזם המפגש מבטל את המפגש, במצב כזה אתה תקבל מייל המתריע על כך. ניתן להכנס לרשימת המפגשים ולבחור מפגש חדש.",
        "",
        `מפגשי האחים שלנו, אלו מפגשים מיוחדים שנוצרו בשיתופי פעולה שונים ומפגשי בית אביחי, אלו מפגשים שנוצרו ע"י בית אביחי כחלק מפרויקט 'פנים יום זיכרון'`,
    ]

    return (
        <div id="infoPage">
            <div className="createMeetingHeadLine margin-right-text" style={{ marginTop: "12vh" }}>{props.LanguageStore.lang === "heb" ? "שאלות ותשובות" : "Questions and Answers"}</div>
            <div className="createMeetingSecondSentence margin-right-text">{props.LanguageStore.lang === "heb" ? "שאלות ותשובות ששאלתם אותנו" : "Questions and Answers you asked us"}</div>
            {arrayQuestion.map((_, index) => {

                if (arrayQuestion[index] === "יצרתי מפגש, מה עכשיו?")
                    return <InfoCard key={index} title={arrayQuestion[index]}>{props.LanguageStore.lang === "heb" ? <div>
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

                else if (arrayQuestion[index] === "איך ההרשמה למפגש שלי מתקיימת?")
                    return <InfoCard key={index} title={arrayQuestion[index]}>
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

                else if (arrayQuestion[index] === "לא הצלחתי להירשם, מה לעשות?")
                    return <InfoCard key={index} title={arrayQuestion[index]}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            חשוב לנסות להבין מה סוג הבעיה בהרשמה, <a target="_blank" href="https://ourbrothers.co.il/contact?referer=connect-2-care">ותפנה אלינו</a> - כך נוכל לסייע לך, אנא כתוב בצורה מפורטת מה הבעיה ונשמח לסייע.
                            </div> :
                            <div>
                                It is important to try to understand what the problem is with enrollment, and <a target="_blank" href="https://ourbrothers.co.il/contact?referer=connect-2-care">contact us</a> - so that we can assist you, please write down in detail what the problem is and we will be happy to assist.
                            </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "קיבלתי מייל מזום, מה לעשות?")
                    return <InfoCard key={index} title={arrayQuestion[index]}>
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

                else if (arrayQuestion[index] === "מעולם לא העברתי מפגש מקוון, האם יש לכם הדרכה על השימוש בזום ובניית הערב?")
                    return <InfoCard key={index} title={arrayQuestion[index]}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            בהחלט! צוות ההדרכה שלנו עמל רבות והכין עבורך סדנה וירטואלית לניהול המפגש.<br />
                        הסדנה תועבר בזמן אמת אונליין בzoom על ידי מרצים מומחים בתחומי התוכן והדיגיטל. ניתן להשתבץ לאחד או יותר מהמועדים לבחירתך. ההרשמה ממש <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">כאן</a>.
                        </div> :
                            <div>
                                Definitely! Our training team has worked hard and prepared a virtual workshop for you to manage the meeting.<br />
                                The workshop will be delivered online in real-time in zoom by expert lecturers in content and digital. You can go to one or more of your chosen dates. Sign up <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">right here</a>.

                            </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "מה צריך להכין למפגש מוצלח?")
                    return <InfoCard key={index} title={arrayQuestion[index]}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            חשוב שיהיה לצידך "מארח", שידאג לכל הצד הטכני, שהזום עובד, המצלמה תקינה, ואם יש צורך אז גם להשתיק קולות מפריעים. כמו כן, חשוב להגיע עם מסרים שאותם רוצים להעביר.<br />
                            <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">בסדנאות ההכנה</a> ניתן להיעזר ו<a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">בערכת ההדרכה</a>.
                        </div> :
                            <div>
                                It is important that you have a "host" on your side, who will take care of all the technical side, that the zoom is working, the camera is working properly, and if necessary then also silence interfering sounds. It is also important to come up with messages that you want to convey.<br />
                                You can use<a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">the preparation workshops</a> and <a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">and training kit</a>.
                                </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "מי אתם? מי עומד מאחורי המיזם?")
                    return <InfoCard key={index} title={arrayQuestion[index]}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            מאחורי המיזם עומדת עמותת 'האחים שלנו' אשר הוקמה במטרה לבנות - לראשונה בישראל - קהילה תומכת ומעצימה עבור האחים השכולים במדינה.
                        העמותה הוקמה בשנת 2017 על ידי אחים שכולים ומתנדבים מכלל החברה הישראלית בכדי לתת בפעם הראשונה מקום לכאב, להתמודדות ולסיפור הייחודי שלנו, האחים השכולים. ניתן לקרוא עלינו עוד <a target="_blank" href="https://ourbrothers.co.il/about">כאן</a>.
                        </div> :
                            <div>
                                Behind the venture stands the 'Our Brothers' association, which was established with the aim of building - for the first time in Israel - a supportive and empowering community for the bereaved brothers in the country.
                                The association was founded in 2017 by bereaved brothers and volunteers from all of Israeli society to give, for the first time, room for our pain, coping and unique story, the bereaved brothers. You can read more about us <a target="_blank" href="https://ourbrothers.co.il/about">here</a>.
                            </div>}
                    </InfoCard>

                else if (arrayQuestion[index] === "אני רוצה להקרין סרטון במהלך המפגש, איך אני עושה את זה?")
                    return <InfoCard key={index} title={arrayQuestion[index]}>
                        {props.LanguageStore.lang === "heb" ? <div>
                            ניתן לעשות זאת באמצעים של תכנת ZOOM , בה מתקיימים המפגשים בדרך וירטואלית.<br />
                        ניתן לקרוא עוד ב<a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">ערכת הדרכה</a> שהכנו עבורך ולהצטרף לאחד <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">ממפגשי ההכנה</a>.
                        </div> :
                            <div>
                                This can be done by means of ZOOM software, where the sessions are held in a virtual way.<br />
                                You can read more in <a target="_blank" href="https://connect2care.ourbrothers.co.il/meetingContent.pdf">the tutorial</a> we have prepared for you and join one of <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdoihZZojnQ8-lcWlV4vSfECTyzV2Metqhn6uoHa_n5ZNScag/viewform">the preparation sessions</a>.

                            </div>}
                    </InfoCard>


                else return <InfoCard key={index} title={arrayQuestion[index]}>
                    {arrayAnswers[index]}
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