import { gql } from "@apollo/client";

export const GetDepots = gql`
  query {
    depots {
      id
      name
      short
      trans {
        id
        describtion
        amount
        createdAt
      }
    }
  }
`;
