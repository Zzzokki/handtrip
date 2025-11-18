import { relations } from "drizzle-orm";
import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { customerTable } from "./customer.schema";
import { travelSessionTable } from "./travel-session.schema";
import { paymentTable } from "./payment.schema";
import { travelerTable } from "./traveler.schema";

export const orderTable = pgTable("order", {
  id: serial("id").primaryKey(),

  // Order Details
  totalSeats: integer("total_seats").notNull(),
  totalPrice: integer("total_price").notNull(),

  // Status
  orderStatus: integer("order_status").notNull(),

  // Customer
  customerId: integer("customer_id").notNull(),

  // Travel Session
  travelSessionId: integer("travel_session_id").notNull(),

  // Payment Info
  paymentId: integer("payment_id").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orderTableRelations = relations(orderTable, ({ one, many }) => ({
  customer: one(customerTable, {
    fields: [orderTable.customerId],
    references: [customerTable.id],
  }),
  travelSession: one(travelSessionTable, {
    fields: [orderTable.travelSessionId],
    references: [travelSessionTable.id],
  }),
  payment: one(paymentTable, {
    fields: [orderTable.paymentId],
    references: [paymentTable.id],
  }),
  travelers: many(travelerTable),
}));
