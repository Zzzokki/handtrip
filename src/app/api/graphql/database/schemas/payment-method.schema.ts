
import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const paymentMethodTable = pgTable("payment-method", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
