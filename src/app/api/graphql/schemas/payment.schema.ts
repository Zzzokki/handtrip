import { gql } from "graphql-tag";

export const paymentTypeDefs = gql`
  type Payment {
    id: Int!

    # Payment details
    total: Int!
    isPaid: Boolean!
    paidAt: Timestamp

    # Stripe fields
    stripePaymentIntentId: String
    stripePaymentMethod: String

    # Timestamps
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }

  type Query {
    getPayment(id: Int!): Payment!
  }
`;
