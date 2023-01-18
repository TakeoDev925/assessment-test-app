import { gql } from "@apollo/client";

export const LOAD_LOCATION = gql`
  query LoadLocationQuery($tenant: String!, $limit: Int, $page: Int) {
    locationList(tenant: $tenant, limit: $limit, page: $page) {
      pages
      resources {
        id
        name
        address
        alias
        description
        managingOrganization
        npi
        partOf
        status
        tag
        taxId
        tenant
        type
        updatedAt
        telecom {
          rank
          system
          use
          value
        }
      }
    }
  }
`;


export const READ_LOCATION = gql`
  query ReadLocationQuery($locationReadId: String!, $tenant: String!) {
    locationRead(id: $locationReadId, tenant: $tenant) {
      resource {
        id
        name
        address
        alias
        description
        managingOrganization
        npi
        partOf
        status
        tag
        taxId
        tenant
        type
        updatedAt
        telecom {
          rank
          system
          use
          value
        }
      }
    }
  }
`;
