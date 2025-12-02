import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { travelTable } from "./travel.schema";

export const agendaTable = pgTable("agenda", {
  id: serial("id").primaryKey(),

  // Agenda details
  day: integer("day").notNull(),
  name: varchar("name").notNull(),
  description: varchar("description").notNull(),

  // Foreign Key to Travel
  travelId: integer("travel_id").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const agendaTableRelations = relations(agendaTable, ({ one }) => ({
  travel: one(travelTable, {
    fields: [agendaTable.travelId],
    references: [travelTable.id],
  }),
}));
