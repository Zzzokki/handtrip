import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { travelTable } from "./travel.schema";

export const destinationTable = pgTable("destination", {
  id: serial("id").primaryKey(),

  // Destination details
  name: varchar("name").notNull(),
  location: varchar("location").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const destinationTableRelations = relations(destinationTable, ({ many }) => ({
  travels: many(travelTable),
}));
