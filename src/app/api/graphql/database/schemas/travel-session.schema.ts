
import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";

export const travelSessionTable = pgTable("travel-session", {
  id: serial("id").primaryKey(),

  // Session Information
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),

  // Foreign Key to travel
  travelId: integer("travelId").notNull(),

  // Foreign Keys to Guide
  guideId: integer("guideId").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// export const timeTableRelations = relations(timeTable, ({ one, many }) => ({
//   travel: one(travel, {
//     fields: [timeTable.id],
//     references: [travel.timeTableId],
//   }),
//   order: many(order),
//   suudal: one(suudal, {
//     fields: [timeTable.suudalId],
//     references: [suudal.id],
//   }),
//   guide: one(guide, {
//     fields: [timeTable.guideId],
//     references: [guide.id],
//   }),
// }));
