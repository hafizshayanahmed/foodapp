import React, { Component } from 'react';

import Signupascompany from "./signupascompany"
import Signupascustomer from "./signupascustomer"

class signup extends Component {
    constructor() {
        super();
        this.state = {
            signupascus: true,
        }
    }

    
    signUpType() {
        var type = document.getElementsByName('type');
        for (var i = 0, length = type.length; i < length; i++) {
            if (type[i].checked) {
                if (i === 0) {
                    this.setState({
                        signupascom: false,
                        signupascus: true,
                    })
                }
                if (i === 1) {
                    this.setState({
                        signupascom: true,
                        signupascus: false,
                    })
                }
                break;
            };
        }
    }

    getConfirmation(){
        this.props.history.push('/signin')
    }

    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <div style={{ width: "250px", margin: "auto", textAlign: "center" }}>
                        <br />
                        <table>
                            <tbody>
                                <tr>
                                    <td>Sign up as Customer</td>
                                    <td>Sign up as Restaurant</td>
                                </tr>
                                <tr>
                                    <td><input type="radio" name="type" onChange={() => this.signUpType()} defaultChecked /></td>
                                    <td><input type="radio" name="type" onChange={() => this.signUpType()} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {this.state.signupascus &&
                        <Signupascustomer func={()=> this.getConfirmation()} />
                    }
                    {this.state.signupascom &&
                        <Signupascompany func={()=> this.getConfirmation()}/>
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default signup;