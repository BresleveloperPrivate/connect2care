import React, { Component, Suspense } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from './modules/auth/PrivateRoute';

import './App.scss';
import './styles';
import './styles/animations.scss'

import loadable from '@loadable/component';
import NavBar from './components/NavBar'

const Home = loadable(() => import('./components/Home.js'));
const Success = loadable(() => import('./components/Success.jsx'));
const Meeting = loadable(() => import('./components/Meeting.jsx'));
const Share = loadable(() => import('./components/Share.jsx'));
const CreateMeeting = loadable(() => import('./components/CreateMeeting'));
const ListOfMeetingsUser = loadable(() => import('./components/listOfMeetingsUser'));

const DashboardMain = loadable(() => import('./dashboard/components/DashboardMain'));
const DashLogin = loadable(() => import('./dashboard/components/DashLogin'));

class App extends Component {
    render() {
        console.log("sdfsadf", this.props.history)
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    {/* <PrivateRoute path="/(main|add-student|staff-list|add-staff-member|settings/class|students/class|class|settings|edit-staff-member|show-staff-member|student)/" compName='StaffNavBar' component={() => <StaffNavBar changeLanguage={this.changeLanguage} t={this.props.t} />} /> */}
                    <div className="App">
                        <Route path="/(meeting|create-meeting|success|edit-meeting|share|meetings)/"  render={props => <NavBar history={this.props.history} className={'navbar-opening'} {...props} />} />
                        <Route path="/" exact render={props => <NavBar history={this.props.history} className={'navbar-opening'} {...props} />} />
                        <Switch>
                            <Route path="/success" exact component={Success} />
                            <Route path="/" exact render={props => <Home {...props} />} />
                            <Route path="/meeting/:meetingId" render={props => <Meeting {...props} />} />
                            <Route path="/meetings" exact render={props => <ListOfMeetingsUser {...props} />} />
                            <Route path="/create-meeting" exact render={props => <CreateMeeting {...props} />} />
                            <Route path="/edit-meeting/:id" exact render={props => <CreateMeeting {...props} />} />
                            <Route path="/share" exact component={Share} />
                            <Route path="/login" render={(props) => <DashLogin {...props} />} />
                            <PrivateRoute path="/dashboard" compName='DashboardMain' defaultRedirectComp={<Redirect to='/login' />} component={DashboardMain} />
                        </Switch>
                    </div>
                </Router>
            </Suspense>
        );
    }
}

export default App;