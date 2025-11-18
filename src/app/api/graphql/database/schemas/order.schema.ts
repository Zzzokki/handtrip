import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";

export const orderTable = pgTable("order", {
  id: serial("id").primaryKey(),

  // Order details
  paymentTotal: integer("payment_total").notNull(),
  timetableId: integer("timetable_id").notNull(),
  travelerId: integer("traveler_id").notNull(),
  customerId: integer("customer_id").notNull(),
  tuluvId: integer("tuluv_id").notNull(),
  paymentId: integer("payment_id").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// export const orderRelations = relations(order, ({ one }) => ({
//   timeTable: one(timeTable, {
//     fields: [order.timetableId],
//     references: [timeTable.id],
//   }),
//   traveler: one(order, {
//     fields: [order.travelerId],
//     references: [order.id],
//   }),
//   customer: one(customer, {
//     fields: [order.customerId],
//     references: [customer.id],
//   }),

//   orderTuluv: one(orderTuluv, {
//     fields: [order.tuluvId],
//     references: [orderTuluv.id],
//   }),
//   payment: one(order, {
//     fields: [order.paymentId],
//     references: [order.id],
//   }),
// }));
