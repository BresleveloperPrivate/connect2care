import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withNamespaces } from 'react-i18next'
import '../styles/explanation.css'

class Explanation extends Component {

    render() {
        return (

            <div className={this.props.explanation === 1 ? ' containFirstExplanation containExplanation' : 'containExplanation'} >

                {this.props.explanation === 1 ?
                    this.props.LanguageStore.lang !== 'heb' ?
                        <div className='explanation-left'>



                            Those who lost us never gave up on us.<br />
                        This year, too, we are not giving up.<br /><br />

                        Memorial Day 2020, is unlike anything we have ever known.<br />
                         This year we will not be able to reach bereaved families.<br />
                         Not to the cemeteries, not to the squares and not to the houses.<br />
                            <strong>But this year, especially this year, we continue.</strong><br /><br />

                        Together, we initiate and participate in virtual memory meetings.<br />
                        Let's look each other in the eye. We will again tell the same story that everyone knows.<br />
                        Another beer will open.<br />
                        We will laugh together. We will cry together.<br /><br />

                            <strong>This year we all connect and remember.</strong>

                        </div>
                        :
                        <div className='explanation-right'>
                            אלה שאבדו לנו מעולם לא ויתרו עלינו.<br />
                        גם השנה, אנחנו לא מוותרים עליהם.<br /><br />

                        יום הזיכרון 2020, אינו דומה לכל מה שהכרנו.<br />
                         השנה לא נוכל להגיע למשפחות השכולות.<br />
                         לא לבתי העלמין, לא לכיכרות ולא לבתים.<br />
                            <strong>אבל השנה, במיוחד השנה, אנחנו ממשיכים.</strong><br /><br />

                        ביחד, ניזום ונשתתף במפגשי זיכרון וירטואליים.<br />
                        נסתכל האחד לשני בעיניים. נספר שוב את אותו הסיפור שכולם מכירים.<br />
                        נפתח עוד בירה.<br />
                        נצחק ביחד. נבכה ביחד.<br /><br />

                            {/* השנה כולנו מתחברים וזוכרים.<br /> */}
                            <strong>השנה כולנו מתחברים וזוכרים.</strong>

                        </div>
                    :
                    this.props.LanguageStore.lang !== 'heb' ?
                        <div className='explanation-left'>

                            We are Our Brothers. And we're here to talk life.<br />
We established our 'brothers', the bereaved brothers,<br />
To keep talking about life with them. From our angle.<br /><br />

About the laughs, the nonsense, the quarrels, the conversations.<br />
 Everything that was between us and it was over.<br />
Our community is powerful, contained, embracing and joyful.<br />
We continue to celebrate life, and live alongside the bereaved.<br /><br />

Our goal is to remind and remember our private brothers,<br />
And in the same breath, create a national and global movement of memory and commemoration.<br />



                        </div>
                        :
                        <div className='explanation-right'>
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

export default inject('i18n', 'LanguageStore')(observer(withNamespaces()(Explanation)));
