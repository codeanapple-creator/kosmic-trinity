import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const enquiriesTable = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull().default(""),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  productInterest: text("product_interest").notNull().default(""),
  message: text("message").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertEnquirySchema = createInsertSchema(enquiriesTable).omit({ id: true, createdAt: true });
export type InsertEnquiry = z.infer<typeof insertEnquirySchema>;
export type Enquiry = typeof enquiriesTable.$inferSelect;
