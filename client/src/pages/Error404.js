import React from "react";
import { Pane, Text } from "evergreen-ui";

const Error4004 = () => (
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
      <strong>Error 404 Page not found</strong>
    </Text>
    <Text size={300}>
      <strong>Sorry Page not found</strong>
    </Text>
  </Pane>
);

export default Error4004;
