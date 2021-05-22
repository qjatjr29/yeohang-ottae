import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "../Routes/Home";
import Sights from "../Routes/Sights";

export default () => (
    <Router>
        <>
            <Navigation />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/Sights" exact component={Sights} />
                <Redirect from="*" to="/" />
            </Switch>
        </>
    </Router>
);