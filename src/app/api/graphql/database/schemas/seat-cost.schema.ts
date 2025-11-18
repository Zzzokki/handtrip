import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { seatTable } from "./seat.schema";

export const seatCostTable = pgTable("seat-cost", {
  id: serial("id").primaryKey(),

  // Seat cost details
  cost: integer("cost").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const seatCostTableRelations = relations(seatCostTable, ({ many }) => ({
  suudal: many(seatTable),
}));
