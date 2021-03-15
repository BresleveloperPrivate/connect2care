import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withNamespaces } from "react-i18next";
import "../styles/explanation.css";
import Group268 from "../icons/Group268.png";

class Explanation extends Component {
  render() {
    return (
      <div
        className={
          this.props.explanation === 1
            ? " containFirstExplanation containExplanation"
            : "containExplanation"
        }
      >
        {this.props.explanation === 1 ? (
          this.props.LanguageStore.lang !== "heb" ? (
            <div className="explanation-left">
              <div className="explanation-headline1">
                <strong>
                  “So long as we are being remembered, we remain alive.”
                </strong>
              </div>
              <div className="explanation-headline2">- Carlos Ruiz Zafón</div>
              This last year was so complex, it was a year filled with
              uncertainty and loneliness.
              <br />
              On this memorial day we wish to be together,
              <br />
              embrace each other, connect and grow stronger together.
              <br />
              Therefore, this year as every other year, we invite you to connect
              with us.
              <br />
              Connect to our brothers and sisters, our friends, our families -
              and join our journey of memory and unity.
              <br />
              “Our Brothers” connects the people of Israel and the rest of the
              world,
              <br />
              on this Yom Hazikaron 2021, to the stories of the fallen,
              <br />
              The stories that were heard, and also to those that were not.
              <br />
              <p className="this-year">
                <strong>“Our Brothers” connects and remembers them all.</strong>
              </p>
            </div>
          ) : (
            <div className="explanationTotal">
              {/* <div className='backgroundFlower'><img src={Group268} alt='flower' /></div> */}
              <div className="explanation-right">
                <div className="explanation-right-headlines">
                  <div className="explanation-headline1">
                    <strong>"כל עוד מישהו זוכר אותנו, אנחנו חיים"</strong>
                  </div>
                  <div className="explanation-headline2">
                    (קרלוס רואיס סאפון)
                  </div>
                </div>

                <div className="explanation-right-text">
                  {/* <strong>"כל עוד מישהו זוכר אותנו, אנחנו חיים"</strong><br />
                                    (קרלוס רואיס סאפון) <br /><br /> */}
                  השנה האחרונה הייתה מורכבת, <br />
                  שנה מלאה בחוסר ודאות, הרבה חיכוכים והרבה בדידות.
                  <br />
                  ביום הזיכרון אנחנו רוצים להיות ביחד, להתחבק, להתחבר ולהתחזק
                  ביחד. <br />
                  ולכן גם השנה - אנחנו מזמינים אתכם להתחבר איתנו. <br />
                  להתחבר לאחים שלנו, לחברים שלנו, <br />
                  לבני המשפחה שלנו ולצאת איתנו למסע של זיכרון, הנצחה ואחדות.{" "}
                  <br />
                  <br />
                  עמותת "האחים שלנו" מחברת את ישראל והעולם ביום הזיכרון לחללי
                  מערכות ישראל ונפגעי פעולות האיבה 2021 אל סיפורי הנופלים,
                  <br />
                  ביחד, ניזום ונשתתף במפגשי זיכרון וירטואליים.
                  <br />
                  אל הסיפורים שנשמעו, ואל אלה שעדיין לא.
                  <br />
                  {/* השנה כולנו מתחברים וזוכרים.<br /> */}
                  <p className="this-year">
                    <strong>העמותה מחברת וזוכרת את כולם.</strong>
                  </p>
                </div>
              </div>
            </div>
          )
        ) : this.props.LanguageStore.lang !== "heb" ? (
          <div className="explanation-left">
            We are Our Brothers. And we're here to talk life.
            <br />
            We established our brothers, the bereaved siblings,
            <br />
            To keep talking about life with them. From our perspective.
            <br />
            <br />
            About the laughs, the nonsense, the quarrels, the conversations.
            <br />
            Everything that was between us and is over.
            <br />
            Our community is powerful, accepting, embracing and joyful.
            <br />
            We continue to celebrate life, and live alongside the bereaved.
            <br />
            <br />
            Our goal is to remind and remember our own siblings,
            <br />
            And in the same breath, create a national and global movement of
            memory and commemoration.
            <br />
          </div>
        ) : (
          <div className="explanation-right">
            את עמותת "האחים שלנו" הקמנו אנחנו, האחים השכולים,
            <br />
            כדי להמשיך ולדבר על החיים איתם ובלעדיהם - מהזווית שלנו.
            <br />
            על הצחוקים, השטויות, הריבים, השיחות. כל מה שהיה בינינו ונגמר
            <br />
            <br />
            הקהילה שלנו עוצמתית, מכילה ומחבקת.
            <br />
            אנחנו ממשיכים, זוכרים, וגדלים לצד השכול.
            <br />
            <br />
            המטרה שלנו היא להזכיר ולזכור את האחים הפרטיים שלנו
            <br />
            ובאותה נשימה, ליצור תנועה ארצית ועולמית של זיכרון והנצחה.
            <br />
          </div>
        )}
      </div>
    );
  }
}

// export default Explanation;

export default inject(
  "i18n",
  "LanguageStore"
)(observer(withNamespaces()(Explanation)));
