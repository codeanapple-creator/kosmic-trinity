import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  provider: text("provider").notNull(),
  providerOrderId: text("provider_order_id").notNull(),
  providerPaymentId: text("provider_payment_id").notNull().default(""),
  itemName: text("item_name").notNull(),
  itemType: text("item_type").notNull().default("service"),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  amountPaise: integer("amount_paise").notNull(),
  currency: text("currency").notNull().default("INR"),
  status: text("status").notNull().default("created"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({ id: true, createdAt: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof ordersTable.$inferSelect;
