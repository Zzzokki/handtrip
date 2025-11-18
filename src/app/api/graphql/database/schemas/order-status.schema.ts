import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const orderStatusTable = pgTable("order-status", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

