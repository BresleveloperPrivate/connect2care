import React, { Component } from 'react';

class Share extends Component {

    shareWithWhatsApp = async () => {
        const text = `הי, נרשמתי למאגר מתנדבים של המדינה. עושים הכל לסייע בתקופה של הקורונה, זה מהיר ונגיש לכל העמותות כך שלא צריך להרשם במליון מקומות… תצטרף גם? מצא 20 חברים ושלח להם את הקישור הבא:`
        // const linkText = text + " " + this.state.inviteLink;
        const linkText = text + " " + "https://github.com/";
        const href = `whatsapp://send?text=${linkText}`;
        window.location.href = href;
    };

    render() {

        return (
            <div>
                <button onClick={this.shareWithWhatsApp}>whatsApp</button>
                <button >facebook</button>
            </div>
        );
    }
}

export default Share;