import React, { Component, Suspense } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from './modules/auth/PrivateRoute';
import { Helmet } from "react-helmet";
import { observer, inject } from 'mobx-react';
import { withNamespaces } from 'react-i18next'

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
const MyMeetings = loadable(() => import('./components/MyMeetings'));

const DashboardMain = loadable(() => import('./dashboard/components/DashboardMain'));
const MeetingInfo = loadable(() => import('./dashboard/components/MeetingInfo'));
const DashLogin = loadable(() => import('./dashboard/components/DashLogin'));



class App extends Component {
    
    changeLanguage = async (lang) => {
        const { i18n } = this.props;
        await i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
        this.forceUpdate()
    }

    render() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const image = urlParams.get('image');
        return (<>
            <Helmet>
                {image && <meta property="og:image" content={image} />}
            </Helmet>
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    {/* <PrivateRoute path="/(main|add-student|staff-list|add-staff-member|settings/class|students/class|class|settings|edit-staff-member|show-staff-member|student)/" compName='StaffNavBar' component={() => <StaffNavBar changeLanguage={this.changeLanguage} t={this.props.t} />} /> */}
                    <div className="App">
                        <Route path="/(meeting|create-meeting|success|edit-meeting|share|meetings|my-meetings)/" render={props => <NavBar history={this.props.history} t={this.props.t} changeLanguage={this.changeLanguage} className={'navbar-opening'} {...props} />} />
                        <Route path="/" exact render={props => <NavBar t={this.props.t} changeLanguage={this.changeLanguage} history={this.props.history} className={'navbar-opening'} {...props} />} />
                        <Switch>
                            <Route path="/success" exact render={props => <Success t={this.props.t} {...props} />} />
                            <Route path="/" exact render={props => <Home t={this.props.t} {...props} />} />
                            <Route path="/meeting/:meetingId" render={props => <Meeting t={this.props.t} {...props} />} />
                            <Route path="/meetings" exact render={props => <ListOfMeetingsUser t={this.props.t} {...props} />} />
                            <Route path="/my-meetings" exact render={props => <MyMeetings t={this.props.t} {...props} />} />
                            <Route path="/create-meeting" exact render={props => <CreateMeeting t={this.props.t} {...props} />} />
                            <Route path="/edit-meeting/:id" exact render={props => <CreateMeeting t={this.props.t} {...props} />} />
                            <Route path="/login" render={(props) => <DashLogin t={this.props.t} {...props} />} />
                            <PrivateRoute path="/dashboard" exact compName='DashboardMain' defaultRedirectComp={<Redirect to='/login' />} component={DashboardMain} />
                            <PrivateRoute path="/dashboard/edit-meeting/:id" compName='MeetingInfo' component={MeetingInfo} />
                            <Route exact render={(props) => <NotFound t={this.props.t} {...props} />} />
                        </Switch>
                    </div>
                </Router>
            </Suspense>
        </>
        );
    }
}

export default inject('i18n')(observer(withNamespaces()(App)));
