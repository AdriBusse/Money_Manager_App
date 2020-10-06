import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeStack from "./routes/homeStack";
import Home from "./screens/Home";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloConfig"; //apollo
export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <HomeStack />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
