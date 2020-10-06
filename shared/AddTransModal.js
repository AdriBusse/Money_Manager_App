import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import FlatButton from "./Button";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { AddTransaction } from "../querys/AddTransaction";
import { GetDepots } from "../querys/GetDepots";

const transSchema = yup.object({
  describtion: yup.string().min(4).required(),
  amount: yup.number().required(),
  id: yup.string(),
});
export default function AddTransForm(props) {
  //const handleSubmit = (values) => {};
  const [addTransaction, { data }] = useMutation(AddTransaction, {
    refetchQueries: [{ query: GetDepots }],
  });
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ describtion: "", amount: "", id: props.depotID }}
        onSubmit={(values) => {
          addTransaction({
            variables: {
              describtion: values.describtion,
              amount: parseFloat(values.amount),
              depotId: values.id,
            },
          });
          props.close();
        }}
        validationSchema={transSchema}
      >
        {(formikProps) => {
          return (
            <View style={globalStyles.container}>
              <Text style={globalStyles.heading}>Add a Transaction:</Text>
              <TextInput
                style={globalStyles.Input}
                placeholder="for what is this transaction"
                onChangeText={formikProps.handleChange("describtion")}
                value={formikProps.values.describtion}
                onBlur={
                  formikProps.handleBlur(
                    "describtion"
                  ) /*with out text will show just when press button*/
                }
              />
              <Text style={globalStyles.errorText}>
                {
                  formikProps.touched.describtion &&
                    formikProps.errors
                      .describtion /*that error just showed when form was selected already*/
                }
              </Text>

              <TextInput
                style={globalStyles.Input}
                placeholder="Add a negativ or positiv Number | use ."
                onChangeText={formikProps.handleChange("amount")}
                value={formikProps.values.amount}
                onBlur={
                  formikProps.handleBlur(
                    "amount"
                  ) /*with out text will show just when press button*/
                }
              />
              <Text style={globalStyles.errorText}>
                {
                  formikProps.touched.amount &&
                    formikProps.errors
                      .amount /*that error just showed when form was selected already*/
                }
              </Text>
              <FlatButton
                title="add Transaction"
                onPress={formikProps.handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
}
