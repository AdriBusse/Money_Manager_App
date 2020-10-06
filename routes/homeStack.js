import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import React from "react";

import Home from "../screens/Home";
import Details from "../screens/Details";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home",
    },
  },
  Details: {
    screen: Details,
    navigationOptions: {
      title: "Details",
    },
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#3b5998",
      height: 60,
    },
  },
});

export default createAppContainer(HomeStack);
