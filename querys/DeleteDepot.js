import { gql } from "@apollo/client";

export const DeleteDepot = gql`
  mutation($id: String!) {
    deleteDepot(id: $id) {
      id
      name
    }
  }
`;
