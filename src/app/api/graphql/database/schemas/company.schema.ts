import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { travelTable } from "./travel.schema";
import { guideTable } from "./guide.schema";

export const companyTable = pgTable("company", {
  id: serial("id").primaryKey(),

  // Company details
  name: varchar("name").notNull(),
  logo: varchar("logo").notNull(),
  coverImage: varchar("cover_image").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  email: varchar("email").notNull(),
  description: varchar("description").notNull(),

  // Login credentials
  username: varchar("username").notNull(),
  passwordHash: varchar("password_hash").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const companyRelations = relations(companyTable, ({ many }) => ({
  travels: many(travelTable),
  guides: many(guideTable),
}));
