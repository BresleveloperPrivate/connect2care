import React, { Component, Suspense } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from './modules/auth/PrivateRoute';
import { Helmet } from "react-helmet";
import { observer, inject } from 'mobx-react';
import { withNamespaces } from 'react-i18next'

import './App.scss';
import './styles';
import './styles/partners.css'
import hilmaWhite from './icons/hilmaWhite.png'

import loadable from '@loadable/component';
import NavBar from './components/NavBar'
import NotFound from './components/NotFound';
// import { Dashboard } from '@material-ui/icons';

const Home = loadable(() => import('./components/Home.js'));
const Meeting = loadable(() => import('./components/Meeting/Meeting'));
const Success = loadable(() => import('./components/Success.jsx'));
const CreateMeeting = loadable(() => import('./components/CreateMeeting'));
const ListOfMeetingsUser = loadable(() => import('./components/listOfMeetingsUser'));
const Info = loadable(() => import('./components/Info/Info'));
const Contact = loadable(() => import('./components/Contact'));

// const MyMeetings = loadable(() => import('./components/MyMeetings'));

const DashboardMain = loadable(() => import('./dashboard/components/DashboardMain'));
const MeetingInfo = loadable(() => import('./dashboard/components/MeetingInfo'));
const DashLogin = loadable(() => import('./dashboard/components/DashLogin'));



class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            update: true
        }
    }

    changeLanguage = async (lang) => {
        const { i18n } = this.props;
        await i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
        this.setState({ update: false })
        this.forceUpdate()
    }

    render() {
        if (window.location.search !== "" && window.location.search.includes("?id=")) {
            let id = window.location.search.split("?id=");
            let url = `${process.env.REACT_APP_DOMAIN}/#/meeting/` + id[1];
            window.location.assign(url);
        }
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const image = urlParams.get('image');
        return (<>
            <Helmet>
                {image && <meta property="og:image" content={image} />}
            </Helmet>
            {<Suspense fallback={<div>Loading...</div>}>
                <Router>
                    <div className={this.props.LanguageStore.lang !== 'heb' ? "App-ltr" : "App-rtl"} style={{ minHeight: "calc(100vh - 5vh)" }}>
                        <Route path="/(meeting|contact|create-meeting|success|edit-meeting|share|meetings|my-meetings|info)/" render={props => <NavBar history={this.props.history} t={this.props.t} changeLanguage={this.changeLanguage} className={'navbar-opening'} {...props} />} />
                        <Route path="/" exact render={props => <NavBar t={this.props.t} changeLanguage={this.changeLanguage} history={this.props.history} className={'navbar-opening'} {...props} />} />
                        <Switch>
                            {/* <Route path="/success" exact render={props => <Success t={this.props.t} {...props} />} /> */}
                            <Route path="/" exact render={props => <Home t={this.props.t} {...props} />} />
                            <Route path="/meeting/:meetingId" render={props => <Meeting t={this.props.t} {...props} />} />
                            <Route path="/meetings" exact render={props => <ListOfMeetingsUser t={this.props.t} {...props} />} />
                            {/* <Route path="/my-meetings" exact render={props => <MyMeetings t={this.props.t} {...props} />} /> */}
                            <Route path="/create-meeting" exact render={props => <CreateMeeting t={this.props.t} {...props} />} />
                            <Route path="/edit-meeting/:id" exact render={props => <CreateMeeting t={this.props.t} {...props} />} />
                            <Route path="/amisraelhi4lomefahedmidercharoka" render={(props) => <DashLogin t={this.props.t} {...props} />} />
                            <Route path="/info" render={props => <Info t={this.props.t} {...props} />} />
                            <Route path="/contact" render={props => <Contact t={this.props.t} {...props} />} />
                            <PrivateRoute path="/ngsgjnsrjgtesg" exact compName='DashboardMain' defaultRedirectComp={<Redirect to='/amisraelhi4lomefahedmidercharoka' />}
                                component={(props) => <DashboardMain t={this.props.t} {...props} />}
                            />
                            <PrivateRoute path="/ngsgjnsrjgtesg/edit-meeting/:id" compName='MeetingInfo'
                                component={(props) => <MeetingInfo t={this.props.t} {...props} />}
                            />
                            <Route exact render={(props) => <NotFound t={this.props.t} {...props} />} />
                        </Switch>
                    </div>
                </Router>
                <div className={"hilmaCredit " + (this.props.LanguageStore.lang !== 'heb' ? 'fdrr App-ltr' : 'App-rtl')}>
                    {this.props.t('blueFooter')}
                    <div style={{ height: '1em', marginRight: '4vw', display: 'flex', zIndex:'5' }}>
                        <img src={hilmaWhite} height='100%' />
                    </div>
                </div>
            </Suspense>}
        </>
        );
    }
}

export default inject('i18n', 'LanguageStore')(observer(withNamespaces()(App)));
