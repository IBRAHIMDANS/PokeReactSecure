import React, {
    Component
} from "react";
import {
    Pane,
    Text,
    TextInputField,
    Button
} from "evergreen-ui";
import jwt from "jsonwebtoken";

export default class SignUp extends Component {
    state = {
        nickname: null,
        email: null,
        password: null,
        password_confirmation: null
    };

    handleChange = evt => {
        const {
            name,
            value
        } = evt.target;
        this.setState({
            [name]: value
        });
    };

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.setState({
                nickname: jwt.decode(localStorage.getItem('token')).nickname
            });
            this.setState({
                email: jwt.decode(localStorage.getItem('token')).email
            });
        }
    }

    update = async () => {
        console.log(jwt.decode(localStorage.getItem('token')));
        const {
            uuid
        } = jwt.decode(localStorage.getItem('token'));
        console.log(this.state);
        const response = await fetch(`http://localhost:4242/api/user/${uuid}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ` + localStorage.getItem('token')
            },
            method: "PUT",
            body: JSON.stringify(this.state)
        });
        console.log("updatefetch");
        const json = await response.json();
        if (json.err) {
            alert(json.err)
        }
    };

    delete = async () => {
        console.log("DELETE");
        console.log(jwt.decode(localStorage.getItem('token')));
        const {
            uuid
        } = jwt.decode(localStorage.getItem('token'));
        console.log(this.state);
        const response = await fetch(`http://localhost:4242/api/user/${uuid}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ` + localStorage.getItem('token')
            },
            method: "DELETE",
            body: JSON.stringify(this.state)
        });
        console.log("deletefetch");
        const json = await response.json();
        if (json.err) {
            console.log(json.err)
        }
    }

    render() {
        const {
            nickname,
            email,
            password,
            password_confirmation
        } = this.state;

        return ( <
            Pane clearfix >
            <
            Pane elevation = {
                1
            }
            float = "left"
            backgroundColor = "white"
            width = {
                420
            }
            height = {
                600
            }
            margin = {
                24
            }
            padding = {
                24
            } >
            <
            Pane marginBottom = {
                42
            } >
            <
            Text >
            <
            strong > Update profile < /strong> <
            /Text> <
            /Pane>

            <
            TextInputField label = "Nickname"
            name = "nickname"
            value = {
                nickname
            }
            placeholder = "Sanji"
            onChange = {
                this.handleChange
            }
            /> <
            TextInputField label = "Email"
            name = "email"
            value = {
                email
            }
            placeholder = "sanji@op.co"
            onChange = {
                this.handleChange
            }
            />

            <
            TextInputField label = "Password"
            name = "password"
            value = {
                password
            }
            type = "password"
            onChange = {
                this.handleChange
            }
            />

            <
            TextInputField label = "Password confirmation"
            name = "password_confirmation"
            value = {
                password_confirmation
            }
            type = "password"
            onChange = {
                this.handleChange
            }
            />

            <
            Button marginRight = {
                16
            }
            appearance = "primary"
            intent = "success"
            onClick = {
                this.update
            } >
            Update <
            /Button>

            <
            Button marginRight = {
                16
            }
            appearance = "primary"
            intent = "danger"
            onClick = {
                this.delete
            } >
            Delete my account <
            /Button> <
            /Pane> <
            /Pane>
        );
    }
}