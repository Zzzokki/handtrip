import {
  pgTable,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const customerTable = pgTable("customer", {
  id: serial("id").primaryKey(),

  // Customer details
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  email: varchar("email").notNull(),

  // Login credentials
  username: varchar("username").notNull(),
  passwordHash: varchar("password_hash").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

