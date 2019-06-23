import React, { Component } from 'react';
import Firebase from "./config"

import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge } from "mdbreact";

import { connect } from 'react-redux';

class myRequests extends Component {
  constructor() {
    super();
    this.state = {
      con: false
    }
  }

  componentDidMount() {
    Firebase.database().ref("pendingOrders").on("child_added", e => {
      let val = e.val();
      let values = Object.values(val)
      let filtered = values.filter((v, i) => {
        return Object.keys(v).map((a) => {
          return v[a].customerUid.indexOf(this.props.user.uid) !== -1
        });
      })
      this.setState({
        filtered,
        con: true
      })
    })
    Firebase.database().ref("inProgress").on("child_added", e => {
      let val = e.val();
      let values = Object.values(val)
      let filtered1 = values.filter((v, i) => {
        return Object.keys(v).map((a) => {
          return v[a].customerUid.indexOf(this.props.user.uid) !== -1
        });
      })
      this.setState({
        filtered1,
        conn: true
      })
    })
    Firebase.database().ref("done").on("child_added", e => {
      let val = e.val();
      let values = Object.values(val)
      let filtered2 = values.filter((v, i) => {
        return Object.keys(v).map((a) => {
          return v[a].customerUid.indexOf(this.props.user.uid) !== -1
        });
      })
      this.setState({
        filtered2,
        connn: true
      })
    })
  }

  render() {
    return (
      <div className="App" style={{textAlign: "center", width: "100%"}}>
        {this.state.con && this.state.filtered.map((v, i) => {
          return Object.keys(v).map((a) => {
            return <MDBContainer>
              <MDBListGroup style={{ width: "100%" }}>
                <MDBListGroupItem style={{backgroundColor: "white"}} >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{v[a].restaurantName}</h5>
                    <small>{v[a].name}</small>
                    <small>{v[a].category}</small>
                    <small>{v[a].price}</small>
                    <small>Pending</small>
                  </div>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBContainer>
          })
        })}
        {this.state.conn && this.state.filtered1.map((v, i) => {
          return Object.keys(v).map((a) => {
            return <MDBContainer>
              <MDBListGroup style={{ width: "100%" }}>
                <MDBListGroupItem style={{backgroundColor: "orange"}}>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{v[a].restaurantName}</h5>
                    <small>{v[a].name}</small>
                    <small>{v[a].category}</small>
                    <small>{v[a].price}</small>
                    <small>In process</small>
                  </div>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBContainer>
          })
        })}
        {this.state.connn && this.state.filtered2.map((v, i) => {
          return Object.keys(v).map((a) => {
            return <MDBContainer>
              <MDBListGroup style={{ width: "100%" }}>
                <MDBListGroupItem active>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{v[a].restaurantName}</h5>
                    <small>{v[a].name}</small>
                    <small>{v[a].category}</small>
                    <small>{v[a].price}</small>
                    <small>Delivered</small>
                  </div>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBContainer>
          })
        })}
      </div>
    )
  }
}

const getValue = state => {
  return {
    user: state.user
  }
}

export default connect(getValue, null)(myRequests);