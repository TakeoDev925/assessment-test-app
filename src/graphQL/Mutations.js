import { gql } from "@apollo/client";

export const CREATE_LOCATION = gql`
  mutation ($locationInput: LocationInput!, $tenant: String!){
    locationCreate(locationInput: $locationInput, tenant: $tenant) {
      resourceID
    }
  }
`;

export const UPDATE_LOCATION = gql `
  mutation ($locationUpdateId: String!, $locationInput: LocationInput!, $tenant: String!){
    locationUpdate(id: $locationUpdateId, locationInput: $locationInput, tenant: $tenant) {
      resourceID
    }
  }
`;

export const REMOVE_LOCATION = gql `
  mutation ($locationRemoveId: String!, $tenant: String!){
    locationRemove(id: $locationRemoveId, tenant: $tenant) {
      resourceID
    }
  }
`;