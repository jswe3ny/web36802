import type { Config } from 'drizzle-kit';
// import { env } from '$env/static/private';

export default {
	schema: './src/lib/server/schema.ts',
	out: './drizzle',
	driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
	dbCredentials: {
		connectionString: "postgres://postgres.hgzuctmqnovaqxmjownh:yQ1pHgWyjZu0gkey@aws-0-us-west-1.pooler.supabase.com:6543/postgres",
	}
} satisfies Config;