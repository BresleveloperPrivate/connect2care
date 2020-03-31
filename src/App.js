import React, { Component, Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';
import './styles';

import loadable from '@loadable/component';


const Home = loadable(() => import('./components/Home.js'));
const Meeting = loadable(() => import('./components/Meeting.jsx'));


class App extends Component {


    render() {

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    <div className="App">
                        <Switch>
                            <Route path="/" exact render={props => <Home {...props} />} />
                            <Route path="/meeting/:meetingId" render={props => <Meeting {...props} />} />
                        </Switch>
                    </div>
                </Router>
            </Suspense>
        );
    }
}

export default App;