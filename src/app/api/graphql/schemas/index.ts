import { mergeTypeDefs } from "@graphql-tools/merge";
import { TimestampTypeDefinition } from "graphql-scalars";
import { commonTypeDefs } from "./common.schema";
import { customerTypeDefs } from "./customer.schema";
import { authTypeDefs } from "./auth.schema";
import { companyTypeDefs } from "./company.schema";
import { travelTypeDefs } from "./travel.schema";
import { categoryTypeDefs } from "./category.schema";
import { destinationTypeDefs } from "./destination.schema";
import { agendaTypeDefs } from "./agenda.schema";
import { guideTypeDefs } from "./guide.schema";
import { travelSessionTypeDefs } from "./travel-session.schema";
import { orderTypeDefs } from "./order.schema";
import { subCategoryTypeDefs } from "./sub-category.schema";
import { paymentTypeDefs } from "./payment.schema";
import { travelerTypeDefs } from "./traveler.schema";
import { seatTypeDefs } from "./seat.schema";
import { seatCostTypeDefs } from "./seat-cost.schema";

export const typeDefs = mergeTypeDefs([
  // Custom Scalars
  TimestampTypeDefinition,

  // Common Type Definitions
  commonTypeDefs,

  // Main Type Definitions
  authTypeDefs,
  customerTypeDefs,
  companyTypeDefs,
  travelTypeDefs,
  categoryTypeDefs,
  subCategoryTypeDefs,
  destinationTypeDefs,
  agendaTypeDefs,
  guideTypeDefs,
  travelSessionTypeDefs,
  orderTypeDefs,
  paymentTypeDefs,
  travelerTypeDefs,
  seatTypeDefs,
  seatCostTypeDefs,
]);
