
// import pg from "pg";
// import { } from "drizzle-orm/mysql-core";
import { pgTable, text, timestamp, uuid,integer, date, numeric} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
	// id: serial("id").primaryKey(),
    id: text("id").primaryKey().unique(),
    username: text("username").notNull(),
    password_hash: text("password_hash").notNull()
});

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

export const buyTable = pgTable("buy", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	ticker: text("ticker").notNull(),
	numShares: integer("numShares").notNull(),
	buyDate: date("buyDate", {mode: "date"}).notNull(),
	costPerShare: numeric("costPerShare", {precision: 6, scale:2}),
	cik: text("cik").notNull()
}) 