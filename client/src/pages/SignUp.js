import React, { Component } from "react";
import { Pane, Text, TextInputField, Button } from "evergreen-ui";

export default class SignUp extends Component {
  state = {
    nickname: "majdi",
    email: "majdi@mhirba.com",
    password: "majditoumi",
    password_confirmation: "majditoumi"
  };

  // this.handleChange = this.handleChange.bind(this);
  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  register = async () => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(this.state)
    });

    const json = await response.json();
    // I'M CONNECTED
    this.props.connect(json.data.user);
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
          height={600}
          margin={24}
          padding={24}
        >
          <Pane marginBottom={42}>
            <Text>
              <strong>Sign Up</strong>
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
            label="Email"
            name="email"
            value={email}
            placeholder="sanji@op.co"
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

          <TextInputField
            label="Password confirmation"
            name="password_confirmation"
            value={password_confirmation}
            type="password"
            onChange={this.handleChange}
            required
          />

          <Button
            marginRight={16}
            appearance="primary"
            intent="success"
            onClick={this.register}
          >
            Register
          </Button>
        </Pane>
      </Pane>
    );
  }
}
