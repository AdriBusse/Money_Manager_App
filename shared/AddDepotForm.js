import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import FlatButton from "./Button";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { AddDepot } from "../querys/AddDepot";
import { GetDepots } from "../querys/GetDepots";

const transSchema = yup.object({
  name: yup.string().required(),
  short: yup.string().min(1).max(3).required(),
});

export default function AddDepotForm(props) {
  //const handleSubmit = (values) => {};
  const [addDepot, { data }] = useMutation(AddDepot, {
    refetchQueries: [{ query: GetDepots }],
  });

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ name: "", short: "" }}
        validationSchema={transSchema}
        onSubmit={(values) => {
          addDepot({
            variables: { name: values.name, short: values.short.toUpperCase() },
          });
          props.close();
        }}
      >
        {(formikProps) => {
          return (
            <View style={globalStyles.container}>
              <Text style={globalStyles.heading}>Add a Transaction:</Text>
              <TextInput
                style={globalStyles.Input}
                placeholder="Name"
                onChangeText={formikProps.handleChange("name")}
                value={formikProps.values.name}
                onBlur={
                  formikProps.handleBlur(
                    "name"
                  ) /*with out text will show just when press button*/
                }
              />
              <Text style={globalStyles.errorText}>
                {
                  formikProps.touched.name &&
                    formikProps.errors
                      .name /*that error just showed when form was selected already*/
                }
              </Text>

              <TextInput
                style={globalStyles.Input}
                placeholder="Kürzel 3 Zeichen"
                onChangeText={formikProps.handleChange("short")}
                value={formikProps.values.short}
                onBlur={
                  formikProps.handleBlur(
                    "short"
                  ) /*with out text will show just when press button*/
                }
              />
              <Text style={globalStyles.errorText}>
                {
                  formikProps.touched.short &&
                    formikProps.errors
                      .short /*that error just showed when form was selected already*/
                }
              </Text>
              <FlatButton
                title="Depot Hinzufügen"
                onPress={formikProps.handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
}
