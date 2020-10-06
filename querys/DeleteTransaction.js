import { gql } from "@apollo/client";
export const DeleteTransaction = gql`
  mutation($id: ID!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`;
