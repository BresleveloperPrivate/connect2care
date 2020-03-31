import React, { Component, Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';
import './styles';
import './styles/animations.scss'

import loadable from '@loadable/component';
import NavBar from './components/NavBar'

const Home = loadable(() => import('./components/Home.js'));
const Meeting = loadable(() => import('./components/Meeting.jsx'));
const Share = loadable(() => import('./components/Share.jsx'));
const CreateMeeting = loadable(() => import('./components/CreateMeeting'));

class App extends Component {
    render() {
        console.log("sdfsadf",this.props.history)
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    {/* <PrivateRoute path="/(main|add-student|staff-list|add-staff-member|settings/class|students/class|class|settings|edit-staff-member|show-staff-member|student)/" compName='StaffNavBar' component={() => <StaffNavBar changeLanguage={this.changeLanguage} t={this.props.t} />} /> */}
                    <div className="App">
                        <NavBar history={this.props.history} className={'navbar-opening'} />
                        <Switch>
                            <Route path="/" exact render={props => <Home {...props} />} />
                            <Route path="/meeting/:meetingId" render={props => <Meeting {...props} />} />
                            <Route path="/create-meeting" exact render={props => <CreateMeeting {...props} />} />
                            <Route path="/share" exact component={Share} />
                        </Switch>
                    </div>
                </Router>
            </Suspense>
        );
    }
}

export default App;