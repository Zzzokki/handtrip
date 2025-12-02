import { relations } from "drizzle-orm";
import { pgTable, serial, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { seatCostTable } from "./seat-cost.schema";
import { travelSessionTable } from "./travel-session.schema";

export const seatTable = pgTable("seat", {
  id: serial("id").primaryKey(),

  // Travel session seat details
  status: varchar("status", { enum: ["AVAILABLE", "OCCUPIED", "RESERVED"] })
    .default("AVAILABLE")
    .notNull(),

  // Foreign key to Travel Session
  travelSessionId: integer("travel_session_id").notNull(),

  // Foreign key to Seat Cost
  seatCostId: integer("seat_cost_id").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const seatTableRelations = relations(seatTable, ({ one }) => ({
  travelSession: one(travelSessionTable, {
    fields: [seatTable.travelSessionId],
    references: [travelSessionTable.id],
  }),
  seatCost: one(seatCostTable, {
    fields: [seatTable.seatCostId],
    references: [seatCostTable.id],
  }),
}));
