import postgres from "postgres";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

declare global {
  var _conn: ReturnType<typeof postgres> | undefined;
}

export const conn =
  global._conn ||
  postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: "require",
  });

if (process.env.NODE_ENV !== "production") global._conn = conn;
