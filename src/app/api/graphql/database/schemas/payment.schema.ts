import { relations } from "drizzle-orm";
import { pgTable, serial, integer, timestamp, boolean, varchar } from "drizzle-orm/pg-core";
import { orderTable } from "./order.schema";

export const paymentTable = pgTable("payment", {
  id: serial("id").primaryKey(),

  // Payment details
  total: integer("total").notNull(),
  isPaid: boolean("is_paid").default(false).notNull(),
  paidAt: timestamp("payment_date"),

  // Stripe fields
  stripePaymentIntentId: varchar("stripe_payment_intent_id"),
  stripePaymentMethod: varchar("stripe_payment_method"),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const paymentTableRelations = relations(paymentTable, ({ one }) => ({
  order: one(orderTable, {
    fields: [paymentTable.id],
    references: [orderTable.paymentId],
  }),
}));
