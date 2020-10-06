import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "../shared/Card";
import FlatButton from "../shared/Button";
import AddTransModal from "../shared/AddTransModal";
import { globalStyles } from "../styles/global";
import { DeleteTransaction } from "../querys/DeleteTransaction";
import { useMutation } from "@apollo/client";
import { GetDepots } from "../querys/GetDepots";
import { showBalance } from "../helpers/showBalance";

export default function Details(props) {
  const id = props.navigation.getParam("id");
  const name = props.navigation.getParam("name");
  const short = props.navigation.getParam("short");
  const trans = props.navigation.getParam("trans");
  const [seeT, setSeeT] = React.useState(false); //if Modal for add Transaction is Visible

  const [deleteTrans, { data }] = useMutation(DeleteTransaction, {
    refetchQueries: [{ query: GetDepots }],
  });

  const [opac, setOpac] = React.useState(1);
  const clickDeleteTrans = (id) => {
    deleteTrans({
      variables: { id },
      //optimisticResponse: true,
    });
    console.log(`delete ${id}`);
    setOpac(0.5);
  };
  return (
    <View style={globalStyles.container}>
      <Modal visible={seeT} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <AddTransModal
              depotID={id}
              close={() => {
                setSeeT(false);
                props.navigation.navigate("Home");
              }}
            />
            <FlatButton
              title="X"
              onPress={() => {
                setSeeT(false);
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* ______________________Modal End___________________*/}

      <Text style={globalStyles.heading}>
        Details for {name} ({short})
      </Text>
      <Text style={globalStyles.heading}>{showBalance(trans)} €</Text>
      <FlatButton
        title="add Transaction"
        onPress={() => {
          setSeeT(true);
        }}
      />

      <FlatList
        data={trans}
        renderItem={({ item }) => {
          return (
            <Card>
              <View opacity={opac} style={globalStyles.transCard}>
                <Text style={globalStyles.boldText}>{item.describtion}</Text>
                <Text>{item.amount}</Text>
                <Text>{item.createdAt.substring(0, 10)}</Text>
                <TouchableOpacity onPress={() => clickDeleteTrans(item.id)}>
                  <MaterialIcons name="delete" size={24} color="grey" />
                </TouchableOpacity>
              </View>
            </Card>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  modalContent: {
    flex: 1,
  },
});
