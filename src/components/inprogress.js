import React, { Component } from 'react';
import Firebase from "./config"

import { connect } from 'react-redux';

import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge } from "mdbreact";

class inprogress extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        Firebase.database().ref("inProgress").on("child_added", e => {
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

    deliver(a,b) {
        console.log(a,b)
        Firebase.database().ref("inProgress/" + this.props.user.uid).on("value", e => {
            let val = e.val();
            let keys = Object.keys(val)
            let values = Object.values(val)
            let obj = {
                deliver: "Delivered"
            }
            Object.keys(val).map((v,i) => {
                if(v === a && val[v].deliver === undefined){
                    console.log(val[v])
                    Firebase.database().ref("inProgress/" + this.props.user.uid).child(a).child(b).child("deliver").set("delivered")
                    Firebase.database().ref("inProgress/" + this.props.user.uid).child(a).child(b).remove()
                    Firebase.database().ref("done/" + this.props.user.uid).child(a).set(val[v])
                }
            })
            document.getElementById("btn"+ a + b).innerHTML = "Delivered"
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
                {!this.state.con && <div style={{textAlign: "center"}}>
                    <p>No pending orders</p>
                </div>}
                {this.state.con && this.state.filtered.map((v, i) => {
                    return Object.keys(v).map((a) => {
                        console.log(v[a].deliver)
                        if (v[a].deliver) {
                            return <MDBContainer>
                                <MDBListGroup style={{ width: "100%" }}>
                                    <MDBListGroupItem>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{v[a].customerName}</h5>
                                            <small>{v[a].name}</small>
                                            <small>{v[a].category}</small>
                                            <small>{v[a].price}</small>
                                            <small>In process</small>
                                            <button disabled>Delivered</button>
                                        </div>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBContainer>
                        }
                        else {
                            return <MDBContainer>
                                <MDBListGroup style={{ width: "70%" }}>
                                    <MDBListGroupItem>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{v[a].customerName}</h5>
                                            <small>{v[a].name}</small>
                                            <small>{v[a].category}</small>
                                            <small>{v[a].price}</small>
                                            <small>In process</small>
                                            <button id={"btn" + v[a].key + a} onClick={() => this.deliver(v[a].key, a)} >Deliver</button>
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

export default connect(getValue, null)(inprogress);