import { relations } from "drizzle-orm";
import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { orderTable } from "./order.schema";
import { travelTable } from "./travel.schema";
import { guideTable } from "./guide.schema";
import { seatTable } from "./seat.schema";

export const travelSessionTable = pgTable("travel-session", {
  id: serial("id").primaryKey(),

  // Session Information
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),

  // Foreign Key to travel
  travelId: integer("travel_id").notNull(),

  // Foreign Keys to Guide
  guideId: integer("guide_id").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const travelSessionTableRelations = relations(travelSessionTable, ({ one, many }) => ({
  orders: many(orderTable),
  seats: many(seatTable),
  travel: one(travelTable, {
    fields: [travelSessionTable.travelId],
    references: [travelTable.id],
  }),
  guide: one(guideTable, {
    fields: [travelSessionTable.guideId],
    references: [guideTable.id],
  }),
}));
