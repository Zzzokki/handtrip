import {
  pgTable,
  serial,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const paymentTable = pgTable("payment", {
  id: serial("id").primaryKey(),
  total: integer("total").notNull(),
  paymentMethodId: integer("payment_method_id").notNull(),
  paymentDate: timestamp("payment_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

