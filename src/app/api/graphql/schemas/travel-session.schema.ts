import { gql } from "graphql-tag";

export const travelSessionTypeDefs = gql`
  type TravelSession {
    id: Int!

    # TravelSession details
    startDate: Timestamp!
    endDate: Timestamp!

    # Travel
    travelId: Int!

    # Guide
    guideId: Int!
    guide: Guide!

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }
`;
