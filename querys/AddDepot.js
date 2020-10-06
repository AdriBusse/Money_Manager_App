import { gql } from "@apollo/client";

export const AddDepot = gql`
  mutation($name: String!, $short: String!) {
    addDepot(name: $name, short: $short) {
      id
    }
  }
`;
