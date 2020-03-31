import React, { Component } from 'react';
import '../styles/explanation.css'

class Explanation extends Component {

    render() {
        return (

            <div className='containExplanation' style={this.props.explanation === 1 ? {paddingTop:'7vw'} : {}}>

                {this.props.explanation === 1 ?
                    <div className='explanation'>
                        חלקנו, מחכים למפגש יום הזיכרון כל השנה.<br />
                    אחרים, הופכים שמיים וארץ, רק לא לוותר.<br />
                        <strong>והשנה? נמשיך בדיוק כך.</strong><br /><br />
                    מפגשי זיכרון, קורונה 2020 – אנחנו מוכנים.<br /><br />
                    הכנו עבורכם את כל מה שצריך כדי להסתכל האחד לשני בעיניים.<br />
                    לספר שוב את אותו הסיפור שכולם מכירים.<br />
                    לפתוח עוד בירה. <br />
                    לצחוק. לבכות. לזכור.
               </div> :
                    <div className='explanation'>
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

export default Explanation;