import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Signup from "./signup"
import Signin from "./signin"
import DashboardForCustomer from "./dashboardForCustomer"
import DashboardForRestaurant from "./dashboardforRestaurant"

function Navigation() {
    return (
        <Router>
            <Route exact path="/" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/dashboardforRestaurant" component={DashboardForRestaurant} />
            <Route path="/dashboardForCustomer" component={DashboardForCustomer} />
        </Router>
    )
}

export default Navigation;