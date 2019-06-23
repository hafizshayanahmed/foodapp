import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { connect } from 'react-redux';

import Pending from "./pending"
import Inprogress from "./inprogress"
import Delivered from "./delivered"
import Addfood from "./addfood"

function dashboardforrestaurant(props) {
  return (
    <div>
      <Router>
        <nav class="navbar navbar-expand-lg navbar-dark primary-color">
          <a class="navbar-brand" href="#">FoodApp</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" href="#" to="/addfood">Add food items</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="#" to="/pending">Pending requests</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="#" to="/inprogress/">In progress</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="#" to="/delivered/">Delivered</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <div style={{ width: "350px", margin: "0 auto", textAlign: "center" }}>
          <h4>Welcome {props.user.user.restaurant}</h4>
        </div>
        <br />
        <Route path="/addfood" component={Addfood} />
        <Route path="/pending" component={Pending} />
        <Route path="/inprogress/" component={Inprogress} />
        <Route path="/delivered/" component={Delivered} />
      </Router>
    </div>
  )
}

const getValue = state => {
  return {
      user: state.user
  }
}

export default connect(getValue, null)(dashboardforrestaurant);