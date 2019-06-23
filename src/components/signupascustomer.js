import React, { Component } from 'react';
import Firebase from "./config"
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

class signupascustomer extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    register() {
        document.getElementById("btn").innerHTML = "Signing.."
        let obj = {
            name: this.state.name,
            email: this.state.email,
            city: this.state.city,
            type: "customer",
            location: ""
        }
        var namepattern = /^[a-zA-Z" "]+$/i;
        var emailpattern = /[A-Za-z_.0-9]+@[a-zA-Z]+\.[A-Za-z]{2,4}/;
        if(this.state.name !== "" && this.state.name !== null && this.state.name !== undefined && this.state.name.match(namepattern) && this.state.email !== "" && this.state.email !== null && this.state.email !== undefined && this.state.email.match(emailpattern) && this.state.city !== "" && this.state.city !== null && this.state.city !== undefined && this.state.password !== "" && this.state.password !== null && this.state.password !== undefined && this.state.password.length > 5 && this.state.cpassword !== undefined && this.state.cpassword !== null && this.state.cpassword !== "" && this.state.password.length === this.state.cpassword.length){
            Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                obj.uid = Firebase.auth().currentUser.uid;
                Firebase.database().ref("signUpData/" + Firebase.auth().currentUser.uid).set(obj)
                .then(() => {
                    this.props.func()
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
                })
                .catch(function (error) {
                    alert(error.message)
                });
            }
            else {
                alert("Some of your information is not valid. Please review again")
            }
    }

    checkName() {
        var namepattern = /^[a-zA-Z" "]+$/i;
        let name = this.state.name
        if (name !== "" && name !== null && name !== undefined) {
            if (name.match(namepattern)) {
                document.getElementById("name").innerHTML = "";
            }
            else {
                document.getElementById("name").innerHTML = "Invalid input";
            }
        }
        else {
            document.getElementById("name").innerHTML = "Please input name";
        }
    }

    checkEmail() {
        var emailpattern = /[A-Za-z_.0-9]+@[a-zA-Z]+\.[A-Za-z]{2,4}/;
        let email = this.state.email
        if (email !== "" && email !== null && email !== undefined) {
            if (email.match(emailpattern)) {
                document.getElementById("email").innerHTML = "";
            }
            else {
                document.getElementById("email").innerHTML = "Invalid input";
            }
        }
        else {
            document.getElementById("email").innerHTML = "Please input email";
        }
    }

    checkOption() {
        if (this.state.city !== "" && this.state.city !== null && this.state.city !== undefined) {
            document.getElementById("city").innerHTML = "";
        }
        else {
            document.getElementById("city").innerHTML = "Invalid input";
        }
    }

    checkPassword() {
        if (this.state.password !== "" && this.state.password !== null && this.state.password !== undefined) {
            if (this.state.password.length > 5) {
                document.getElementById("password").innerHTML = "";
            }
            else {
                document.getElementById("password").innerHTML = "Password length must be greater then or equal to 6";
            }
        }
        else {
            document.getElementById("password").innerHTML = "Password could not be empty";
        }
    }

    checkCpassword() {
        if (this.state.cpassword !== undefined && this.state.cpassword !== null && this.state.cpassword !== "") {
            if (this.state.password.length === this.state.cpassword.length) {
                document.getElementById("cpassword").innerHTML = "";
            }
            else {
                document.getElementById("cpassword").innerHTML = "Password length must be greater then or equal to 6";
            }
        }
        else {
            document.getElementById("cpassword").innerHTML = "Password does not match";
        }
    }

    render() {
        const style = {
            color: "red",
            fontSize: "14px"
        }
        return (
            <MDBContainer style={{ width: "50%", height: "auto", margin: "40px auto" }}>
                <MDBRow>
                    <MDBCol md="12">
                        <form>
                            <p className="h4 text-center mb-4" style={{ color: "#e75480" }}>FoodApp</p>
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                Your name
            </label>
                            <input
                                type="text"
                                id="defaultFormRegisterNameEx"
                                className="form-control"
                                onChange={(v) => this.setState({ name: v.target.value })}
                                onBlur={() => this.checkName()}
                            />
                            <p id="name" style={style}></p>
                            <br />
                            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                Your email
            </label>
                            <input
                                type="email"
                                id="defaultFormRegisterEmailEx"
                                className="form-control"
                                onChange={(v) => this.setState({ email: v.target.value })}
                                onBlur={() => this.checkEmail()}
                            />
                            <p id="email" style={style}></p>
                            <br />
                            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                City
            </label>
                            <select className="browser-default custom-select"
                                onChange={(v) => this.setState({ city: v.target.value })}
                                onBlur={() => this.checkOption()}
                            >
                                <option value="">Open this select menu</option>
                                <option value="karachi">Karachi</option>
                                <option value="hyderabad">Hyderabad</option>
                                <option value="islamabad">Islamabad</option>
                                <option value="lahore">Lahore</option>
                                <option value="gawadar">Gawadar</option>
                            </select>
                            <p id="city" style={style}></p>
                            <br />
                            <label
                                htmlFor="defaultFormRegisterConfirmEx"
                                className="grey-text"
                            >
                                Password
            </label>
                            <input
                                type="password"
                                id="defaultFormRegisterConfirmEx"
                                className="form-control"
                                onChange={(v) => this.setState({ password: v.target.value })}
                                onBlur={() => this.checkPassword()}
                            />
                            <p id="password" style={style}></p>
                            <br />
                            <label
                                htmlFor="defaultFormRegisterPasswordEx"
                                className="grey-text"
                            >
                                Confirm password
            </label>
                            <input
                                type="password"
                                id="defaultFormRegisterPasswordEx"
                                className="form-control"
                                onChange={(v) => this.setState({ cpassword: v.target.value })}
                                onBlur={() => this.checkCpassword()}
                            />
                            <p id="cpassword" style={style}></p>
                            <div className="text-center mt-4">
                                <MDBBtn color="unique" id="btn" onClick={() => this.register()}>
                                    SIGN UP
              </MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
                <br />
                <p style={{ textAlign: "center" }}>Already have an account? <a href="#" style={{ textDecoration: "none" }} onClick={() => this.props.func()}>Sign In</a></p>
            </MDBContainer>
        );
    }
}

export default signupascustomer;