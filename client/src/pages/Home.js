import React from "react";
import { Pane, Text } from "evergreen-ui";

const Home = () => (
  <Pane
    elevation={1}
    display="flex"
    justifyContent="center"
    alignItems="center"
    backgroundColor="white"
    width={420}
    height={240}
    margin={24}
    flexDirection="column"
  >
    <Text>
      <strong>Home</strong>
    </Text>
    <Text size={300}>
      <strong>Hello, world</strong>
    </Text>
  </Pane>
);

export default Home;
