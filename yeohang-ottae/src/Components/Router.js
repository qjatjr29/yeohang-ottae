import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import SideBar from "./Sidebar";
import Home from "../Routes/Home";
import Sights from "../Routes/Sights";
import Results from "../Routes/Results";
import MyLocation from "../Routes/MyLocation";

export default () => (
    <Router>
        <>
            <Navigation />
            {/* <SideBar /> */}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/Sights" exact component={Sights} />
                <Route path="/Results" exact component={Results} />
                <Route path="/MyLocation" exact component={MyLocation} />
                <Redirect from="*" to="/" />
            </Switch>
        </>
    </Router>
);