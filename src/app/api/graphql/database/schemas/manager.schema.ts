import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { companyTable } from "./company.schema";

export const managerTable = pgTable("manager", {
  id: serial("id").primaryKey(),

  // Manager details
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").notNull(),
  phoneNumber: varchar("phone_number"),

  // Login credentials
  username: varchar("username").notNull().unique(),
  passwordHash: varchar("password_hash").notNull(),

  // Company association
  companyId: integer("company_id").references(() => companyTable.id),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const managerTableRelations = relations(managerTable, ({ one }) => ({
  company: one(companyTable, {
    fields: [managerTable.companyId],
    references: [companyTable.id],
  }),
}));
