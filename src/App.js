import React, { Component, Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';

import loadable from '@loadable/component';


const Home = loadable(() => import('./components/Home.js'));
const Success = loadable(() => import('./components/Success.jsx'));

class App extends Component {


    render() {

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    <div className="App">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/success" exact component={Success} />
                        </Switch>
                    </div>
                </Router>
            </Suspense>
        );
    }
}

export default App;