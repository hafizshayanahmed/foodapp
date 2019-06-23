import React, { Component } from 'react';
import Firebase from "./config"

import { connect } from 'react-redux';

import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge } from "mdbreact";

class delivered extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        Firebase.database().ref("done").on("child_added", e => {
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

    render() {
        return (
            <div className="App"><br />
                <br />
                {this.state.con && this.state.filtered.map((v, i) => {
                    return Object.keys(v).map((a) => {
                        return <MDBContainer>
                            <MDBListGroup style={{ width: "100%", border: "1px solid white" }}>
                                <MDBListGroupItem active>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{v[a].customerName}</h5>
                                        <small>{v[a].name}</small>
                                        <small>{v[a].category}</small>
                                        <small>{v[a].price}</small>
                                        <small>Delivered</small>
                                        {/* <button disabled>Delivered</button> */}
                                    </div>
                                </MDBListGroupItem>
                            </MDBListGroup>
                        </MDBContainer>
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

export default connect(getValue, null)(delivered);