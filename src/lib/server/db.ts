// import pg from "pg";
// import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema"   
import { PG_CONNECTIONSTRING} from '$env/static/private';

// const pool = new pg.Pool();


// export const db = drizzle(pool);

// import 'dotenv/config'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = PG_CONNECTIONSTRING

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false }, )
export const db = drizzle(client, {schema});