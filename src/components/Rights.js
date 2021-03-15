import React, { Component } from 'react';
import '../styles/rights.css';
import { inject, observer} from 'mobx-react';

class Rights extends Component {

  render() {
      return (
        <div className='rights'>
          {this.props.LanguageStore.lang !== "heb" ?
          "© 2021 All rights reserved to Connect2Commemorate"
          :
          "© 2021 כל הזכויות שמורות למתחברים וזוכרים"}
        </div>
      )
  }
}

export default inject('LanguageStore')(observer(Rights));