import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const books = sqliteTable("books", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(), title: text("title").notNull(), author: text("author").notNull().default(""), coverUrl: text("cover_url").notNull().default(""), isbn: text("isbn").notNull().default(""),
  currentPage: integer("current_page").notNull().default(1), currentLine: integer("current_line").notNull().default(1),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(), createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
