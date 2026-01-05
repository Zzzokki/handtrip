import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const adminTable = pgTable("admin", {
  id: serial("id").primaryKey(),

  // Admin details
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").notNull(),

  // Login credentials
  username: varchar("username").notNull().unique(),
  passwordHash: varchar("password_hash").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
