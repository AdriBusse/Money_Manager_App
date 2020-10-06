import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import FlatButton from "../shared/Button";
import Card from "../shared/Card";
import { useQuery, useMutation } from "@apollo/client";
import { GetDepots } from "../querys/GetDepots";
import { DeleteDepot } from "../querys/DeleteDepot";
import { globalStyles } from "../styles/global";
import AddDepotForm from "../shared/AddDepotForm";
import AddTransModal from "../shared/AddTransModal";
import { MaterialIcons } from "@expo/vector-icons";
import { showBalance } from "../helpers/showBalance";

export default function Home({ navigation }) {
  const [seeD, setSeeD] = React.useState(false); //if Modal for add Depot is Visible

  const { data, loading, error } = useQuery(GetDepots);
  const [deleteDepot] = useMutation(DeleteDepot, {
    refetchQueries: [{ query: GetDepots }],
  });

  const handleCloseModal = () => {
    setSeeD(false);
  };
  const handleDelete = (id) => {
    Alert.alert(
      "Delete a Depot",
      "Ae you sure you want delete the Depot? Maybe some Transactions get lost",
      [
        {
          text: "yes, i'm sure",
          onPress: () => deleteDepot({ variables: { id } }),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );
  };
  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={globalStyles.container}>
        <Modal visible={seeD} animationType="slide">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.modalContent}>
              <AddDepotForm
                close={() => {
                  setSeeD(false);
                }}
              />
              <FlatButton title="X" onPress={handleCloseModal} />
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* ______________________Modal End___________________*/}

        <FlatButton title="add Depot" onPress={() => setSeeD(true)} />
        <FlatList
          data={data.depots}
          renderItem={({ item }) => {
            //console.log(item.trans);
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Details", item)}
              >
                <Card>
                  <View style={globalStyles.transCard}>
                    <Text style={globalStyles.boldText}>{item.name}</Text>

                    <Text>{showBalance(item.trans)} €</Text>
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color="darkgrey"
                      onPress={() => handleDelete(item.id)}
                    />
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
