import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { connect } from 'react-redux';

import DashForCus from "./dashForCus"
import MyRequests from "./myRequests"
import Restaurants from "./restaurants"
import Detailedrestaurants from "./detailedrestaurant"

function dashboardforcustomer(props) {
  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark primary-color">
          <a className="navbar-brand" href="#">FoodApp</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href="#" to="/dashForCus">Dashboard</Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" href="#" to="/restaurants">Restaurants</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#" to="/myRequests">My Requests</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <div style={{ width: "350px", margin: "0 auto", textAlign: "center" }}>
          <h4>Welcome {props.user.user.name}</h4>
        </div>
        <br />
        <Route path="/dashForCus" exact component={DashForCus} />
        <Route path="/restaurants" component={Restaurants} />
        <Route path="/myRequests" component={MyRequests} />
        <Route path="/detailedrestaurant" component={Detailedrestaurants} />
      </Router>
      <br />
      <br />
    </div>
  )
}

const getValue = state => {
  return {
    user: state.user
  }
}

export default connect(getValue, null)(dashboardforcustomer);

