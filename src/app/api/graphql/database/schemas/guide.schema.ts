import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { travelSessionTable } from "./travel-session.schema";

export const guideTable = pgTable("guide", {
  id: serial("id").primaryKey(),

  // Guide details
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  profileImage: varchar("profile_image").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const guideTableRelations = relations(guideTable, ({ many }) => ({
  travelSessions: many(travelSessionTable)
}));

