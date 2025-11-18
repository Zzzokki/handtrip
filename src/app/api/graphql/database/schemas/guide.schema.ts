import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { travelSessionTable } from "./travel-session.schema";
import { companyTable } from "./company.schema";

export const guideTable = pgTable("guide", {
  id: serial("id").primaryKey(),

  // Guide details
  name: varchar("name").notNull(),
  description: varchar("description").notNull(),
  email: varchar("email").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  profileImage: varchar("profile_image").notNull(),

  // Company
  companyId: integer("company_id").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const guideTableRelations = relations(guideTable, ({ many, one }) => ({
  travelSessions: many(travelSessionTable),
  company: one(companyTable, {
    fields: [guideTable.companyId],
    references: [companyTable.id],
  }),
}));
