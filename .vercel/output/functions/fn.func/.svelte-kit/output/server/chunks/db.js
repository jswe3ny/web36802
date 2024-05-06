import { pgTable, text, timestamp, uuid, integer, date, numeric } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
const userTable = pgTable("user", {
  // id: serial("id").primaryKey(),
  id: text("id").primaryKey().unique(),
  username: text("username").notNull(),
  password_hash: text("password_hash").notNull()
});
const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date"
  }).notNull()
});
const buyTable = pgTable("buy", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  userId: text("user_id").notNull().references(() => userTable.id),
  ticker: text("ticker").notNull(),
  numShares: integer("numShares").notNull(),
  buyDate: date("buyDate", { mode: "date" }).notNull(),
  costPerShare: numeric("costPerShare", { precision: 6, scale: 2 }),
  cik: text("cik").notNull()
});
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buyTable,
  sessionTable,
  userTable
}, Symbol.toStringTag, { value: "Module" }));
const PG_CONNECTIONSTRING = "postgres://postgres.hgzuctmqnovaqxmjownh:yQ1pHgWyjZu0gkey@aws-0-us-west-1.pooler.supabase.com:6543/postgres";
const API_KEY = "7024f274b334a9535ae00afb8b8e6d0d";
const connectionString = PG_CONNECTIONSTRING;
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });
export {
  API_KEY as A,
  buyTable as b,
  db as d,
  sessionTable as s,
  userTable as u
};
