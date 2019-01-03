import React from "react";
import { Pane, Text } from "evergreen-ui";

const Dashboard = ({ nickname }) => (
  <Pane
    elevation={1}
    float="left"
    backgroundColor="white"
    width={420}
    height={240}
    margin={24}
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    <Text>
      <strong>Dashboard</strong>
    </Text>
    <Text size={300}>
      <strong>Hello, {nickname}</strong>
    </Text>
  </Pane>
);

export default Dashboard;
