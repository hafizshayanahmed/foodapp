import React, { Component } from 'react';
import Firebase from "./config"
import Map from "./map"
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer, MDBRow, MDBCol } from "mdbreact";

class dashForCus extends Component {
    constructor() {
        super();
        this.state = {
            con: false,
            conn: false
        }
    }

    componentDidMount() {
        Firebase.database().ref("signUpData/WFESlZ1RUnY73HebgVbN0V9FRlv2").on("value", e => {
            let val = e.val();
            this.setState({
                val: val,
                con: true
            })
        })
    }

    render() {
        const style1 = {
            border: "1px solid lightgrey",
            width: "100px",
            height: "57px",
            fontFamily: 'ariel',
            fontWeight: "bold"
        },
            style = {
                border: "1px solid lightgrey",
                width: "200px",
                height: "57px",
                fontFamily: 'Courier New , Courier , monospace',
            }
        return (
            <div className="App">
                <MDBContainer>
                    <MDBRow>
                        <MDBCard className="card-body" style={{ width: "21rem", height: "30rem", marginTop: "1rem", marginRight: "0.5rem" }}>
                            <MDBCardTitle style={{ color: "grey" }}>Personal info</MDBCardTitle>
                            {this.state.con &&
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={style1}>Name: </td>
                                            <td style={style}>{this.state.val.name}</td>
                                        </tr>
                                        <tr>
                                            <td style={style1}>Email: </td>
                                            <td style={style}>{this.state.val.email}</td>
                                        </tr>
                                        <tr>
                                            <td style={style1}>Country: </td>
                                            <td style={style}>{this.state.val.country}</td>
                                        </tr>
                                        <tr>
                                            <td style={style1}>City: </td>
                                            <td style={style}>{this.state.val.city}</td>
                                        </tr>
                                        <tr>
                                            <td style={style1}>Gender: </td>
                                            <td style={style}>{this.state.val.gender}</td>
                                        </tr>
                                        <tr>
                                            <td style={style1}>Age: </td>
                                            <td style={style}>{this.state.val.age}</td>
                                        </tr>
                                        <tr>
                                            <td style={style1}>User type: </td>
                                            <td style={style}>{this.state.val.type}</td>
                                        </tr>
                                        {/* <tr>
                                        <td style={style1}></td>
                                        <td style={style}><button>Edit</button></td>
                                    </tr> */}
                                    </tbody>
                                </table>
                            }
                        </MDBCard>
                        <MDBCard className="card-body" style={{ width: "21rem", height: "30rem", marginTop: "1rem", marginLeft: "0.5rem" }}>
                            <MDBCardTitle style={{ color: "grey" }}>Chatbot</MDBCardTitle>
                            <iframe
                                allow="microphone;"
                                width="100%"
                                height="400"
                                src="https://console.dialogflow.com/api-client/demo/embedded/54cbf42a-200f-444c-9890-447fdc8c3d30">
                            </iframe>
                        </MDBCard>
                    </MDBRow>
                    <MDBRow>
                        <MDBCard className="card-body" style={{ width: "44rem", height: "30rem", marginTop: "1rem" }}>
                            <MDBCardTitle style={{ color: "grey" }}>Map</MDBCardTitle>
                            <Map />
                        </MDBCard>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default dashForCus;