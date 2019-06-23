import React, { Component } from 'react';
import Firebase from "./config"

import { MDBBadge, MDBContainer } from "mdbreact";

class restaurants extends Component {
    constructor() {
        super();
        this.state = {
            con: false,
            conn: false,
            mid: false,
            filtered: ["dummy"],
            filtered1: ["dummy"],
            inp: "",
        }
    }

    componentDidMount() {
        const arr = []
        Firebase.database().ref("signUpData").on("value", e => {
            let val = e.val();
            let keys = Object.keys(val)
            for (var i = 0; i < keys.length; i++) {
                if (val[keys[i]].type === "restaurant") {
                    arr.push(val[keys[i]])
                    this.setState({
                        arr,
                        con: true,
                        mid: true
                    })
                }
            }
        })
        Firebase.database().ref("categories").on("child_added", e => {
            let val = e.val();
            let keys = Object.keys(val)
            let values = Object.values(val)
            this.setState({
                values,
                conn: true
            })
        })
    }

    search(props) {
        const inp = props.target.value;
        let filtered = this.state.arr.filter((a) => {
            return a.restaurant.toLowerCase().indexOf(inp) !== -1
        });
        this.setState({
            filtered,
            inp
        })
    }

    deep(a) {
        // console.log(props)
        this.setState({
            specific: a
        })
        setTimeout(() => {
            this.props.history.push("/detailedrestaurant", a)
        }, 1000);
    }

    clickSearch(inp) {
        console.log(inp)
        let filtered1 = this.state.arr.filter((a) => {
            return a.uid.indexOf(inp) !== -1
        });
        this.setState({
            filtered1,
            mid: false
        })
        console.log(filtered1)
    }

    render() {
        console.log(this.state.filtered1)
        return (
            <div className="App">
                {this.state.con &&
                    <div>
                        <div class="md-form active-cyan active-cyan-2 mb-3">
                            <input class="form-control col-md-8" onChange={(props) => this.search(props)} style={{ margin: "0 auto" }} type="text" placeholder="Search" aria-label="Search" />
                        </div>
                        <br />
                        <MDBContainer style={{ textAlign: "center" }} class="col-md-8">
                            {this.state.conn && this.state.values.map((v) => {
                                return <MDBBadge color="light" style={{ marginRight: "10px" }} onClick={() => this.clickSearch(v.uid)}>{v.category}</MDBBadge>
                            })}
                        </MDBContainer>
                        <br />
                        {this.state.filtered.length
                            ?
                            this.state.filtered1.length
                                ?
                                this.state.inp.length
                                    ?
                                    this.state.filtered.map((v, i) => {
                                        return <div class="col-lg-4 col-md-6 mb-4" style={{ float: "left" }}>
                                            <div class="card card-cascade narrower mb-4" style={{ marginTop: "28px" }}>
                                                <div class="view view-cascade">
                                                    {/* <img src={v.coverphoto} class="card-img-top"
                                            alt="" /> */}
                                                    <a>
                                                        <div class="mask rgba-white-slight"></div>
                                                    </a>
                                                </div>
                                                <div class="card-body card-body-cascade">
                                                    <h5 class="pink-text"><i class="fas fa-utensils"></i> {v.restaurant}</h5>
                                                    <h4 class="card-title">{Object.keys(v.cat).map((a) => {
                                                        return <MDBBadge color="light" style={{ marginRight: "10px" }} onClick={() => this.clickSearch(v.uid)}>{v.cat[a].category}</MDBBadge>
                                                    })}</h4>
                                                    <a class="btn btn-unique" onClick={() => {
                                                        this.deep(v)
                                                    }}>Go</a>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                    :
                                    this.state.arr.map((v, i) => {
                                        return <div class="col-lg-4 col-md-6 mb-4" style={{ float: "left" }}>
                                            <div class="card card-cascade narrower mb-4" style={{ marginTop: "28px" }}>
                                                <div class="view view-cascade">
                                                    {/* <img src={v.coverphoto} class="card-img-top"
                                                        alt="" /> */}
                                                    <a>
                                                        <div class="mask rgba-white-slight"></div>
                                                    </a>
                                                </div>
                                                <div class="card-body card-body-cascade">
                                                    <h5 class="pink-text"><i class="fas fa-utensils"></i> {v.restaurant}</h5>
                                                    <h4 class="card-title">{Object.keys(v.cat).map((a) => {
                                                        return <MDBBadge color="light" style={{ marginRight: "10px" }} onClick={() => this.clickSearch(v.uid)}>{v.cat[a].category}</MDBBadge>
                                                    })}</h4>
                                                    <a class="btn btn-unique" onClick={() => {
                                                        this.deep(v)
                                                    }}>Go</a>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                :
                                this.state.filtered1.map((v, i) => {
                                    return <div class="col-lg-4 col-md-6 mb-4" style={{ float: "left" }}>
                                        <div class="card card-cascade narrower mb-4" style={{ marginTop: "28px" }}>
                                            <div class="view view-cascade">
                                                {/* <img src={v.coverphoto} class="card-img-top"
                                    alt="" /> */}
                                                <a>
                                                    <div class="mask rgba-white-slight"></div>
                                                </a>
                                            </div>
                                            <div class="card-body card-body-cascade">
                                                <h5 class="pink-text"><i class="fas fa-utensils"></i> {v.restaurant}</h5>
                                                <h4 class="card-title">{Object.keys(v.cat).map((a) => {
                                                    return <MDBBadge color="light" style={{ marginRight: "10px" }} onClick={() => this.clickSearch(v.uid)}>{v.cat[a].category}</MDBBadge>
                                                })}</h4>
                                                <a class="btn btn-unique" onClick={() => {
                                                    this.deep(v)
                                                }}>Go</a>
                                            </div>
                                        </div>
                                    </div>
                                })
                            :
                            <p style={{textAlign: "center"}}>No result found</p>
                        }
                    </div>
                }

            </div>
        );
    }
}

export default restaurants;