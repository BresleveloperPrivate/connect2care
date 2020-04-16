import React from 'react';

const Info = () => {
    return (
        <div id="infoPage">
            <div className="createMeetingHeadLine margin-right-text" style={{ marginTop: "12vh" }}>צור קשר</div>
            <div className="createMeetingSecondSentence margin-right-text">נשמח לעזור בכל נושא. השאירו הודעה והצוות הנפלא שלנו יחזור אליכם</div>
            <div className=" margin-right-text">058-409-4624</div>
            <div className=" margin-right-text">Zikron@ourbrothers.org</div>
            <div className=" margin-right-text" onClick={() => { window.open("https://www.facebook.com/ourbrotherss") }}>Facebook</div>
            <div className=" margin-right-text" onClick={() => { window.open("https://www.instagram.com/ourbrothers2020/") }}>Instagram</div>
        </div>
    );
}


export default Info;