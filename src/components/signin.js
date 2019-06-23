import React, { Component } from 'react';
import Firebase from "./config"

import { connect } from 'react-redux';

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

import { update_user } from '../store/action';

class signin extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  login() {
    var emailpattern = /[A-Za-z_.0-9]+@[a-zA-Z]+\.[A-Za-z]{2,4}/;
    if(this.state.email !== "" && this.state.email !== null && this.state.email !== undefined && this.state.email.match(emailpattern) && this.state.password !== "" && this.state.password !== null && this.state.password !== undefined && this.state.password.length > 5){
    document.getElementById("btn").innerHTML = "Signing.."
    Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        Firebase.database().ref("signUpData/" + Firebase.auth().currentUser.uid).on("value", e => {
          let val = e.val();
          let user = {
            user: val,
            uid: Firebase.auth().currentUser.uid
          }
          this.props.store_user(user);
          if (val.type === "customer") {
            this.props.history.push('/dashboardForCustomer')
          }
          if (val.type === "restaurant") {
            this.props.history.push('/dashboardForRestaurant')
          }
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

  render() {
    const style = {
      color: "red",
      fontSize: "14px"
    }
    return (
      <MDBContainer style={{ width: "50%", height: "auto", margin: "80px auto" }}>
        <MDBRow>
          <MDBCol md="12">
            <form>
              <p className="h4 text-center mb-4" style={{ color: "#e75480" }}>FoodApp</p>
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
              <div className="text-center mt-4">
                <MDBBtn color="unique" id="btn" onClick={() => this.login()}>
                  SIGN IN
        </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
        <br />
        <p style={{ textAlign: "center" }}>Don't have an account? <a href="#" style={{ textDecoration: "none" }} onClick={() => this.props.history.push('/')}>Create one</a></p>
      </MDBContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      store_user: (user) => dispatch(update_user(user))
  }
}

const getValue = state => {
  return {
      user: state
  }
}

export default connect(getValue, mapDispatchToProps)(signin);