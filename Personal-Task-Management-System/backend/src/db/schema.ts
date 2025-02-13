import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: text("email").unique().notNull(),
});