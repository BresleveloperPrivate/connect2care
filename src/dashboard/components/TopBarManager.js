import React from 'react';
import '../style/topBarManager.scss'

const TopBarManager = () => {

    return (
        <div>
            <div className="topBar d-flex align-items-center">
                <div style={{ fontSize: '4vh', fontWeight: 'bolder', padding: '0 8vw' }}>מתחברים וזוכרים</div>
                <div className="empty managerName">
                    {/* משה לוי */}
                </div>
            </div>
            <div style={{ height: "7vh" }}></div>
        </div>
    );
}

export default TopBarManager;