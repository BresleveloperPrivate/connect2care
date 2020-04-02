import React, { Component, Suspense } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from './modules/auth/PrivateRoute';

import './App.scss';
import './styles';
import './styles/animations.scss'

import loadable from '@loadable/component';
import NavBar from './components/NavBar'
import NotFound from './components/NotFound';

const Home = loadable(() => import('./components/Home.js'));
const Meeting = loadable(() => import('./components/Meeting/Meeting'));
const Success = loadable(() => import('./components/Success.jsx'));
const CreateMeeting = loadable(() => import('./components/CreateMeeting'));
const ListOfMeetingsUser = loadable(() => import('./components/listOfMeetingsUser'));

const DashboardMain = loadable(() => import('./dashboard/components/DashboardMain'));
const MeetingInfo = loadable(() => import('./dashboard/components/MeetingInfo'));
const DashLogin = loadable(() => import('./dashboard/components/DashLogin'));

class App extends Component {
    render() {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    {/* <PrivateRoute path="/(main|add-student|staff-list|add-staff-member|settings/class|students/class|class|settings|edit-staff-member|show-staff-member|student)/" compName='StaffNavBar' component={() => <StaffNavBar changeLanguage={this.changeLanguage} t={this.props.t} />} /> */}
                    <div className="App">
                        <Route path="/(meeting|create-meeting|success|edit-meeting|share|meetings)/"  render={props => <NavBar history={this.props.history} className={'navbar-opening'} {...props} />} />
                        <Route path="/" exact render={props => <NavBar history={this.props.history} className={'navbar-opening'} {...props} />} />
                        <Switch>
                            <Route path="/success" exact render={props => <Success {...props} />} />
                            <Route path="/" exact render={props => <Home {...props} />} />
                            <Route path="/meeting/:meetingId" render={props => <Meeting {...props} />} />
                            <Route path="/meetings" exact render={props => <ListOfMeetingsUser {...props} />} />
                            <Route path="/create-meeting" exact render={props => <CreateMeeting {...props} />} />
                            <Route path="/edit-meeting/:id" exact render={props => <CreateMeeting {...props} />} />
                            <Route path="/login" render={(props) => <DashLogin {...props} />} />
                            <Route path="/not-found" render={(props) => <NotFound {...props} />} />
                            <PrivateRoute path="/dashboard" exact compName='DashboardMain' defaultRedirectComp={<Redirect to='/login' />} component={DashboardMain} />
                            <PrivateRoute path="/dashboard/edit-meeting/:id" compName='MeetingInfo' component={MeetingInfo} />
                            
                        </Switch>
                    </div>
                </Router>
            </Suspense>
        );
    }
}

export default App;