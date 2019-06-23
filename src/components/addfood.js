import React, { Component } from 'react';
import Firebase from "./config"

import { connect } from 'react-redux';

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

import { update_user } from '../store/action';

class addfood extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            category: "",
            price: "",
        }
    }

    add() {
        let obj = {
            name: this.state.name,
            category: this.state.category,
            price: this.state.price,
            uid: this.props.user.uid
        },
            obj1 = {
                category: this.state.category,
                uid: this.props.user.uid
            }
        document.getElementById("btn").innerHTML = "Adding.."
        Firebase.database().ref("signUpData/" + this.props.user.uid).child("items").push(obj)
            .then(() => {
                Firebase.database().ref("categories").child("cat").push(obj1)
                Firebase.database().ref("signUpData/" + this.props.user.uid).child("cat").push(obj1).then(() => {
                    this.setState({
                        name: "",
                        category: "",
                        price: ""
                    })
                })
                document.getElementById("confirmation").innerHTML = "Item Added"
                document.getElementById("btn").innerHTML = "Add"
            })
    }

    checkName() {
        if (this.state.name !== "") {
            document.getElementById("name").innerHTML = "";
        }
        else {
            document.getElementById("name").innerHTML = "Please enter name";
        }
    }

    checkCategory() {
        if (this.state.category !== "") {
            document.getElementById("category").innerHTML = "";
        }
        else {
            document.getElementById("category").innerHTML = "Please enter category";
        }
    }

    checkPrice() {
        if (this.state.price !== "") {
            document.getElementById("price").innerHTML = "";
        }
        else {
            document.getElementById("price").innerHTML = "Please enter price";
        }
    }

    render() {
        const style = {
            color: "red",
            fontSize: "14px"
        }
        return (
            <MDBContainer style={{ width: "50%", height: "auto", margin: "0 auto" }}>
                <MDBRow>
                    <MDBCol md="12">
                        <form>
                            <p className="h4 text-center mb-4" style={{ color: "#e75480" }}>Add item</p>
                            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                Name
      </label>
                            <input
                                value={this.state.name}
                                type="text"
                                id="defaultFormRegisterEmailEx"
                                className="form-control"
                                onChange={(v) => this.setState({ name: v.target.value })}
                                onBlur={() => this.checkName()}
                            />
                            <p id="name" style={style}></p>
                            <br />
                            <label
                                htmlFor="defaultFormRegisterConfirmEx"
                                className="grey-text"
                            >
                                Category
      </label>
                            <input
                                value={this.state.category}
                                type="text"
                                id="defaultFormRegisterConfirmEx"
                                className="form-control"
                                onChange={(v) => this.setState({ category: v.target.value })}
                                onBlur={() => this.checkCategory()}
                            />
                            <p id="category" style={style}></p>
                            <br />
                            <label
                                htmlFor="defaultFormRegisterConfirmEx"
                                className="grey-text"
                            >
                                Price (in rupees)
      </label>
                            <input
                                value={this.state.price}
                                type="number"
                                id="defaultFormRegisterConfirmEx"
                                className="form-control"
                                onChange={(v) => this.setState({ price: v.target.value })}
                                onBlur={() => this.checkPrice()}
                            />
                            <p id="price" style={style}></p>
                            <br />
                            <p id="confirmation" style={{ textAlign: "center" }}></p>
                            <div className="text-center mt-4">
                                <MDBBtn color="unique" id="btn" onClick={() => this.add()}>
                                    Add
        </MDBBtn>
                                <br />
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
                <br />
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
        user: state.user
    }
}

export default connect(getValue, mapDispatchToProps)(addfood);