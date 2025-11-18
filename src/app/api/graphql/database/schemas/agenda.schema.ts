import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { travelTable } from "./travel.schema";

export const agendaTable = pgTable("agendaTable", {
  id: serial("id").primaryKey(),

  // Agenda details
  name: varchar("name").notNull(),
  description: varchar("description").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const agendaTableRelations = relations(agendaTable, ({ one }) => ({
  travel: one(travelTable, {
    fields: [agendaTable.id],
    references: [travelTable.agendaId],
  }),
}));
