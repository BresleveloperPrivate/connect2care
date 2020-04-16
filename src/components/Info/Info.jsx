import React from 'react';

import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import InfoCard from './InfoCard';

const Info = () => {
    return (
        <div id="infoPage">
            <div className="createMeetingHeadLine margin-right-text" style={{ marginTop: "12vh" }}>שאלות ותשובות</div>
            <div className="createMeetingSecondSentence margin-right-text">משפט קופי שמסביר מה זה אומר...</div>
            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, index) => (
                <InfoCard key={index} title="mikmek">
                    שדגכשדג כדגשכ דשגכ שדגכשדג כשדגכ שדגכ שדגכד ג כדג כשדגכ שדגכ שששדג כדכ שדגכשדג כדגשכ דשגכ שדגכשדג כשדגכ שדגכ שדגכד ג כדג כשדגכ שדגכ שששדג כדכ שדגכשדג כדגשכ דשגכ שדגכשדג כשדגכ שדגכ שדגכד ג כדג כשדגכ שדגכ שששדג כדכ
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