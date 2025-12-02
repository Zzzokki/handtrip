import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { companyTable } from "./company.schema";
import { subCategoryToTravelTable } from "./sub-category.schema";
import { categoryToTravelTable } from "./category.schema";
import { agendaTable } from "./agenda.schema";
import { travelSessionTable } from "./travel-session.schema";
import { destinationTable } from "./destination.schema";

export const travelTable = pgTable("travel", {
  id: serial("id").primaryKey(),

  // Basic Information
  name: varchar("name").notNull(),
  description: varchar("description").notNull(),
  coverImage: varchar("cover_image"),
  duration: integer("duration").notNull(),
  totalSeatNumber: integer("total_seat_number").notNull(),
  gallery: varchar("gallery").array().notNull(),

  // Foreign Key to Company
  companyId: integer("company_id").notNull(),

  // Foreign Key to Destination
  destinationId: integer("destination_id").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const travelTableRelations = relations(travelTable, ({ one, many }) => ({
  travelSessions: many(travelSessionTable),
  subCategories: many(subCategoryToTravelTable),
  categories: many(categoryToTravelTable),
  company: one(companyTable, {
    fields: [travelTable.companyId],
    references: [companyTable.id],
  }),
  agenda: one(agendaTable, {
    fields: [travelTable.id],
    references: [agendaTable.travelId],
  }),
  destination: one(destinationTable, {
    fields: [travelTable.destinationId],
    references: [destinationTable.id],
  }),
}));
