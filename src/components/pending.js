import React, { Component } from 'react';
import Firebase from "./config"

import { connect } from 'react-redux';

import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge } from "mdbreact";

class pending extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        Firebase.database().ref("pendingOrders").on("child_added", e => {
            let val = e.val();
            let values = Object.values(val)
            let filtered = values.filter((v, i) => {
                return Object.keys(v).map((a) => {
                    return v[a].restaurantUid.indexOf(this.props.user.uid) !== -1
                });
            })
            console.log(filtered)
            this.setState({
                filtered,
                con: true
            })
        })
    }

    acknowledge(a,b) {
        console.log(a,b)
        Firebase.database().ref("pendingOrders/" + this.props.user.uid).on("value", e => {
            let val = e.val();
            let keys = Object.keys(val)
            let values = Object.values(val)
            let obj = {
                acknowledge: "acknowledged"
            }
            Object.keys(val).map((v,i) => {
                if(v === a && val[v].acknowledge === undefined){
                    console.log(val[v])
                    Firebase.database().ref("pendingOrders/" + this.props.user.uid).child(a).child(b).child("acknowledge").set("acknowledged")
                    Firebase.database().ref("pendingOrders/" + this.props.user.uid).child(a).child(b).remove()
                    Firebase.database().ref("inProgress/" + this.props.user.uid).child(a).set(val[v])
                }
            })
            document.getElementById("btn"+ a + b).innerHTML = "Acknowledged"
            document.getElementById("btn"+ a + b).setAttribute("disabled", "disabled")
            this.setState({
                
            })
        })
    }

    render() {
        console.log(this.props.user.uid)
        return (
            <div className="App"><br />
                <br />
                {this.state.con && this.state.filtered.map((v, i) => {
                    return Object.keys(v).map((a) => {
                        console.log(v[a].acknowledge)
                        if (v[a].acknowledge) {
                            return <MDBContainer>
                                <MDBListGroup style={{ width: "100%" }}>
                                    <MDBListGroupItem>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{v[a].customerName}</h5>
                                            <small>{v[a].name}</small>
                                            <small>{v[a].category}</small>
                                            <small>{v[a].price}</small>
                                            <small>Pending</small>
                                            <button disabled>Acknowledged</button>
                                        </div>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBContainer>
                        }
                        else {
                            return <MDBContainer>
                                <MDBListGroup style={{ width: "100%" }}>
                                    <MDBListGroupItem>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{v[a].customerName}</h5>
                                            <small>{v[a].name}</small>
                                            <small>{v[a].category}</small>
                                            <small>{v[a].price}</small>
                                            <small>Pending</small>
                                            <button id={"btn" + v[a].key + a} onClick={() => this.acknowledge(v[a].key, a)} >Acknowledge</button>
                                        </div>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBContainer>
                        }
                    })
                })}
            </div>
        );
    }
}

const getValue = state => {
    return {
        user: state.user
    }
}

export default connect(getValue, null)(pending);