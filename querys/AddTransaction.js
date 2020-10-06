import { gql } from "@apollo/client";

export const AddTransaction = gql`
  mutation Add_Transaction(
    $describtion: String!
    $amount: Float!
    $depotId: ID!
  ) {
    addTransaction(
      describtion: $describtion
      amount: $amount
      depotId: $depotId
    ) {
      id
    }
  }
`;
