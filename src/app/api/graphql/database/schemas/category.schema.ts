import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { subCategoryTable } from "./sub-category.schema";
import { travelTable } from "./travel.schema";

export const categoryTable = pgTable("category", {
  id: serial("id").primaryKey(),

  // Category details
  name: varchar("name").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const categoryTableRelations = relations(categoryTable, ({ many }) => ({
  subCategories: many(subCategoryTable),
}));


export const categoryToTravelTable = pgTable("category-to-travel", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  travelId: integer("travel_id").notNull(),
});

export const categoryToTravelRelations = relations(categoryToTravelTable, ({ one }) => ({
  category: one(categoryTable, {
    fields: [categoryToTravelTable.categoryId],
    references: [categoryTable.id],
  }),
  travel: one(travelTable, {
    fields: [categoryToTravelTable.travelId],
    references: [travelTable.id],
  }),
}));