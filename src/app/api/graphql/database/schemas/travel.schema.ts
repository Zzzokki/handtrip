import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  text,
  numeric,
} from "drizzle-orm/pg-core";
import { companyTable } from "./company.schema";
import { subCategoryToTravelTable } from "./sub-category.schema";
import { categoryToTravelTable } from "./category.schema";

export const travelTable = pgTable("travel", {
  id: serial("id").primaryKey(),

  // Basic Information
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  coverImage: varchar("cover_image", { length: 500 }),
  duration: integer("duration").notNull(), // in days
  maxGuests: integer("max_guests").notNull(),
  minAge: integer("min_age"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),

  // Foreign Key to Company
  companyId: integer("company_id").notNull(),

  // Foreign Key to Agenda
  agendaId: integer("agenda_id").notNull(),

  // Foreign Key to Destination
  destinationId: integer("destination_id").notNull(),

  // Foreign Key to category and subcategory
  categoryId: integer("category_id").notNull(),
  subcategoryId: integer("subcategory_id").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const travelTableRelations = relations(travelTable, ({ one, many }) => ({
  company: one(companyTable, {
    fields: [travelTable.companyId],
    references: [companyTable.id],
  }),
  subCategories: many(subCategoryToTravelTable),
  categories: many(categoryToTravelTable),
}));

