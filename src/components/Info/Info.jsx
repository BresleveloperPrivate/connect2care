import React from 'react';

import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import InfoCard from './InfoCard';

const Info = () => {
    return (
        <div id="infoPage">
            <div className="createMeetingHeadLine margin-right-text" style={{ marginTop: "12vh" }}>שאלות ותשובות</div>
            <div className="createMeetingSecondSentence margin-right-text">שאלות ותשובות ששאלתם אותנו</div>
            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, index) => (
                <InfoCard key={index} title="יצרתי מפגש, מה עכשיו?">
                    קודם כל, תודה! בזכותך, אנשים רבים יציינו את יום הזיכרון ויגדילו את מגדל ההנצחה. כל שעליך לעשות הוא להתחבר למפגש דרך המייל שקיבלת מזום ולעקוב אחר ההנחיות שנשלחו אליך במייל המצורף. חשוב מאוד לשתף את המפגש ברשתות החברתיות, בין החברים האישיים שלך על מנת להזמין כמה שיותר משתתפים. מלבד זאת, על מנת לייצר מפגש מוצלח - חשוב להירשם לסדנאות ההכנה שיצרנו עבורך ולקרוא את תיק התוכן המכיל את כל המידע לקראת המפגש. לבסוף, חשוב להזמין בני משפחה וחברים - שיהוו עבורך קהל אוהד במפגש.
                </InfoCard>
            ))}
        </div>
    );
}

const theme = createMuiTheme({ direction: "rtl", palette: { primary: { main: "#082551" }, secondary: { main: "#19A099" } } });

export default props => (
    <ThemeProvider theme={theme}>
        <Info {...props} />
    </ThemeProvider>
);