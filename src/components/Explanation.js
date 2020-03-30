import React, { Component } from 'react';
import '../styles/explanation.css'

class Explanation extends Component {

    render() {
        return (

            <div className='containExplanation'>

                <div className='explanation'>
                    חלקנו, מחכים למפגש יום הזיכרון כל השנה.<br/>
                    אחרים, הופכים שמיים וארץ, רק לא לוותר.<br/>
                    <strong>והשנה? נמשיך בדיוק כך.</strong><br/><br/>
                    מפגשי זיכרון, קורונה 2020 – אנחנו מוכנים.<br/><br/>
                    הכנו עבורכם את כל מה שצריך כדי להסתכל האחד לשני בעיניים.<br/>
                    לספר שוב את אותו הסיפור שכולם מכירים.<br/>
                    לפתוח עוד בירה. <br/>
                    לצחוק. לבכות. לזכור.
               </div>

            </div>

        );
    }
}

export default Explanation;