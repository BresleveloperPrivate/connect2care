import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withNamespaces } from 'react-i18next'
import '../styles/explanation.css'

class Explanation extends Component {

    render() {
        return (

            <div className={this.props.explanation === 1 ? ' containFirstExplanation containExplanation' : 'containExplanation'} >

                {this.props.explanation === 1 ?
                    <div className={this.props.LanguageStore.lang !== 'heb' ? 'explanation-left': 'explanation-right'}>
                        {this.props.t("someOfUsWaitingForTheMemorialDayMeetingAllYear")}.<br />
                        {this.props.t("othersBecomeSkyAndEarthJustNotToGiveUp")}.<br />
                        <strong>{this.props.t("andThisYearWellContinueJustLikeThat")}.</strong><br /><br />
                        {this.props.t("memoryMeetingsCorona2020WereReady")}.<br /><br />
                        {this.props.t("weHavePreparedForYouAllYouNeedToLookEachOtherInTheEye")}.<br />
                    לספר שוב את אותו הסיפור שכולם מכירים.<br />
                    לפתוח עוד בירה. <br />
                    לצחוק. לבכות. לזכור.
               </div> :
                    <div className={this.props.LanguageStore.lang !== 'heb' ? 'explanation-left': 'explanation-right'}>
                        אנחנו האחים שלנו. ואנחנו כאן כדי לדבר חיים.<br />
                        את 'האחים שלנו' הקמנו אנחנו, האחים השכולים,<br />
                         כדי להמשיך ולדבר על החיים איתם. מהזווית שלנו.<br /><br />
                          על הצחוקים, השטויות, הריבים, השיחות. כל מה שהיה בינינו ונגמר.<br />
                           הקהילה שלנו עוצמתית, מכילה, מחבקת ושמחה.<br />
                            אנחנו ממשיכים לחגוג את החיים, ולחיות לצד השכול.<br /><br />
                             המטרה שלנו היא להזכיר ולזכור את האחים הפרטיים שלנו<br />
                              ובאותה נשימה, ליצור תנועה ארצית ועולמית של זיכרון והנצחה.<br />
                    </div>
                }

            </div>

        );
    }
}

// export default Explanation;

export default inject('i18n','LanguageStore')(observer(withNamespaces()(Explanation)));
