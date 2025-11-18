import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const travelerTable = pgTable("traveler", {
  id: serial("id").primaryKey(),

  // Personal Information
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  dateOfBirth: timestamp("date_of_birth").notNull(),

  // Foreign Key to Order
  orderId: integer("order_id").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
