import React, { Component } from "react";
import { Pane, Text, TextInputField, Button } from "evergreen-ui";

export default class SignIn extends Component {
  state = {
    nickname: "majdi",
    password: "majditoumi"
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  login = async () => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(this.state)
    });

    const json = await response.json();
    // I'M CONNECTED
 if (json.err) {
   alert(json.err.message)
 } else {
   this.props.connect(json.data.user);
   localStorage.setItem("token", json.meta.token);
 }
 };

  render() {
    const { nickname, email, password, password_confirmation } = this.state;

    return (
      
      <Pane clearfix>
        <Pane
          elevation={1}
          float="left"
          backgroundColor="white"
          width={420}
          height={420}
          margin={24}
          padding={24}
        >
          <Pane marginBottom={42}>
            <Text>
              <strong>Sign In</strong>
            </Text>
          </Pane>

          <TextInputField
            label="Nickname"
            name="nickname"
            value={nickname}
            placeholder="Sanji"
            onChange={this.handleChange}
            required
          />

          <TextInputField
            label="Password"
            name="password"
            value={password}
            type="password"
            onChange={this.handleChange}
            required
          />

          <Button
            marginRight={16}
            appearance="primary"
            intent="success"
            onClick={this.login}
          >
            Login
          </Button>
        </Pane>
      </Pane>

      
    );
  }
}
