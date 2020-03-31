import React, { Component, Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';
import './styles/animations.scss'

import loadable from '@loadable/component';
import NavBar from './components/NavBar'


const Home = loadable(() => import('./components/Home.js'));
const Success = loadable(() => import('./components/Success.jsx'));
const Share = loadable(() => import('./components/Share.jsx'));
const CreateMeeting = loadable(() => import('./components/CreateMeeting'));


class App extends Component {


    render() {

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    {/* <PrivateRoute path="/(main|add-student|staff-list|add-staff-member|settings/class|students/class|class|settings|edit-staff-member|show-staff-member|student)/" compName='StaffNavBar' component={() => <StaffNavBar changeLanguage={this.changeLanguage} t={this.props.t} />} /> */}
                    <div className="App">
                        <NavBar history={this.props.history} className={'navbar-opening'} />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/success" exact component={Success} />
                            <Route path="/share" exact component={Share} />
                            <Route path="/create-meeting" exact component={CreateMeeting} />
                        </Switch>
                    </div>
                </Router>
            </Suspense>
        );
    }
}

export default App;