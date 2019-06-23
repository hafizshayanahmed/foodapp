import React, { Component } from 'react';
import Firebase from "./config"

import { connect } from 'react-redux';

import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBtn } from "mdbreact";

class detailedrestaurant extends Component {
    constructor() {
        super();
        this.state = {
            con: false,
            orderlist: [],
            total: 0
        }
    }

    componentDidMount() {
        const arr = []
        Firebase.database().ref("signUpData/" + this.props.location.state.uid + "/items").on("child_added", e => {
            let val = e.val();
            arr.push(val)
            this.setState({
                con: true,
                arr
            })
        })
    }

    additem(uid, name, category, price, i) {
        // console.log(uid, name, category, price)
        document.getElementById("btn" + i).innerHTML = "added"
        let obj = {
            name,
            category,
            price,
            customerUid: this.props.user.uid,
            restaurantUid: this.props.location.state.uid,
            restaurantName: this.props.location.state.restaurant,
            customerName: this.props.user.user.name
        }

        let rootRef = Firebase.database().ref();
        let keyRef = rootRef.push();
        let key = keyRef.getKey();
        this.setState({
            key
        })

        let list = this.state.orderlist
        let total = this.state.total
        total = Number(total) + Number(price)
        list.push(obj)
        this.setState({
            orderlist: list,
            restaurantUid: uid,
            total
        })
    }

    confirmorder() {
        this.state.orderlist.map((v)=> {
            v.key = this.state.key
        })
        Firebase.database().ref("pendingOrders/" + this.props.location.state.uid + "/" + this.state.key).set(this.state.orderlist).then(() => {
            alert("Your order has been placed. Please wait for a cal from restaurant to confirm the order. This will take 45 minutes in total.")
        })
        this.setState({
            orderlist: [],
            total: 0
        })
        this.props.history.replace('/restaurants');
        this.state.arr.map((v, i) => {
            document.getElementById("btn" + i).innerHTML = "add item"
        })
    }

    removeitem(i) {
        let list = this.state.orderlist
        let cutprice = this.state.orderlist[i].price
        let totalprice = this.state.total
        totalprice = totalprice - cutprice
        list.splice(i, 1);
        this.setState({
            orderlist: list,
            total: totalprice
        });
        document.getElementById("btn" + i).innerHTML = "add item"
    }

    render() {
        console.log(this.state.orderlist)
        return (
            <div className="App">
                <div class="card card-cascade wider reverse">
                    <div class="view view-cascade overlay">
                        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg" alt="Card image cap" />
                        <a href="#!">
                            <div class="mask rgba-white-slight"></div>
                        </a>
                    </div>
                    <div class="card-body card-body-cascade text-center">
                        {/* <h4 class="card-title"><strong>{this.props.location.state.restaurant}</strong></h4> */}
                        {this.state.con && this.state.arr.map((v) => {
                            return <h6 class="font-weight-bold indigo-text py-2" style={{ lineHeight: "0" }}>{v.category}</h6>
                        })}
                        {/* <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem perspiciatis voluptatum a, quo nobis, non commodi quia repellendus sequi nulla voluptatem dicta reprehenderit, placeat laborum ut beatae ullam suscipit veniam.</p> */}
                        <a class="px-2 fa-lg li-ic"><i class="fab fa-linkedin-in"></i></a>
                        <a class="px-2 fa-lg tw-ic"><i class="fab fa-twitter"></i></a>
                        <a class="px-2 fa-lg fb-ic"><i class="fab fa-facebook-f"></i></a>
                    </div>
                </div>
                <br />
                <br />
                {this.state.orderlist.length &&
                    <MDBContainer style={{ border: "1px solid lightgrey", width: "60%", textAlign: "center" }}>
                        <br />
                        <MDBListGroup style={{ width: "70%", margin: "0 auto" }}>
                            {this.state.orderlist.map((v, i) => {
                                return <MDBListGroupItem hover>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1"><strong>{v.name}</strong></h5>
                                        <MDBBtn color="unique" onClick={() => this.removeitem(i)}>remove from list</MDBBtn>
                                    </div>
                                    <small>Price: {v.price}</small>
                                </MDBListGroupItem>
                            })}
                        </MDBListGroup>
                        <MDBListGroup style={{ width: "70%", margin: "0 auto" }}>
                            <MDBListGroupItem hover>
                                <div className="d-flex w-100 justify-content-between">
                                    {/* <h5 className="mb-1"><strong>{}</strong></h5> */}
                                    <h5 className="mb-1"><span>Total: {this.state.total}</span></h5>
                                </div>
                            </MDBListGroupItem>
                        </MDBListGroup>
                        <MDBBtn color="unique" onClick={() => this.confirmorder()}>confirm order</MDBBtn>
                    </MDBContainer>
                }
                <br />
                <br />
                {this.state.con &&
                    <MDBContainer>
                        <MDBListGroup style={{ width: "70%", margin: "0 auto" }}>
                            {this.state.arr.map((v, i) => {
                                return <MDBListGroupItem hover>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1"><strong>{v.name}</strong></h5>
                                        <MDBBtn color="unique" id={"btn" + i} onClick={() => this.additem(v.uid, v.name, v.category, v.price, i)}>Add item</MDBBtn>
                                    </div>
                                    <small>Price: {v.price}</small>
                                </MDBListGroupItem>
                            })}
                        </MDBListGroup>
                    </MDBContainer>
                }
                <br />
                <br />
            </div>
        );
    }
}

const getValue = state => {
    return {
        user: state.user
    }
}

export default connect(getValue, null)(detailedrestaurant);