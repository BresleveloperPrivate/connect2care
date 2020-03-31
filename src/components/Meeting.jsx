import React, { useState } from 'react';
import { useMount } from 'react-use';

import Auth from '../modules/auth/Auth';

const Meeting = ({ match: { params } }) => {
    const { meetingId } = params;

    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [description, setDescription] = useState('');
    const [relationship, setRelationship] = useState('');
    const [language, setLanguage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState('');
    const [maxParticipants, setMaxParticipants] = useState(30);

    useMount(async () => {
        // const [res, error] = await Auth.superAuthFetch(`/api/meetings/GetMeetingInfo/${meetingId}`);
        // if (error || res.error) { console.log("woo too bad: ", error); return; }
        const res = {
            name: 'מלחמת לבנון השניה',
            owner: 'משה לוי',
            description: 'אנחנו הולכים להיפגש, אבל קצת אחרת. נפגשים בבית, על הספה, לבד אבל ביחד, עם מצלמה דולקת ולב פתוח וחיבוק כל כך חזק שירגישו אותו גם מבעד למסך',
            relationship: '',
            language: 'עברית',
            isOpen: 1,
            date: '26.04',
            time: '14:00',
        }
        const { name, owner, description, relationship, language, isOpen, date, time } = res;
        setName(name);
        setOwner(owner);
        setDescription(description);
        setRelationship(relationship);
        setLanguage(language);
        setIsOpen(isOpen);
        let month, day, hour, minutes;
        const year = new Date().getFullYear();
        if (date) [day, month] = date.split('.');
        if (time) [hour, minutes] = time.split(':');
        const formatedDate = new Date(year, Number(month) - 1, day, Number(hour), Number(minutes), 0, 0);
        setDate(formatedDate);
    });

    return (
        <div id="meetingPage">
            <div id="meetingPageLeft">left</div>
            <div id="meetingPageMain">
                <p>hello</p>
                <div id="meetingPageBottom">bottom</div>
            </div>
            <div id="meetingBlankLeft"></div>
        </div>
    );
}

export default Meeting;