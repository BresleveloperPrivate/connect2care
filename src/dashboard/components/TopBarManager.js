import React from 'react';
import '../style/topBarManager.scss'
import logoutIcon from '../icons/logOut.svg'
import Auth from '../../modules/auth/Auth'

const TopBarManager = () => {

    const logOut = async () => {
        Auth.logout(() => {
            let path = "/"
            if (window.location.hash === "") //normal 
            {
                if (window.location.pathname === path) {
                    window.location.reload(false);
                }
                else {
                    window.location.pathname = path;
                }
            }
            else //hash is probably #/, cordova and hash router case.
            {
                if (window.location.hash === ("#" + path)) {
                    window.location.reload(false);
                }
                else {
                    window.location.hash = "#" + path;
                }
            }
        });
    }

    return (
        <div>
            <div className="topBar d-flex align-items-center">
                <div style={{ fontSize: '4vh', fontWeight: 'bolder', padding: '0 10vw', paddingLeft: '61vw' }}>מתחברים וזוכרים</div>
                <div className="managerName">
                    {/* משה לוי */}
                    <img src={logoutIcon} alt='התנתק' className="pointer" style={{ width: '3.5vh' }} onClick={logOut}/>
                </div>
            </div>
            <div style={{ height: "7vh" }}></div>
        </div>
    );
}

export default TopBarManager;