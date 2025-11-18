import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { categoryTable } from "./category.schema";
import { travelTable } from "./travel.schema";

export const subCategoryTable = pgTable("sub-category", {
  id: serial("id").primaryKey(),

  // Subcategory Information
  name: varchar("name").notNull(),

  // Foreign Key to Category
  categoryId: integer("category_id").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const subCategoryRelations = relations(subCategoryTable, ({ one }) => ({
  category: one(categoryTable, {
    fields: [subCategoryTable.categoryId],
    references: [categoryTable.id],
  }),
}));

export const subCategoryToTravelTable = pgTable("sub-category-to-travel", {
  id: serial("id").primaryKey(),
  subCategoryId: integer("subcategory_id").notNull(),
  travelId: integer("travel_id").notNull(),
});

export const subCategoryToTravelRelations = relations(subCategoryToTravelTable, ({ one }) => ({
  subCategory: one(subCategoryTable, {
    fields: [subCategoryToTravelTable.subCategoryId],
    references: [subCategoryTable.id],
  }),
  travel: one(travelTable, {
    fields: [subCategoryToTravelTable.travelId],
    references: [travelTable.id],
  }),
}));
