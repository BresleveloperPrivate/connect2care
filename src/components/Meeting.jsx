import React from 'react';
import { useMount } from 'react-use';

const Meeting = ({ match: { params } }) => {
    const { meetingId } = params;

    useMount(async () => {
        // get meeting
    });

    return (
        <div>
            {meetingId}
        </div>
    );
}

export default Meeting;