import React from 'react';
import { useMount } from 'react-use';

import Auth from '../modules/auth/Auth';

const Meeting = ({ match: { params } }) => {
    const { meetingId } = params;

    useMount(async () => {
        const [res, error] = await Auth.superAuthFetch(`/api/meetings/GetMeetingInfo/${meetingId}`);
        if (error || res.error) { console.log("woo too bad: ", error); return;}
    });

    return (
        <div>
            {meetingId}
        </div>
    );
}

export default Meeting;