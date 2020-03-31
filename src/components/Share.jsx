import React, { Component } from 'react';

class Share extends Component {

    shareWithWhatsApp = async () => {
        const text = `הי, נרשמתי למאגר מתנדבים של המדינה. עושים הכל לסייע בתקופה של הקורונה, זה מהיר ונגיש לכל העמותות כך שלא צריך להרשם במליון מקומות… תצטרף גם? מצא 20 חברים ושלח להם את הקישור הבא:`
        // const linkText = text + " " + this.state.inviteLink;
        const linkText = text + " " + "https://github.com/";
        const href = `whatsapp://send?text=${linkText}`;
        window.location.href = href;
    };

    copyToClipboard = (str) => {
        // Create new element
        var el = document.createElement('textarea');
        // Set value (string to be copied)
        el.value = str;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style = { position: 'absolute', left: '-9999px' };
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
        // Remove temporary element
        document.body.removeChild(el);
    }

    render() {

        return (
            <div className="navBarMargin">
                <button onClick={this.shareWithWhatsApp}>whatsApp</button>
                <button >facebook</button>
                <button >mail</button>
                {document.queryCommandSupported('copy') && <button onClick={() => this.copyToClipboard("https://ourbrothers.co.il/donate")}>copy link</button>}
            </div>
        );
    }
}

export default Share;